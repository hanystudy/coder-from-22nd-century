import {socket} from './socketio'

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
}

export const rtcClient = (function() {

  let webrtc = null
  let checkedSources = {}
  let checkedWebRTC = {}

  const init = () => {
    socket.on('news', function (data) {})
    socket.on('answer', (data) => {
      if (webrtc) webrtc.setRemoteDescription(new RTCSessionDescription(data))
    });
    socket.on('answerCandidate', (data) => {
      if (webrtc) webrtc.addIceCandidate(new RTCIceCandidate(data))
    });
    socket.on('connect_timeout', function () {
      socket.disconnect()
    })
  }

  const createRTCClient = (id, sourceObject) => {
    let pc1 = null
    checkedSources[id] = sourceObject
    if (window.RTCPeerConnection) {
      pc1 = new RTCPeerConnection(null)
    }
    else {
      pc1 = new webkitRTCPeerConnection(null)
    }
    webrtc = pc1
    checkedWebRTC[id] = pc1

    function onCreateOfferSuccess(desc) {
      pc1.setLocalDescription(desc)
      socket.emit('offer', desc)
    }
    function onCreateSessionDescriptionError(error) { }
    pc1.onicecandidate = function(e) {
      if (e.candidate) socket.emit('offerCandidate', e.candidate)
    }
    pc1.addStream(sourceObject.stream)
    pc1.createOffer(offerOptions).then(
      onCreateOfferSuccess,
      onCreateSessionDescriptionError
    )
  }

  const removeRTCClient = (id, sourceObject) => {
    let pc1 = checkedWebRTC[id]
    checkedSources[id] = null
    pc1.getLocalStreams().forEach((stream) => {
      pc1.removeStream(stream)
    })
    pc1.close()
    checkedWebRTC[id] = null
  }

  return { init, createRTCClient, removeRTCClient }
})()
