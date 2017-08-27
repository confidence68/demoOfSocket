var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8008);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
    