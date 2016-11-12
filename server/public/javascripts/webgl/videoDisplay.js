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
    this.videoTexture = new THREE.Texture( this.video )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  update = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoTexture.needsUpdate = true
    }
  }
}
