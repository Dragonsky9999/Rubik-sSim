import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCubieMesh,createMat } from "./cubiemesh.js"
import { BuildCubies } from "../src/BuildCubies.js";
import { moveDefs } from "../src/moveDefs.js";
import { Animator } from "./Animate.js";

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
        this.cubies = []
        this.meshes = []

        // -- animator -- //
        this.animator = new Animator(this.scene,this.cube,this.renderer)

        // -- queue -- //
        this.queue = []

        this.isMovinng = false
        // -- start loop -- //
        this.animate = this.animate.bind(this)
    }

    async processQueue(cube){
        if (this.animator.isMovinng) return
        this.animator.isMoving = true

        while (this.queue.length > 0) {
            const move = this.queue.shift()
            await this.animateMove(moveDefs[move])
            cube.applyMove(move)
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

        const targets = this.meshes.filter(m => def.layer(m))

        // groupに入れる
        targets.forEach(m => group.attach(m))

        // ---- 回転軸（とりあえずR想定）----
        const axis = new THREE.Vector3(...def.axis)

        const duration = 250
        const start = performance.now()

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
        this.update(cube)
        this.renderer.render(this.scene, this.camera)
    }

    // -- 最初にキュービーをつくる -- //
    buildCubies(cube){
        this.cubies = BuildCubies(cube)

        const meshes = createCubieMesh(this.cubies)
        this.meshes = (meshes)
        for (let i = 0; i < this.cubies.length; i++){
            const cubie = this.cubies[i]
            const mesh = this.meshes[i]

            mesh.position.set(...cubie.pos)
            this.scene.add(mesh)
        }
    }


    sync(cube) {
        for (let i = 0; i < this.cubies.length; i++) {

            const cubie = this.cubies[i]   // state側
            const mesh = this.meshes[i]    // render側

            mesh.position.set(
                cubie.pos[0],
                cubie.pos[1],
                cubie.pos[2]
            )
    }
}
    // -- 回転アニメーション -- //

    // -- リアルタイム更新 -- //
    update(cube){
        const cornerCubies = this.cubies.filter(c => c.type == "corner")
        const edgeCubies = this.cubies.filter(c => c.type == "edge")
        const centerCubies = this.cubies.filter(c => c.type == "center")
        for (let i=0; i<cube.state.CP.length; i++){
            cornerCubies[i].where = cube.state["CP"][i]
            cornerCubies[i].ori = cube.state["CO"][i]
            this.cubies = [...cornerCubies,...edgeCubies,...centerCubies]
        }
        for (let i=0; i<cube.state.EP.length; i++){
            edgeCubies[i].where = cube.state["EP"][i]
            edgeCubies[i].ori = cube.state["EO"][i]
            this.cubies = [...cornerCubies,...edgeCubies,...centerCubies]
        }
        for (let i=0; i<cube.state.CenterP.length; i++){
            centerCubies[i].where = cube.state["CenterP"][i]
            this.cubies = [...cornerCubies,...edgeCubies,...centerCubies]
        }
        for (let i=0; i<this.cubies.length; i++){
            const cubie = this.cubies[i]
            const mesh = this.meshes[i]
            const newMeshMat = createMat(this.cubies,cubie.type,cubie.index)

            mesh.material = newMeshMat
        }
    }
}

