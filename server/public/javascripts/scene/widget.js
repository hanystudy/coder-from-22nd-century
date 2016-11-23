import Detector from './detector'

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;

export default class Widget {
  THREE = window.THREE || {}
  constructor() {
    this.renderer = this.initRenderer()

    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR)
    this.scene = new THREE.Scene()

    this.init()

    this.animate()
  }

  init = () => {
    this.camera.position.set(0,0,2)
    this.scene.add(this.camera)
    this.camera.lookAt(this.scene.position)
  }

  initRenderer = () => {
    let renderer = null
    if (Detector.webgl)
  		renderer = new THREE.WebGLRenderer({antialias: true})
  	else
  		renderer = new THREE.CanvasRenderer()

  	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

  	let container = document.getElementById('ThreeJS')
  	container.appendChild(renderer.domElement)

    return renderer
  }

  resizeWidget = (width, height) => {
    this.renderer.setSize(width, height)
  }

  animate = () => {
    requestAnimationFrame( this.animate )
    this.render()
    this.update()
    this.renderer.render(this.scene, this.camera)
  }

  render = () => {
  }

  update = () => {
  }
}
