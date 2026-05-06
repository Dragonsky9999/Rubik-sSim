import * as THREE from 'three';
import { Cube } from '../domain/cube/Cube.js';
import { Renderer } from '../render/Renderer.js'
import { moveDefs } from '../domain/cube/MoveDefs.js'

export class MoveOrchestrator {
    constructor(sceneContainer){
        this.sceneContainer = sceneContainer
        this.cube = new Cube()
        this.renderer = new Renderer(sceneContainer)

        //回転&アニメーション
        this.queue = []
        this.isAnimating = false

        this.isRunning = false        
    }
    
    enqueue(move){
        this.queue.push(move)
        this.processQueue()
    }

    async processQueue(){
        if (this.isAnimating) return
        this.isAnimating = true

        while (this.queue.length > 0){
            const move = this.queue.shift()

            // rendererにanimateさせる
            await this.renderer.animateMove(moveDefs[move].render)

            //アニメーション終わってからcube&cubiesの状態更新
            this.cube.applyMove(move)
            this.cube.Cubies.update(this.cube)

            //cubies情報からmeshes更新
            this.renderer.Mesh.update(this.cube.Cubies)
        }
        this.isAnimating = false
    }

    loop(){
        this.renderer.loop()
        requestAnimationFrame(() => this.loop())
    }
}