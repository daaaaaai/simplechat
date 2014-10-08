var socketio = require('socket.io');
var dateformat = require('dateformat');

module.exports = sio;

function sio(server) {

  // Socket.IO
  var sio = socketio.listen(server);
  
  sio.sockets.on('connection', function(socket) {

    socket.on('notice', function(data) {

      // Notify recieved message to all user included the sender
      sio.sockets.emit('recieve', {
        type : data.type,
        user : data.user,
        value : data.value,
        time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      });
      console.log("message from :" + data.user);

      // Notify recieved message to all user excluded the sender
      // socket.broadcast.emit('recieve', {
      //   type : data.type,
      //   user : data.user,
      //   value : data.value,
      //   time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      // });
    });

    socket.on("disconnect", function() {
    });
  });
}