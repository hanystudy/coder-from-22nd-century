var pc2 = null
var socket = io(location.origin)
var webrtc = []
var remoteVideos = [
  document.createElement('video'),
  document.createElement('video'),
  document.createElement('video'),
  document.createElement('video')
]
const MAX_VIDEOS = 4
var indexToBeChanged = 0

function onCreateAnswerSuccess(desc) {
  pc2.setLocalDescription(desc);
  socket.emit('answer', desc);
}

function gotRemoteStream(e) {
  remoteVideos[indexToBeChanged].setAttribute('autoPlay','autoPlay')
  remoteVideos[indexToBeChanged].srcObject = e.stream
  indexToBeChanged = (indexToBeChanged + 1) % MAX_VIDEOS
}

socket.on('news', function (data) {
  console.log(data);
});

socket.on('emitOffer', function (data) {
  let servers = null
  if (window.RTCPeerConnection) {
    pc2 = new RTCPeerConnection(servers)
  }
  else {
    pc2 = new webkitRTCPeerConnection(servers)
  }

  pc2.onicecandidate = function(e) {
    if (e.candidate)
      socket.emit('answerCandidate', e.candidate)
  };
  pc2.getLocalStreams().forEach(function(stream) {
    pc2.removeStream(stream);
  });
  pc2.onaddstream = gotRemoteStream;
  pc2.setRemoteDescription(new RTCSessionDescription(data))
  pc2.createAnswer().then(
    onCreateAnswerSuccess,
    null
  );
});

socket.on('offerCandidate', function (data) {
  pc2.addIceCandidate(new RTCIceCandidate(data));
});

socket.on('cleanUp', function (data) {
  webrtc = webrtc.filter(function (rtc) {
      return rtc.connectionState() !== 'closed';
  })
});

socket.on('connect_timeout', function (data) {
  socket.disconnect();
});

export default remoteVideos
