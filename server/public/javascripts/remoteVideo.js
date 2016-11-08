var pc2 = null
var socket = io(location.origin);

function onCreateAnswerSuccess(desc) {
  pc2.setLocalDescription(desc)
  socket.emit('answer', desc)
}

var remoteVideo = document.getElementById('remoteVideo');

function gotRemoteStream(e) {
  remoteVideo.srcObject = e.stream;
}

socket.on('news', function (data) {
  console.log(data);
});

socket.on('emitOffer', function (data) {
  let servers = null
  pc2 = new webkitRTCPeerConnection(servers);
  pc2.onaddstream = gotRemoteStream;
  pc2.setRemoteDescription(new RTCSessionDescription(data))
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    null
  );
});
