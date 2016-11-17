import VideoDisplay from './videoDisplay'

export default class SurfaceDisplay extends VideoDisplay {
  constructor(video, width = 576, height = 360) {
    super(video, width, height)

    this.display = this.createDisplayMesh(this.videoTexture)
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
}
