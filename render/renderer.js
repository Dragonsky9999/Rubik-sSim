import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { moveDefs } from "../src/moveDefs.js";
import { Animator } from "./Animate.js";
import { Cubies } from "../src/cubies.js";
import { Mesh } from "./mesh.js"

export class Renderer {
    constructor(container){
        // -- scene -- //
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x0104f)

        // -- camera -- //
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        this.camera.position.set(3, 3, 5)

        // -- renderer -- //
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(container.clientWidth, container.clientHeight)

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

        // -- animator -- //
        this.animator = new Animator(this.scene,this.cube,this.renderer)

        // -- queue -- //
        this.queue = []

        this.isMovinng = false

        // -- start loop -- //]
        this.Mesh.init()
        this.Mesh.meshes.forEach(mesh => this.scene.add(mesh))

        
        // this.animate = this.animate.bind(this)

    }

    async processQueue(cube){

        if (this.animator.isMovinng) return
        this.animator.isMoving = true

        while (this.queue.length > 0) {
            const move = this.queue.shift()
            await this.animateMove(moveDefs[move])
            cube.applyMove(move)
            cube.Cubies.update(cube)
            this.Mesh.update(cube.Cubies)
        }

        this.animator.isMoving = false
    }

    animateMove(move) {
    const def = move.render
    return new Promise((resolve) => {
        
        if (this.isMoving) return
        this.isMoving = true

        const group = new THREE.Group()
        this.scene.add(group)

        const targets = this.Mesh.meshes.filter(m => def.layer(m))

        // groupに入れる
        targets.forEach(m => group.attach(m))

        const axis = new THREE.Vector3(...def.axis)

        const duration = 250
        const start = performance.now()

            const sound = new Audio("/sounds/move.m4a")
            sound.playbackRate = 0.95 + Math.random() * 0.1
            sound.currentTime = 0
            sound.play()

        const animate = (time) => {

            const t = (time - start) / duration
            const progress = Math.min(t, 1)

            // 90度まで回す
            const angle = progress * def.angle

            group.rotation.set(0, 0, 0)
            group.rotateOnAxis(axis, angle)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {

                // ---- 終了処理 ----
                group.rotateOnAxis(axis,-def.angle)
                targets.forEach(m => this.scene.attach(m))
                this.scene.remove(group)

                this.isMoving = false
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

