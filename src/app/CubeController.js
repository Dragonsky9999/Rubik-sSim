import { MoveOrchestrator } from "./MoveOrchestrator"
import { InputController } from "../input/input"

class CubeController {
    constructor(sceneContainer, { enableKeyboard = true } = {}) {
        this.orchestrator = new MoveOrchestrator(sceneContainer)
        
        if (enableKeyboard) {
            this.input = new InputController(this.orchestrator)
            window.addEventListener("keydown", e => this.input.handleKeyDown(e))
            window.addEventListener("keyup", e => this.input.handleKeyUp)
        }
    }
}

const container = document.getElementById("sceneContainer")
const App = new CubeController(container)

App.orchestrator.loop()

