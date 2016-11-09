import Widget from './widget'

const DISPLAY_WIDTH = 576, DISPLAY_HEIGHT = 360

export default class MainWindow extends Widget {
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

    this.windowWidth = width
    this.windowHeight = height

    this.resizeWidget(this.windowWidth, this.windowHeight)

    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 10000)
    this.scene = this.initScene()

    this.videoImageContext = null
    this.videoTexture = null
    this.initVideoContext()

    const movieScreen = this.createMovieScreen()
    movieScreen.position.set(-this.windowWidth/2,0,0)
    this.scene.add(movieScreen)

    const movieScreenRight = this.createMovieScreen()
    movieScreen.position.set(100 + this.windowWidth,0,0)
    this.scene.add(movieScreenRight)

    this.camera.position.set(this.windowWidth/2 + 50, this.windowHeight/2, 1000)
    this.camera.lookAt(new THREE.Vector3(this.windowWidth/2 + 50, this.windowHeight/2, 0))
    this.scene.add(this.camera)

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  }

  initScene = () => {
    // SCENE
    let scene = new THREE.Scene()

    // LIGHT
    var light = new THREE.PointLight(0xffffff)
    light.position.set(0,250,0)
    scene.add(light)

    // FLOOR
    var floorTexture = new THREE.TextureLoader().load( '/images/checkerboard.jpg' )
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set( 10, 10 )
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } )
    var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 10, 10)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.y = -this.windowHeight / 2
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 )
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } )
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial )
    scene.add(skyBox)
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 )
    return scene
  }

  initVideoContext = () => {
    let videoImage = document.createElement( 'canvas' )
    videoImage.width = this.windowWidth
    videoImage.height = this.windowHeight

    this.videoImageContext = videoImage.getContext( '2d' )
    // background color if no video present
    this.videoImageContext.fillStyle = '#ff0000'
    this.videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height )

    this.videoTexture = new THREE.Texture( videoImage )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  createMovieScreen = () => {
    const movieMaterial = new THREE.MeshBasicMaterial( { map: this.videoTexture, overdraw: true, side:THREE.DoubleSide } )
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    const movieGeometry = new THREE.PlaneGeometry( this.windowWidth, this.windowHeight, 1, 1)
    let movieScreen = new THREE.Mesh( movieGeometry, movieMaterial )
    return movieScreen
  }

  update = () => {
    this.controls.update();
  }

  render = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoImageContext.drawImage( this.video, 0, 0, this.windowWidth, this.windowHeight )
      if ( this.videoTexture )
  			this.videoTexture.needsUpdate = true
    }
  }
}
