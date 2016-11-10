var pc2 = null
var socket = io(location.origin);

let servers = null
pc2 = new webkitRTCPeerConnection(servers);

pc2.onicecandidate = function(e) {
  if (e.candidate)
    socket.emit('answerCandidate', e.candidate)
};
pc2.getLocalStreams().forEach(function(stream) {
  pc2.removeStream(stream);
});
pc2.onaddstream = gotRemoteStream;

function onCreateAnswerSuccess(desc) {
  pc2.setLocalDescription(desc)
  socket.emit('answer', desc)
}

let remoteVideo = document.getElementById('remoteVideo');

function gotRemoteStream(e) {
  remoteVideo.srcObject = e.stream;
}

socket.on('news', function (data) {
  console.log(data);
});

socket.on('emitOffer', function (data) {
  pc2.setRemoteDescription(new RTCSessionDescription(data))
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    null
  );
});

socket.on('offerCandidate', function (data) {
  pc2.addIceCandidate(new RTCIceCandidate(data));
});

export default remoteVideo
