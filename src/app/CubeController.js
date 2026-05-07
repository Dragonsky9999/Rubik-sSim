import { MoveOrchestrator } from "./MoveOrchestrator"
import { InputController, convertMove } from "../input/index"
import { updateFrontFace } from "../render/index"

export class CubeController {
    constructor(sceneContainer, { enableKeyboard = true, RenderFrontFace = true } = {}) {
        this.orchestrator = new MoveOrchestrator(sceneContainer)
        
        if (enableKeyboard) {
            this.input = new InputController(this.orchestrator)
            window.addEventListener("keydown", e => this.input.handleKeyDown(e,this.frontIndex))
            window.addEventListener("keyup", e => this.input.handleKeyUp(e))
        }
        if (RenderFrontFace) {
            const frontFaceIndicator = document.createElement("div")
            frontFaceIndicator.id = "frontFaceIndicator"
            sceneContainer.appendChild(frontFaceIndicator)

            this.frontFaceIndicator = frontFaceIndicator
        }
        
    }
    
    loop(){
        this.orchestrator.renderer.loop()
        this.frontIndex = this.orchestrator.renderer.bestFace
        this.face = this.orchestrator.cube.state.CenterP[this.frontIndex]
        
        if (this.frontFaceIndicator) updateFrontFace(this.face,this.frontFaceIndicator)
        
        requestAnimationFrame(() => this.loop())
    }
}