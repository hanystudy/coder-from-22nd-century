function socket(server) {
  var io = require('socket.io')(server);
  io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('offer', function (data) {
      io.sockets.emit('emitOffer', data);
    });
    socket.on('answer', function (data) {
      io.sockets.emit('answer', data);
    });
    socket.on('connect_timeout', function (data) {
      socket.disconnect();
    });
    socket.on('offerCandidate', function (data) {
      io.sockets.emit('offerCandidate', data);
    });
    socket.on('answerCandidate', function (data) {
      io.sockets.emit('answerCandidate', data);
    });
  });
}
module.exports = socket;
