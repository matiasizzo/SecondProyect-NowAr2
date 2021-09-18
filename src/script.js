import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

// cargar texturas

const loader = new THREE.TextureLoader()
const height = loader.load('/static/textures/height.png')
const texture = loader.load('/static/textures/texture1.jpg')
const alpha = loader.load('alpha.png')


// Controles de parametros
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)


// Materials

const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementdisplacementScale: .6,
    //alphamap: alpha,
    //transparent: true,
})

const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
plane.rotation.x = 181

gui.add(plane.rotation, 'x').min(0).max(600)

// Lights

const pointLight = new THREE.PointLight('00b3ff', 2)
pointLight.position.x = .2
pointLight.position.y = 10
pointLight.position.z = 4.4
scene.add(pointLight)

gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'z')

const col = { color: '#00ff00' }
gui.addColor(col, 'color').onChange(() => {
    pointLight.color.set(col.color)
})


// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight


    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camara
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,

})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animaciones

document.addEventListener('mousemove', animateFloor)

let mouseY = 0

function animateFloor(event) {
    mouseY = event.clientY
}


const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    plane.rotation.z = .5 * elapsedTime
    plane.material.displacementScale = mouseY * 0.0008


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()