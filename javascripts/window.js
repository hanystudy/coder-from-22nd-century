import React from 'react'

export default class Window extends React.Component {
  constructor() {
    super()
    this.state = { video: null }
  }

  componentDidMount() {
    if (this.props.source) {
      let source = this.props.source
      const handleStream = (stream) => {
        this.setState({
          video: <video style={{width: 576, height: 360, margin: 5}} src={URL.createObjectURL(stream)}></video>,
          title: source.name,
          id: source.id,
          stream: stream
        })
      }
      const handleError = (e) => {}
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        }
      }, handleStream, handleError)
    }
  }

  windowChange = (e) => {
    const target = e.target
    const sourceObject = {
      checked: target.checked,
      stream: this.state.stream
    }
    this.props.windowChange(target.value, sourceObject)
  }

  render() {
    return <div>
      {this.state.video}
      <div style={{textAlign: 'center'}}>
        <input value={this.state.id} type="checkbox" onChange={this.windowChange}/>
        {this.state.title}
      </div>
    </div>
  }
}
