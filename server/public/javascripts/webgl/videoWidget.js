import Widget from './widget'

export default class VideoWidget extends Widget {
  constructor(video) {
    super()

    this.scene = this.initScene()

    // create the video element
    //video = document.createElement( 'video' );
    this.video = video
    // video.id = 'video';
  	// video.type = ' video/ogg; codecs="theora, vorbis" ';
  	// video.src = "videos/sintel.ogv";
    this.video.load()
    //video.play();

    this.videoImageContext = null
    this.videoTexture = null
    this.initVideoContext()

    const movieScreen = this.createMovieScreen()
    this.scene.add(movieScreen)

    this.camera.position.set(0,150,300)
    this.camera.lookAt(movieScreen.position)
    this.scene.add(this.camera)
  }

  initScene = () => {
    // SCENE
    let scene = new THREE.Scene()

    // LIGHT
    var light = new THREE.PointLight(0xffffff)
    light.position.set(0,250,0)
    scene.add(light)

    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' )
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set( 10, 10 )
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } )
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.y = -0.5
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 )
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } )
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial )
    // scene.add(skyBox);
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 )
    return scene
  }

  initVideoContext = () => {
    let videoImage = document.createElement( 'canvas' )
    videoImage.width = 480
    videoImage.height = 204

    this.videoImageContext = videoImage.getContext( '2d' )
    // background color if no video present
    this.videoImageContext.fillStyle = '#000000'
    this.videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height )

    this.videoTexture = new THREE.Texture( videoImage )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  createMovieScreen = () => {
    const movieMaterial = new THREE.MeshBasicMaterial( { map: this.videoTexture, overdraw: true, side:THREE.DoubleSide } );
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    const movieGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
    let movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    movieScreen.position.set(0,50,0);
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
