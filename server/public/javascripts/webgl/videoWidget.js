import Widget from './widget'

export default class VideoWidget extends Widget {
  constructor(video) {
    super()

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
    this.scene.add(movieScreen);

    this.camera.position.set(0,150,300);
    this.camera.lookAt(movieScreen.position);
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
      this.videoImageContext.drawImage( video, 0, 0 )
      if ( this.videoTexture )
  			this.videoTexture.needsUpdate = true
    }
  }
}
