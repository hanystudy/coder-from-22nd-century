import React from 'react'
import Window from './window'
const {desktopCapturer} = require('electron')
import {socket} from '../common/socketio'

export default class WindowContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sources: [],
      checkedSources: {},
      checkedWebRTC: {}
    }
    this.webrtc = null
  }

  componentDidMount() {
    socket.on('news', function (data) {})
    socket.on('answer', (data) => {
      this.webrtc.setRemoteDescription(new RTCSessionDescription(data))
    });
    socket.on('answerCandidate', (data) => {
      this.webrtc.addIceCandidate(new RTCIceCandidate(data))
    });
    socket.on('connect_timeout', function () {
      socket.disconnect()
    })
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      this.setState({sources})
    })
  }

  windowList() {
    return this.state.sources.map((source) => {
      return <Window source={source} key={source.id} windowChange={this.windowChange}/>
    })
  }

  windowChange = (id, sourceObject) => {
    let checkedSources = Object.assign({}, this.state.checkedSources)
    let checkedWebRTC = Object.assign({}, this.state.checkedWebRTC)
    if (sourceObject.checked) {
      checkedSources[id] = sourceObject
      let pc1 = null
      if (window.RTCPeerConnection) {
        pc1 = new RTCPeerConnection(null)
      }
      else {
        pc1 = new webkitRTCPeerConnection(null)
      }
      this.webrtc = pc1
      checkedWebRTC[id] = pc1
      let offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }
      function onCreateOfferSuccess(desc) {
        pc1.setLocalDescription(desc)
        socket.emit('offer', desc)
      }
      function onCreateSessionDescriptionError(error) {
      }
      pc1.onicecandidate = function(e) {
        if (e.candidate)
          socket.emit('offerCandidate', e.candidate)
      }
      pc1.addStream(sourceObject.stream)
      pc1.createOffer(
        offerOptions
      ).then(
        onCreateOfferSuccess,
        onCreateSessionDescriptionError
      )
    }
    else {
      let pc1 = checkedWebRTC[id]
      checkedSources[id] = null
      pc1.getLocalStreams().forEach((stream) => {
        pc1.removeStream(stream)
      })
      pc1.close()
      checkedWebRTC[id] = null
    }
    this.setState({checkedSources, checkedWebRTC})
  }

  render() {
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>{this.windowList()}</div>
  }
}
