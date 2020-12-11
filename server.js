const express = require('express');
var app = express();
var server = app.listen(3000, () => console.log('3000 is the port'));
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const users = {}

io.on('connection', socket => {
  console.log("new connection")
  socket.on('new-user', name => {
    console.log({name})
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    console.log("in emit")
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})