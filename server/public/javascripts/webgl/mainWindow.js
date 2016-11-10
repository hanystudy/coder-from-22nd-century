import Widget from './widget'
import Display from './display'
import VideoDisplay from './videoDisplay'
import SurfaceDisplay from './surfaceDisplay'

const DISPLAY_WIDTH = 288, DISPLAY_HEIGHT = 180, DISTANCE = 400, GAP = 10
const DISPLAY_POSITIONS = [
  [-DISPLAY_WIDTH -GAP, 0, 0],[0, 0, 0],[DISPLAY_WIDTH +GAP, 0, 0],
  // [-DISPLAY_WIDTH -10, DISPLAY_HEIGHT, 0],[0, DISPLAY_HEIGHT, 0],[DISPLAY_WIDTH +10, DISPLAY_HEIGHT, 0]
]

export default class MainWindow extends Widget {
  constructor(video, width, height) {
    super()

    this.video = video
    this.windowWidth = width
    this.windowHeight = height

    this.resizeWidget(this.windowWidth, this.windowHeight)

    this.camera = new THREE.PerspectiveCamera( 45, DISPLAY_WIDTH/DISPLAY_HEIGHT, 0.1, 10000)
    this.scene = this.initScene()

    this.camera.position.set(0, 0, DISTANCE)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene.add(this.camera)

    // this.scene.add(new THREE.AxisHelper(50))

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    THREEx.WindowResize(this.renderer, this.camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    this.displays = this.createDisplayGroup()
  }

  createDisplayGroup = () => {
    let displays = []

    DISPLAY_POSITIONS.forEach((position) => {
      let display = new VideoDisplay(this.video, DISPLAY_WIDTH, DISPLAY_HEIGHT)
      display.setPosition(...position)
      this.scene.add(display.getMesh())
      displays.push(display)
    })

    displays[0].getMesh().translateX(DISPLAY_WIDTH/2 + GAP).rotateY(Math.PI/4).translateX(-DISPLAY_WIDTH/2 - GAP)
    displays[2].getMesh().translateX(-DISPLAY_WIDTH/2 - GAP).rotateY(-Math.PI/4).translateX(DISPLAY_WIDTH/2 + GAP)

    // let surfaceDisplay = new SurfaceDisplay(this.video, DISPLAY_WIDTH, DISPLAY_HEIGHT, DISTANCE)
    // surfaceDisplay.setPosition(-GAP/4.5, 0, DISTANCE/1.4)
    // surfaceDisplay.getMesh().rotateY(Math.PI).translateZ(-DISTANCE/1.6)
    // this.scene.add(surfaceDisplay.getMesh())
    // displays.push(surfaceDisplay)
    return displays
  }

  initScene = () => {
    let scene = new THREE.Scene()

    var floorMaterial = new THREE.MeshBasicMaterial( { wireframe: true, side: THREE.DoubleSide } )
    var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 50, 50)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.set(0, -DISPLAY_HEIGHT/2, 0)
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    var skyBoxGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 )
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } )
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial )
    scene.add(skyBox)
    return scene
  }

  update = () => {
    this.displays.forEach(display => display.update())
    this.controls.update()
  }
}
