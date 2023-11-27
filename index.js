const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(bodyParser.urlencoded({ extended: true }))

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});


messages = []
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
app.post("/", (req, res) => {
  messages.push(req.body.messages)



});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));