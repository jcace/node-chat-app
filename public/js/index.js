    // io is available because we loaded this file. 
    // Calling it initiates a request to the server, and keeps the connection open.
    // 'socket' variable used to listen, and send data to the server.
    var socket = io();
    
    socket.on('connect', function () {
      console.log("Connected to server.");
    });
      

    socket.on('disconnect', function () {
      console.log("Disconnected from server");
    });

    socket.on('newMessage', function(message) {
      
      var li = jQuery('<li></li>');
      li.text(`${message.from}: ${message.text}`);

      jQuery('#messages').append(li);
    });


    jQuery('#message-form').on('submit', function(e) {
      e.preventDefault();

      socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
      }, function() {

      })
    });