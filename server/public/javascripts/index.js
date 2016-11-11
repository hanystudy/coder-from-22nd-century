import remoteVideo from './remoteVideo'
import Widget from './webgl/widget'
import CubeWidget from './webgl/cubeWidget'
import VideoWidget from './webgl/videoWidget'
import MainWindow from './webgl/mainWindow'

let mainWindow = new MainWindow(remoteVideo, window.innerWidth, window.innerHeight)
let controls = new THREE.VRControls(mainWindow.camera)
let effect = new THREE.VREffect(mainWindow.renderer)
mainWindow.setVR(controls, effect)
if (navigator.getVRDisplays) {
	navigator.getVRDisplays()
		.then( function ( displays ) {
			effect.setVRDisplay( displays[ 0 ] );
			controls.setVRDisplay( displays[ 0 ] );
		} )
		.catch( function () {
			// no displays
		} );
	document.body.appendChild(WEBVR.getButton(effect));
}
