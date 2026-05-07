import { CubeController } from "./app/index"

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("sceneContainer")
    const app = new CubeController(container)
    app.loop()
})