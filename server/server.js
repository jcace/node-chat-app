const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Pass in server as argument to socket. io is the web sockets server.
var io = socketIO(server);

// Event listener
io.on('connection', (socket) => {
  console.log("New user connected");

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`App listening on ${port}!`));

