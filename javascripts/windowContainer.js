import React from 'react'
import Window from './window'
const {desktopCapturer} = require('electron')
import {socket} from './socketio'

export default class WindowContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sources: [],
      checkedSources: {}
    }
  }

  componentDidMount() {
    let servers = null
    let pc1 = new webkitRTCPeerConnection(servers)

    socket.on('news', function (data) {})
    socket.on('answer', (data) => {
      pc1.setRemoteDescription(new RTCSessionDescription(data))
    });
    socket.on('answerCandidate', (data) => {
      pc1.addIceCandidate(new RTCIceCandidate(data))
    });
    socket.on('connect_timeout', function () {
      socket.disconnect()
    })

    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      this.setState({webrtc: pc1, sources})
    })
  }

  windowList() {
    return this.state.sources.map((source) => {
      return <Window source={source} key={source.id} windowChange={this.windowChange}/>
    })
  }

  windowChange = (id, sourceObject) => {
    let checkedSources = Object.assign({}, this.state.checkedSources)
    checkedSources[id] = sourceObject
    let pc1 = this.state.webrtc
    if (sourceObject.checked) {
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
      pc1.getLocalStreams().forEach(function(stream) {
        pc1.removeStream(stream);
      });
      pc1.addStream(sourceObject.stream)
      pc1.createOffer(
        offerOptions
      ).then(
        onCreateOfferSuccess,
        onCreateSessionDescriptionError
      )
    }
    this.setState({checkedSources})
  }

  render() {
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>{this.windowList()}</div>
  }
}
