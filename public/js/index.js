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

    socket.on('newMessage', function (message) {

      var li = jQuery('<li></li>');
      li.text(`${message.from}: ${message.text}`);

      jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function (message) {

      var li = jQuery('<li></li>');
      var a = jQuery('<a target="_blank">Location</a>');

      li.text(`${message.from}: `);

      // Set the href attribute.
      // Prevents people injecting HTML via a malicious message!
      a.attr('href', message.url);

      li.append(a);

      jQuery('#messages').append(li);
    });


    jQuery('#message-form').on('submit', function (e) {
      e.preventDefault();

      var messageTextBox = jQuery('[name=message]')

      socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
      }, function () {
        messageTextBox.val('');
      })
    });

    var locationButton = jQuery('#send-location')

    locationButton.on('click', function () {

      if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
      }

      locationButton.attr('disabled', 'disabled');
      locationButton.text("Sending...")

      navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })

        locationButton.removeAttr('disabled');
        locationButton.text("Send Location")

      }, function () {
        alert("Unable to fetch location");
        locationButton.removeAttr('disabled');
      })
    });