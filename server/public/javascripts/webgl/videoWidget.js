import Widget from './widget'

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;

export default class VideoWidget extends Widget {
  constructor(video, width, height) {
    super()

    // create the video element
    //video = document.createElement( 'video' );
    this.video = video
    // video.id = 'video';
  	// video.type = ' video/ogg; codecs="theora, vorbis" ';
  	// video.src = "videos/sintel.ogv";
    this.video.load()
    //video.play();

    this.width = width
    this.height = height

    this.resizeWidget(this.width, this.height)

    this.camera = new THREE.PerspectiveCamera( 90, width/height, NEAR, FAR)
    this.scene = new THREE.Scene()

    this.videoImageContext = null
    this.videoTexture = null
    this.initVideoContext()

    const movieScreen = this.createMovieScreen()
    this.scene.add(movieScreen)

    this.camera.position.set(0,0,this.height/2)
    this.camera.lookAt(movieScreen.position)
    this.scene.add(this.camera)
  }

  // initScene = () => {
  //   // SCENE
  //   let scene = new THREE.Scene()

    // LIGHT
    // var light = new THREE.PointLight(0xffffff)
    // light.position.set(0,250,0)
    // scene.add(light)

    // FLOOR
    // var floorTexture = new THREE.TextureLoader().load( '/images/checkerboard.jpg' )
    // floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    // floorTexture.repeat.set( 10, 10 )
    // var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } )
    // var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
    // var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    // floor.position.y = -0.5
    // floor.rotation.x = Math.PI / 2
    // scene.add(floor)

    // SKYBOX/FOG
    // var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 )
    // var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } )
    // var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial )
    // scene.add(skyBox);
    // scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 )
  //   return scene
  // }

  initVideoContext = () => {
    let videoImage = document.createElement( 'canvas' )
    videoImage.width = this.width
    videoImage.height = this.height

    this.videoImageContext = videoImage.getContext( '2d' )
    // background color if no video present
    this.videoImageContext.fillStyle = '#ff0000'
    this.videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height )

    this.videoTexture = new THREE.Texture( videoImage )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  createMovieScreen = () => {
    const movieMaterial = new THREE.MeshBasicMaterial( { map: this.videoTexture, overdraw: true, side:THREE.DoubleSide } );
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    const movieGeometry = new THREE.PlaneGeometry( this.width, this.height, 10, 10 );
    let movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    movieScreen.position.set(0,0,0);
    return movieScreen
  }

  render = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoImageContext.drawImage( this.video, 0, 0 )
      if ( this.videoTexture )
  			this.videoTexture.needsUpdate = true
    }
  }
}
