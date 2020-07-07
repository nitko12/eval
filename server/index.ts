const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);

const io = require("socket.io").listen(server);

import Sockets from "./src/sockets";

const sockets = Sockets(io);

app.set("socketio", io);
app.use(express.static("../eval_frontend/build"));

server.listen(3000);
