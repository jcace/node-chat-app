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

  socket.emit('newMessage', {
    from: "Json",
    text: "Hey man, whats up",
    createAt: 123,
  });

  socket.on('createMessage', (message) => {
    console.log("Create Message", message);


    socket.emit('newMessage', {
      from: 'admin',
      text: "Welcome to the chat app!",
      createAt: new Date().getTime()
    })
    
    socket.broadcast.emit('newMessage', {
      from: 'admin',
      text: "New user joined the chatroom!",
      createAt: new Date().getTime()
    })

    // io.emit emits a message to EVERY single connection!
    // socket.emit sends just to the single socket.
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })

    // Emit, but sends to everyone except for "this" socket
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`App listening on ${port}!`));

