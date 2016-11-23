export default class Display {
  THREE = window.THREE || {};

  constructor(texture, width = 576, height = 360) {
    this.width = width
    this.height = height

    this.display = this.createDisplayMesh(texture)
  }

  createDisplayMesh = (texture) => {
    const displayMaterial = new THREE.MeshBasicMaterial({ map: texture, overdraw: true, side: THREE.DoubleSide})
    const displayGeometry = new THREE.PlaneGeometry( this.width, this.height, 10, 10)
    return new THREE.Mesh(displayGeometry, displayMaterial)
  }

  getMesh = () => this.display

  setPosition = (x, y, z) => {
    this.display.position.set(x, y, z)
  }

  update = () => {}
}
