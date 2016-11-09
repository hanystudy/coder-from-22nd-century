import Display from './display'

export default class VideoDisplay extends Display{
  constructor(video, width = 576, height = 360) {
    super()

    this.width = width
    this.height = height

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
    this.createContextAndTexture()

    this.display = this.createDisplayMesh(this.videoTexture)
  }

  createContextAndTexture = () => {
    let videoImage = document.createElement( 'canvas' )
    videoImage.width = this.width
    videoImage.height = this.height

    this.videoImageContext = videoImage.getContext( '2d' )
    // background color if no video present
    this.videoImageContext.fillStyle = '#00ff00'
    this.videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height )

    this.videoTexture = new THREE.Texture( videoImage )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  update = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoImageContext.drawImage(this.video, 0, 0, this.width, this.height)
      if (this.videoTexture)
        this.videoTexture.needsUpdate = true
    }
  }
}
