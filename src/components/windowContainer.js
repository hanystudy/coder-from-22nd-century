import React from 'react'
import Window from './window'
const {desktopCapturer} = require('electron')
import {rtcClient} from '../common/rtcClient'

export default class WindowContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    rtcClient.init()
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
    if (sourceObject.checked) {
      rtcClient.createRTCClient(id, sourceObject)
    }
    else {
      rtcClient.removeRTCClient(id, sourceObject)
    }
  }

  render() {
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>{this.windowList()}</div>
  }
}
