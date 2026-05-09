import { MoveOrchestrator } from "./MoveOrchestrator"
import { InputController, convertMove } from "../input/index"
import { updateFrontFace } from "../render/index"

export class CubeController {
    constructor(sceneContainer, { enableKeyboard = true, RenderFrontFace = true } = {}) {
        this.orchestrator = new MoveOrchestrator(sceneContainer)
        
        if (enableKeyboard) {
            this.input = new InputController(this.orchestrator)
            window.addEventListener("keydown", e => this.input.handleKeyDown(e,this.orchestrator.frontIndex))
            window.addEventListener("keyup", e => this.input.handleKeyUp(e))
        }
        if (RenderFrontFace) {
            const frontFaceIndicator = document.createElement("div")
            frontFaceIndicator.id = "frontFaceIndicator"
            frontFaceIndicator.className = "frontFaceIndicator"
            sceneContainer.appendChild(frontFaceIndicator)

            this.orchestrator.frontFaceIndicator = frontFaceIndicator
        }

        this.isRunning = false        
    }

    reset(){
        this.stop()
        this.orchestrator.reset()
        this.start()
    }

    start(){
        this.orchestrator.isRunning = true
        this.orchestrator.isProcessing = true
        this.orchestrator.loop()
    }
    
    stop(){
        this.orchestrator.isRunning = false
        this.orchestrator.isProcessing = false
    }
}