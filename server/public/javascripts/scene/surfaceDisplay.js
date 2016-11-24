export default class SurfaceDisplay {
  THREE = window.THREE || {}

  constructor(video, width = 576, height = 360) {
    this.width = width
    this.height = height

    this.video = video
    this.video.load()

    this.createContextAndTexture()

    this.display = this.createDisplayMesh(this.videoTexture)
  }

  createContextAndTexture = () => {
    this.videoTexture = new THREE.Texture( this.video )
    this.videoTexture.minFilter = THREE.LinearFilter
    this.videoTexture.magFilter = THREE.LinearFilter
  }

  createDisplayMesh = (texture) => {
    texture.flipY = false
    const displayMaterial = new THREE.MeshBasicMaterial({ /*wireframe: true, */map: texture, overdraw: true, side: THREE.DoubleSide})
    let displayGeometry = new THREE.CylinderGeometry( 1.0, 1.0, this.height/this.width/2.0, 100.0, 100.0, true, -0.25, 0.5 );
    displayGeometry.rotateY(-Math.PI).rotateZ(Math.PI)
    displayGeometry.scale(this.height, this.height, this.height)
    displayGeometry.translate(0, 0, this.height)
    return new THREE.Mesh(displayGeometry, displayMaterial)
  }

  getMesh = () => this.display

  setPosition = (x, y, z) => {
    this.display.position.set(x, y, z)
  }

  update = () => {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.videoTexture.needsUpdate = true
    }
  }

}
