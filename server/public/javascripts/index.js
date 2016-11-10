import remoteVideo from './remoteVideo'
import Widget from './webgl/widget'
import CubeWidget from './webgl/cubeWidget'
import VideoWidget from './webgl/videoWidget'
import MainWindow from './webgl/mainWindow'

let mainWindow = new MainWindow(remoteVideo, window.innerWidth, window.innerHeight)
