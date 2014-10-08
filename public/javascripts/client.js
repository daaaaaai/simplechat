// connect socket.io 
var socket = io.connect();

socket.on('connect', function() {
  emit('login');
});

socket.on('disconnect', function(client) {
  emit('logout');
});

socket.on('recieve', function(data) {
  var item = $('<li>').append($('<small>').append(data.time));

  // Make contents with recieved data.type
  if (data.type === 'login') {
    item.addClass('alert alert-success').append($('<div>').append('login' + data.user));
  } else if (data.type === 'logout') {
    item.addClass('alert alert-danger').append($('<div>').append( '[logout]' + data.user));
  } else if (data.type === 'chat') {
    var msg = data.value.replace(/[!@$%<>'"&|]/g, '');
    item.addClass('well well-lg').append($('<div>').text(msg)).children('small').prepend(data.user + '：');
  } else {
    item.addClass('alert alert-danger').append($('<div>').append('recieved invalid message'));
  }

  $('#chat-area').prepend(item).hide().fadeIn(800);
});

function emit(type, msg) {

  console.log(name);
  socket.emit('notice', {
    type : type,
    user : local_data.name,
    value : msg,
  });
}

function sendMessage() {
  var msg = $('#message').val();
  $('#message').val("");
  emit('chat', msg);
}

function login() {
  var msg = $('#message').val();
  emit('login', msg);
}

$(document).ready(function() {
  $(window).on('beforeunload', function hoge(e) {
    emit('logout');
  });

  $('#send').click(sendMessage);
});
