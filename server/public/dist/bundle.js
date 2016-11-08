/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var pc2 = null;
	var socket = io(location.origin);

	function onCreateAnswerSuccess(desc) {
		pc2.setLocalDescription(desc);
		socket.emit('answer', desc);
	}

	var remoteVideo = document.getElementById('remoteVideo');

	function gotRemoteStream(e) {
		remoteVideo.srcObject = e.stream;
	}

	socket.on('news', function (data) {
		console.log(data);
	});

	socket.on('emitOffer', function (data) {
		var servers = null;
		pc2 = new webkitRTCPeerConnection(servers);
		pc2.onaddstream = gotRemoteStream;
		pc2.setRemoteDescription(new RTCSessionDescription(data));
		pc2.createAnswer().then(onCreateAnswerSuccess, null);
	});

	var Detector = {

		canvas: !!window.CanvasRenderingContext2D,
		webgl: function () {
			try {
				return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
			} catch (e) {
				return false;
			}
		}(),
		workers: !!window.Worker,
		fileapi: window.File && window.FileReader && window.FileList && window.Blob,

		getWebGLErrorMessage: function getWebGLErrorMessage() {

			var element = document.createElement('div');
			element.id = 'webgl-error-message';
			element.style.fontFamily = 'monospace';
			element.style.fontSize = '13px';
			element.style.fontWeight = 'normal';
			element.style.textAlign = 'center';
			element.style.background = '#fff';
			element.style.color = '#000';
			element.style.padding = '1.5em';
			element.style.width = '400px';
			element.style.margin = '5em auto 0';

			if (!this.webgl) {

				element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
			}

			return element;
		},

		addGetWebGLMessage: function addGetWebGLMessage(parameters) {

			var parent, id, element;

			parameters = parameters || {};

			parent = parameters.parent !== undefined ? parameters.parent : document.body;
			id = parameters.id !== undefined ? parameters.id : 'oldie';

			element = Detector.getWebGLErrorMessage();
			element.id = id;

			parent.appendChild(element);
		}

	};

	var container, scene, camera, renderer, controls, stats;
	//var keyboard = new THREEx.KeyboardState();

	// custom global variables
	var video, videoImage, videoImageContext, videoTexture;

	init();
	animate();

	// FUNCTIONS
	function init() {
		// SCENE
		scene = new THREE.Scene();
		// CAMERA
		var SCREEN_WIDTH = window.innerWidth,
		    SCREEN_HEIGHT = window.innerHeight;
		var VIEW_ANGLE = 45,
		    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
		    NEAR = 0.1,
		    FAR = 20000;
		camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		scene.add(camera);
		camera.position.set(0, 150, 400);
		camera.lookAt(scene.position);
		// RENDERER
		if (Detector.webgl) renderer = new THREE.WebGLRenderer({ antialias: true });else renderer = new THREE.CanvasRenderer();
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		container = document.getElementById('ThreeJS');
		container.appendChild(renderer.domElement);
		// LIGHT
		var light = new THREE.PointLight(0xffffff);
		light.position.set(0, 250, 0);
		scene.add(light);
		// FLOOR
		var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
		floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
		floorTexture.repeat.set(10, 10);
		var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
		var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.position.y = -0.5;
		floor.rotation.x = Math.PI / 2;
		scene.add(floor);
		// SKYBOX/FOG
		var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
		var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
		var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
		// scene.add(skyBox);
		scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

		///////////
		// VIDEO //
		///////////

		// create the video element
		//video = document.createElement( 'video' );
		video = remoteVideo;
		// video.id = 'video';
		// video.type = ' video/ogg; codecs="theora, vorbis" ';
		//video.src = "videos/sintel.ogv";
		video.load(); // must call after setting/changing source
		//video.play();

		// alternative method --
		// create DIV in HTML:
		// <video id="myVideo" autoplay style="display:none">
		//		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
		// </video>
		// and set JS variable:
		// video = document.getElementById( 'myVideo' );

		videoImage = document.createElement('canvas');
		videoImage.width = 480;
		videoImage.height = 204;

		videoImageContext = videoImage.getContext('2d');
		// background color if no video present
		videoImageContext.fillStyle = '#000000';
		videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

		videoTexture = new THREE.Texture(videoImage);
		videoTexture.minFilter = THREE.LinearFilter;
		videoTexture.magFilter = THREE.LinearFilter;

		var movieMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: true, side: THREE.DoubleSide });
		// the geometry on which the movie will be displayed;
		// 		movie image will be scaled to fit these dimensions.
		var movieGeometry = new THREE.PlaneGeometry(240, 100, 4, 4);
		var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
		movieScreen.position.set(0, 50, 0);
		scene.add(movieScreen);

		camera.position.set(0, 150, 300);
		camera.lookAt(movieScreen.position);
	}

	function animate() {
		requestAnimationFrame(animate);
		render();
		//update();
	}

	function update() {
		if (keyboard.pressed("p")) video.play();

		if (keyboard.pressed("space")) video.pause();

		if (keyboard.pressed("s")) // stop video
			{
				video.pause();
				video.currentTime = 0;
			}

		if (keyboard.pressed("r")) // rewind video
			video.currentTime = 0;

		controls.update();
		//stats.update();
	}

	function render() {
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			videoImageContext.drawImage(video, 0, 0);
			if (videoTexture) videoTexture.needsUpdate = true;
		}

		renderer.render(scene, camera);
	}

/***/ }
/******/ ]);