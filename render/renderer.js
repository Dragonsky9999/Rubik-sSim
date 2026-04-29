import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCubieMesh } from "../src/CubieMesh"


export class Renderer {
    constructor(container){
        // -- scene -- //
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)

        // -- camera -- //
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        this.camera.position.z = 5

        // -- renderer -- //
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(container.clientWidth,container.clientHeight)

        this.renderer.domElement.id = "canvas"
        container.appendChild(this.renderer.domElement)

        // --controle-- //

        // -- cubie -- //
        this.cubies = []
    }

    render() {
        this.renderer.render(this.scene,this.camera)
    }

    createMesh(){
        createCubieMesh()
    }
}