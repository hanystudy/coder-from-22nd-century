import Widget from './widget'
import Display from './display'
import VideoDisplay from './videoDisplay'

const DISPLAY_WIDTH = 1920, DISPLAY_HEIGHT = 1080
const DISPLAY_POSITIONS = [
  [- DISPLAY_WIDTH * 3/2, 0, 0],[- DISPLAY_WIDTH/2, 0, 0],[DISPLAY_WIDTH/2, 0, 0],
  [- DISPLAY_WIDTH * 3/2, DISPLAY_HEIGHT, 0],[- DISPLAY_WIDTH/2, DISPLAY_HEIGHT, 0],[DISPLAY_WIDTH/2, DISPLAY_HEIGHT, 0]
]

export default class MainWindow extends Widget {
  constructor(video, width, height) {
    super()

    this.video = video
    this.windowWidth = width
    this.windowHeight = height

    this.resizeWidget(this.windowWidth, this.windowHeight)

    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 10000)
    this.scene = this.initScene()

    this.camera.position.set(0, this.windowHeight/2, 2000)
    this.camera.lookAt(new THREE.Vector3(0, this.windowHeight/2, 0))
    this.scene.add(this.camera)

    this.displays = this.createDisplayGroup()

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  }

  createDisplayGroup = () => {
    let imageDisplay = new Display(new THREE.TextureLoader().load( "/images/checkerboard.jpg"), DISPLAY_WIDTH, DISPLAY_HEIGHT)
    imageDisplay.setPosition(100 + this.windowWidth, 0, 0)
    // this.scene.add(imageDisplay.getMesh())

    let displays = []
    DISPLAY_POSITIONS.forEach((position) => {
      let video = this.video
      let display = new VideoDisplay(video, DISPLAY_WIDTH, DISPLAY_HEIGHT)
      display.setPosition(...position)
      this.scene.add(display.getMesh())
      displays.push(display)
    })

    return displays
  }

  initScene = () => {
    // SCENE
    let scene = new THREE.Scene()

    // LIGHT
    var light = new THREE.PointLight(0xffffff)
    light.position.set(0,250,0)
    scene.add(light)

    // FLOOR
    var floorTexture = new THREE.TextureLoader().load( '/images/checkerboard.jpg' )
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set( 10, 10 )
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } )
    var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 10, 10)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.y = -this.windowHeight / 2
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 )
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } )
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial )
    scene.add(skyBox)
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 )
    return scene
  }

  update = () => {
    // this.controls.update();
    this.displays.forEach(display => display.update())
  }
}
