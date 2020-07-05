import epicbox
import argparse

parser = argparse.ArgumentParser(description="Run isolated code.")
parser.add_argument(
    "language",
    metavar="lang",
    type=str,
    help="Language for compiling code",
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
}

epicbox.configure(profiles=PROFILES)

untrusted_code = b"""
// C++ program
#include <iostream>

int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
}
"""

with epicbox.working_directory() as workdir:
    epicbox.run(
        "gcc_compile",
        "g++ -pipe -O2 -static -o main main.cpp",
        files=[{"name": "main.cpp", "content": untrusted_code}],
        workdir=workdir,
    )
    res1 = epicbox.run(
        "gcc_run",
        "./main",
        stdin="2 2",
        limits={"cputime": 1, "memory": 64},
        workdir=workdir,
    )
    res2 = epicbox.run(
        "gcc_run",
        "./main",
        stdin="14 5",
        limits={"cputime": 1, "memory": 64},
        workdir=workdir,
    )
    print(res1["stdout"], res2["stdout"])

