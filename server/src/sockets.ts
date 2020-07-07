import { Socket } from "socket.io";
import Evaluator from "./evaluate";

const evaluator = new Evaluator();

export default function Sockets(io: any) {
  io.sockets.on("connection", (socket: Socket, callBack: Function) => {
    socket.on("evaluate", (data: any) => {
      let task = {
        languages: ["python", "c++"],
        memory: "64",
        cpu: "1",
        in: [],
        out: [],
      };

      if (data.language in task.languages) {
        evaluator.runCode(
          { languge: data.language, memory: task.memory, cpu: task.cpu },
          { code: data.code, in: task.in, out: task.out },
          (verdict: string) => {
            callBack({ type: "update", verdict: verdict });
          },
          (status: any) => {
            callBack({ type: "done", ...status });
          }
        );
      } else {
        return callBack("Language not allowed!");
      }
    });
  });
}
