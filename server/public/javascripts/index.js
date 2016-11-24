window.THREE = require('three')
require('./webvr/webvr-polyfill-init')
require('./webvrThree/vreffect')
require('./webvrThree/vrcontrol')
require('./webvrThree/webvr')

import remoteVideos from './rtcClient/rtcClient'
import MainWindow from './scene/mainWindow'

let mainWindow = new MainWindow(remoteVideos, window.innerWidth, window.innerHeight)
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
