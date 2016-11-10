import VideoDisplay from './videoDisplay'

export default class SurfaceDisplay extends VideoDisplay {
  constructor(video, width = 576, height = 360) {
    super(video, width, height)

    this.display = this.createDisplayMesh(this.videoTexture)
  }

  createDisplayMesh = (texture) => {
    const displayMaterial = new THREE.MeshBasicMaterial({ map: texture, overdraw: true, side: THREE.DoubleSide})
    const displayGeometry = new THREE.SphereGeometry(75, 16, 8, 3.095, 3.15, 1, 1.1);
    return new THREE.Mesh(displayGeometry, displayMaterial)
  }
}
