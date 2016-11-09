import Widget from './widget'
import Display from './display'
import VideoDisplay from './videoDisplay'

const DISPLAY_WIDTH = 2880, DISPLAY_HEIGHT = 1800

export default class MainWindow extends Widget {
  constructor(video, width, height) {
    super()

    this.video = video
    this.windowWidth = width
    this.windowHeight = height

    this.resizeWidget(this.windowWidth, this.windowHeight)

    this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 10000)
    this.scene = this.initScene()

    this.camera.position.set(this.windowWidth/2 + 50, this.windowHeight/2, 1000)
    this.camera.lookAt(new THREE.Vector3(this.windowWidth/2 + 50, this.windowHeight/2, 0))
    this.scene.add(this.camera)

    this.createDisplayGroup()

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  }

  createDisplayGroup = () => {
    let imageDisplay = new Display(new THREE.TextureLoader().load( "/images/checkerboard.jpg"), DISPLAY_WIDTH, DISPLAY_HEIGHT)
    display.setPosition(100 + this.windowWidth, 0, 0)
    this.scene.add(display.getMesh())

    this.videoDisplay = new VideoDisplay(this.video, DISPLAY_WIDTH, DISPLAY_HEIGHT)
    this.videoDisplay.setPosition(-this.windowWidth/2, 0, 0)
    this.scene.add(this.videoDisplay.getMesh())

    this.videoDisplay1 = new VideoDisplay(this.video, DISPLAY_WIDTH, DISPLAY_HEIGHT)
    this.videoDisplay1.setPosition(this.windowWidth*2, 0, 0)
    this.scene.add(this.videoDisplay1.getMesh())
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
    this.controls.update();
    this.videoDisplay.update()
    this.videoDisplay1.update()
  }
}
