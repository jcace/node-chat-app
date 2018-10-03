const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
const server = http.createServer(app);

// Pass in server as argument to socket. io is the web sockets server.
var io = socketIO(server);

// Event listener
io.on("connection", socket => {
  console.log("New user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app!")
  );

  // Emit, but sends to everyone except for "this" socket
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user has joined the chatroom")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("Create Message", message);
    io.emit("newMessage", generateMessage(message.from, message.text));

    // io.emit emits a message to EVERY single connection!
    // socket.emit sends just to the single socket.

    // Callback - an "acknowledgement" sent back to the client
    callback();
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`App listening on ${port}!`));
