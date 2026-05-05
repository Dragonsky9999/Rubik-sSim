import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { moveDefs } from "../src/moveDefs.js";
import { Cubies } from "../src/cubies.js";
import { Mesh } from "./mesh.js"

export class Renderer {
    constructor(container){
        // -- scene -- //
        this.scene = new THREE.Scene()
        this.scene.background = null

        // -- camera -- //
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        this.camera.position.set(3, 3, 5)

        // -- light -- //
        const light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(3, 3, 3);
        this.scene.add(light);
        const ambient = new THREE.AmbientLight(0xffffff, 5)
        this.scene.add(ambient)

        // -- renderer -- //
        this.renderer = new THREE.WebGLRenderer({   
            alpha: true,
            antialias: true 
        })

        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.setClearColor(0x000000, 0); // ←完全透明


        this.renderer.domElement.id = "canvas"
        container.appendChild(this.renderer.domElement)

        // -- controls -- //
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.enablePan = false;
        this.controls.dampingFactor = 0.05

        // -- cubie -- //
        // this.cubies = []
        this.Mesh = new Mesh(this.scene)

        // -- queue -- //
        this.queue = []

        this.isMovinng = false

        // -- start loop -- //]
        this.Mesh.init()
        this.Mesh.meshes.forEach(mesh => this.scene.add(mesh))

        
        // this.animate = this.animate.bind(this)

    }

    async processQueue(cube){

        if (this.isMoving) return
        this.isMoving = true

        while (this.queue.length > 0) {
            const move = this.queue.shift()
            console.log(move)
            await this.animateMove(moveDefs[move])
            cube.applyMove(move)
            cube.Cubies.update(cube)
            this.Mesh.update(cube.Cubies)
        }
        this.isMoving = false

    }

    animateMove(move) {
    const def = move.render
    return new Promise((resolve) => {
    
        const group = new THREE.Group()
        this.scene.add(group)

        const targets = this.Mesh.meshes.filter(m => def.layer(m))

        // groupに入れる
        targets.forEach(m => group.attach(m))

        const axis = new THREE.Vector3(...def.axis)

        const duration = 250
        const start = performance.now()

        // 音
        const sound = new Audio("./sounds/move.m4a")
        sound.playbackRate = 0.95 + Math.random() * 0.1
        sound.currentTime = 0
        sound.play()

        let prevAngle = 0

        const animate = (time) => {

            const t = (time - start) / duration
            const progress = Math.min(t, 1)

            const current = progress * def.angle
            const delta = current - prevAngle

            group.rotateOnAxis(axis, delta)

            prevAngle = current

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {

                group.rotateOnAxis(axis, -def.angle)
                targets.forEach(m => this.scene.attach(m))
                this.scene.remove(group)

                resolve()
            }
        }
        requestAnimationFrame(animate)
    })
}

    // -- loop -- //
    animate(cube) {
        this.controls.update()
        // this.update(cube)
        this.renderer.render(this.scene, this.camera)
    }

    quit(){
        this.renderer.dispose()
        this.scene.clear()
        this.controls.dispose()
        this.renderer.domElement.remove()
    }
}

