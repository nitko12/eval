const express = require("express");
const app = express();
const port = 3000;

const pythonShell = require("python-shell").PythonShell;

pythonShell.runString("x=1+1;print(x)", null, function (err) {
  if (err) throw err;
  console.log("finished");
});

app.use(express.static("../eval_frontend/build"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
