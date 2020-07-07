const express = require("express");
const app = express();
const port = 3000;

const PythonShell = require("python-shell").PythonShell;

const options = {
  mode: "text",
  pythonPath: "python3",
  pythonOptions: ["-u"],
  scriptPath: "",
  args: ["--lang", "python", "--mem", "64", "--cpu", "1"],
};

let s = {
  code:
    //"#include<iostream>\\nusing namespace std;\\nint main() {\\n int a, b;\\n cin >> a >> b;\\n cout << a + b; \\n } \\n",
    "print(sum(list(map(int, input().split()))))",
  in: [
    "1 2",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
    "5 1",
  ],
  out: ["3", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6"],
};

let pyshell = new PythonShell("./evaluator/main.py", options);

pyshell.on("message", function (message: string) {
  console.log(message);
});

pyshell.send(JSON.stringify(s)).end((err: any, code: any, signal: any) => {
  if (err) throw err;
  console.log("The exit code was: " + code);
  console.log("The exit signal was: " + signal);
  console.log("finished");
});

app.use(express.static("../eval_frontend/build"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
