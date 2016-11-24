import Widget from './widget'
import SurfaceDisplay from './surfaceDisplay'

require('../helpers/THREEx.WindowResize')

const DISPLAY_WIDTH = 960, DISPLAY_HEIGHT = 600, DISTANCE = 280, GAP = 1

export default class MainWindow extends Widget {
  THREE = window.THREE || {};
  THREEx = window.THREEx || {};

  constructor(videos, width, height) {
    super()

    this.videos = videos
    this.windowWidth = width
    this.windowHeight = height

    this.resizeWidget(this.windowWidth, this.windowHeight)

    this.camera = new THREE.PerspectiveCamera( 60, DISPLAY_WIDTH/DISPLAY_HEIGHT, 0.1, 1000)
    this.scene = this.initScene()

    this.camera.position.set(0, 0, 0)
    this.camera.lookAt(new THREE.Vector3(0, 0, 1))
    this.scene.add(this.camera)

    // this.scene.add(new THREE.AxisHelper(50))

    THREEx.WindowResize(this.renderer, this.camera);

    this.displays = this.createDisplayGroup()
  }

  createDisplayGroup = () => {
    let displays = []

    let surfaceDisplay = new SurfaceDisplay(this.videos[0], DISPLAY_WIDTH, DISPLAY_HEIGHT)
    surfaceDisplay.setPosition(0, -25, -DISTANCE)
    this.scene.add(surfaceDisplay.getMesh())
    displays.push(surfaceDisplay)

    let surfaceDisplayLeft = new SurfaceDisplay(this.videos[2], DISPLAY_WIDTH, DISPLAY_HEIGHT)
    surfaceDisplayLeft.getMesh().rotateY(Math.PI / 2.6)
    surfaceDisplayLeft.setPosition(-DISPLAY_WIDTH/3.5, -25, -DISTANCE + 110)
    this.scene.add(surfaceDisplayLeft.getMesh())
    displays.push(surfaceDisplayLeft)

    let surfaceDisplayRight = new SurfaceDisplay(this.videos[3], DISPLAY_WIDTH, DISPLAY_HEIGHT)
    surfaceDisplayRight.getMesh().rotateY(-Math.PI / 2.6)
    surfaceDisplayRight.setPosition(DISPLAY_WIDTH/3.5, -25, -DISTANCE + 110)
    this.scene.add(surfaceDisplayRight.getMesh())
    displays.push(surfaceDisplayRight)

    let surfaceDisplayTop = new SurfaceDisplay(this.videos[1], DISPLAY_WIDTH, DISPLAY_HEIGHT)
    surfaceDisplayTop.getMesh().rotateX(Math.PI / 16)
    surfaceDisplayTop.setPosition(0, DISPLAY_HEIGHT/3.5, -DISTANCE + 8)
    this.scene.add(surfaceDisplayTop.getMesh())
    displays.push(surfaceDisplayTop)


    return displays
  }

  initScene = () => {
    let scene = new THREE.Scene()

    var floorMaterial = new THREE.MeshBasicMaterial( { wireframe: true, side: THREE.DoubleSide } )
    var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 50, 50)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.set(0, -DISPLAY_HEIGHT/2, 0)
    floor.rotation.x = Math.PI / 2
    // scene.add(floor)

    var imageLoader = new THREE.TextureLoader()
    imageLoader.load("/images/uni_lowfi.jpg", function(backgroundTexture) {
      var material = new THREE.MeshBasicMaterial({map:backgroundTexture, side: THREE.BackSide})
      var skyBox = new THREE.Mesh(
        new THREE.SphereGeometry(1000,60,40),
        material
      );
      skyBox.position.set(0, 0, 0)
      scene.add(skyBox)
    });

    return scene
  }

  setVR = (controls, effect) => {
    this.effect = effect
    this.controls = controls
  }

  update = () => {
    this.displays.forEach(display => display.update())
    this.controls.update()
    this.effect.render( this.scene, this.camera )
  }
}
