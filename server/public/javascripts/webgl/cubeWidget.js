import Widget from './widget'

export default class CubeWidget extends Widget {
  constructor() {
    super()

    this.cube = this.createCube()
    this.scene.add(this.cube)
  }

  createCube = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    return new THREE.Mesh( geometry, material )
  }

  render = () => {
    this.cube.rotation.x += 0.1;
		this.cube.rotation.y += 0.1;
  }
}
