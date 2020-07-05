import epicbox
import argparse
import sys
import json
from pprint import pprint

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
    choices=["c++", "python"],
)

parser.add_argument(
    "--mem",
    metavar="memory",
    type=int,
    help="Memory given to a program executing",
    default=64,
    nargs="?",
    choices=["c++", "python"],
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
        "read_only": True,
        "network_disabled": True,
    },
}

args = parser.parse_args()
epicbox.configure(profiles=PROFILES)


def read_in():
    return json.load(sys.stdin)


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
            for x, y in zip(stdin["in"], stdin["out"]):
                result = epicbox.run(
                    "gcc_run", "./main", stdin=x, limits=limits, workdir=workdir,
                )

                if result["exit_code"] != 0 or result["stderr"] != b"":
                    print("RTE")
                    continue

                a = result["stdout"].strip().split(b"\n")
                b = str.encode(y).strip().split(b"\n")

                if result["timeout"]:
                    print("TLE")
                elif len(a) == len(b) and all(
                    [b" ".join(i.split()) == b" ".join(j.split()) for i, j in zip(a, b)]
                ):
                    print("AC", result["duration"])
                else:
                    print("WA")

    elif args["lang"]:
        files = [{"name": "main.py", "content": code}]
        result = epicbox.run("python", "python3 main.py", files=files, limits=limits)

