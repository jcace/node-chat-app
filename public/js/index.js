    // io is available because we loaded this file. 
    // Calling it initiates a request to the server, and keeps the connection open.
    // 'socket' variable used to listen, and send data to the server.
    var socket = io();
    
    socket.on('connect', function () {
      console.log("Connected to server.");

      socket.emit('createMessage', {
        from: "Jason",
        text: 'Hej'
      });
    });

    socket.on('disconnect', function () {
      console.log("Disconnected from server");
    })

    socket.on('newMessage', function(message) {
      console.log('New Message', message);
    });