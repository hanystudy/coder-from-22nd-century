import Detector from './detector'

const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

export default class Widget {
  constructor() {
    this.camera = this.initCamera()
    this.scene = this.initScene()

    this.scene.add(this.camera)
    this.camera.lookAt(this.scene.position)

    this.renderer = this.initRenderer()

    this.animate()
  }

  initCamera = () => {
    let camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR)
    camera.position.set(0,0,10)
    return camera
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

  initRenderer = () => {
    let renderer = null
    if ( Detector.webgl )
  		renderer = new THREE.WebGLRenderer( {antialias:true} )
  	else
  		renderer = new THREE.CanvasRenderer()
  	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

  	let container = document.getElementById( 'ThreeJS' )
  	container.appendChild( renderer.domElement )

    return renderer
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
