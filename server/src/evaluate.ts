import { PythonShell, Options } from "python-shell";
import { EvalJson } from "./types";

const options = {
  mode: "text",
  pythonPath: "python3",
  pythonOptions: ["-u"],
  scriptPath: "",
};

export default class {
  runCode(
    settings: any,
    codeAndTests: EvalJson,
    onVerdict: Function,
    onOver: Function
  ) {
    let pyshell = new PythonShell("./evaluator/main.py", {
      ...options,
      args: [
        "--lang",
        settings.language,
        "--mem",
        settings.memory,
        "--cpu",
        settings.cpu,
      ],
    } as Options);

    pyshell.on("message", function (message: string) {
      onVerdict(message);
    });

    pyshell
      .send(JSON.stringify(codeAndTests))
      .end((err: any, code: any, signal: any) => {
        if (err) throw err;
        onOver(code, signal);
      });
  }
}
