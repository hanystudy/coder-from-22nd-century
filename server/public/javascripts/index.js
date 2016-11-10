import remoteVideo from './remoteVideo'
// import camVideo from './camVideo'
import Widget from './webgl/widget'
import CubeWidget from './webgl/cubeWidget'
import VideoWidget from './webgl/videoWidget'
import MainWindow from './webgl/mainWindow'

// let widget = new Widget()
// let cubeWidget = new CubeWidget()
// let videoWidget = new VideoWidget(remoteVideo, 576, 360)
// let mainWindow = new MainWindow(remoteVideo, window.innerWidth, window.innerHeight)
let mainWindow = new MainWindow(remoteVideo, window.innerWidth, window.innerHeight)
