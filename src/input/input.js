import { PllAlgs } from '../domain/cube/PllAlgorithms'

const keyMap = {
    u: "U", U: "U'",
    d: "D", D: "D'",
    f: "F", F: "F'",
    b: "B", B: "B'",
    r: "R", R: "R'",
    l: "L", L: "L'",
    m: "M", M: "M'",
    e: "E", E: "E'",
    s: "S", S: "S'",
    x: "x", X: "x'",
    y: "y", Y: "y'",
    z: "z", Z: "z'",
}

let isSpacePressed = false;
let isA = false
let isB = false
let isC = false
let isD = false


export class InputController {
    constructor(orchestrator){
        this.orchestrator = orchestrator
    }
    
    handleKeyDown(e){
        e.preventDefault()
        console.log(e)
        if (e.code === "Space") isSpacePressed = true
        if (e.key === "ArrowLeft") isA = true
        else if (e.key === "ArrowUp") isB = true
        else if (e.key === "ArrowRight") isC = true
        else if (e.key === "ArrowDown") isD = true
        
        if (isSpacePressed){
            if (e.key == "h") return PllAlgs.H[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "z") return PllAlgs.Z[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "e") return PllAlgs.E[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "f") return PllAlgs.F[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "t") return PllAlgs.T[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "y") return PllAlgs.Y[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "v") return PllAlgs.V[0].forEach(m => this.orchestrator.enqueue(m))
                                    
            if (e.key == "u") return isB ? PllAlgs.Ub[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Ua[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "a") return isB ? PllAlgs.Ab[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Aa[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "j") return isB ? PllAlgs.Jb[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Ja[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "r") return isB ? PllAlgs.Rb[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Ra[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "n") return isB ? PllAlgs.Nb[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Na[0].forEach(m => this.orchestrator.enqueue(m))
            if (e.key == "g") return isD ? PllAlgs.Gd[0].forEach(m => this.orchestrator.enqueue(m)) : isC ? PllAlgs.Gc[0].forEach(m => this.orchestrator.enqueue(m)) : isB ? PllAlgs.Gb[0].forEach(m => this.orchestrator.enqueue(m)) : PllAlgs.Ga[0].forEach(m => this.orchestrator.enqueue(m))
        } else {
            const key = keyMap[e.key]
            if (!key) return
            
            return this.orchestrator.enqueue(key)
        }
    }

    handleKeyUp(e){

    if (e.code === "Space") isSpacePressed = false
    if (e.key === "ArrowLeft") isA = false
    if (e.key === "ArrowUp") isB = false
    if (e.key === "ArrowRight") isC = false
    if (e.key === "ArrowDown") isD = false

    }
}

