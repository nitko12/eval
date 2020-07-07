import epicbox
import argparse
import sys
import json
from pprint import pprint
from multiprocessing import Pool

parser = argparse.ArgumentParser(description="Run isolated code.")

parser.add_argument(
    "--lang",
    metavar="lang",
    type=str,
    help="Language for compiling code",
    nargs="?",
    choices=["c++", "python"],
    required=True,
)

parser.add_argument(
    "--cpu",
    metavar="cpuTime",
    type=int,
    help="Time evaluator will wait before closing execution (seconds)",
    default=1.0,
    nargs="?",
)

parser.add_argument(
    "--mem",
    metavar="memory",
    type=int,
    help="Memory given to a program executing",
    default=64,
    nargs="?",
)

PROFILES = {
    "gcc_compile": {"docker_image": "gcc", "user": "root",},
    "gcc_run": {
        "docker_image": "gcc",
        "user": "1000:1000",
        "read_only": True,
        "network_disabled": True,
    },
    "python": {
        "docker_image": "python",
        "user": "1000:1000",
        "network_disabled": True,
    },
}

args = parser.parse_args()
epicbox.configure(profiles=PROFILES)


def read_in():
    return json.load(sys.stdin)


def run(obj):
    container, path, stdin, expectedOut, limits, workdir, files, n = obj
    result = epicbox.run(
        container, path, stdin=stdin, limits=limits, workdir=workdir, files=files
    )

    if result["timeout"]:
        print("Test " + n + ": TLE")
        return

    if result["exit_code"] != 0 or result["stderr"] != b"":
        print("Test " + n + ": RTE")
        return

    a = result["stdout"].strip().split(b"\n")
    b = str.encode(expectedOut).strip().split(b"\n")

    if len(a) == len(b) and all(
        [b" ".join(i.split()) == b" ".join(j.split()) for i, j in zip(a, b)]
    ):
        print("Test " + n + ": AC", result["duration"])
    else:
        print("Test " + n + ": WA")


with epicbox.working_directory() as workdir:
    limits = {"cputime": int(args.cpu), "memory": int(args.mem)}
    stdin = read_in()

    code = stdin["code"].replace("\\n", "\n").replace("\\t", "\t")  # idk, works
    if args.lang == "c++":
        files = [{"name": "main.cpp", "content": str.encode(code)}]
        compileResult = epicbox.run(
            "gcc_compile",
            "g++ -pipe -O2 -static -o main main.cpp",
            files=files,
            workdir=workdir,
        )
        if compileResult["exit_code"] != 0 or compileResult["stderr"] != b"":
            print("CER")
        else:
            files = []
            inOuts = [
                ("gcc_run", "./main", x, y, limits, workdir, files, str(i))
                for i, (x, y) in enumerate(zip(stdin["in"], stdin["out"]))
            ]

            p = Pool(len(inOuts))
            p.map(run, inOuts)

    elif args.lang == "python":
        files = [{"name": "main.py", "content": str.encode(code)}]

        inOuts = [
            ("python", "python3 ./main.py", x, y, limits, workdir, files, str(i))
            for i, (x, y) in enumerate(zip(stdin["in"], stdin["out"]))
        ]

        p = Pool(len(inOuts))
        p.map(run, inOuts)

