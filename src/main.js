import * as THREE from 'three';
import { Cube } from './Cube.js';
import { Renderer } from '../render/renderer.js'
import { PllAlgs } from './pll.js';
import { OllAlgs } from './oll.js';

const sceneContainer = document.getElementById("sceneContainer");
const cube = new Cube();
const renderer = new Renderer(sceneContainer);

function loop(){
    renderer.animate(cube)
    renderer.processQueue(cube)
    requestAnimationFrame(loop)
}
loop()

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

window.addEventListener("keydown", (e) => {
    console.log(e)

    if (e.code === "Space"){
        isSpacePressed = true
        e.preventDefault()
    }else if (e.key === "ArrowLeft") isA = true
    else if (e.key === "ArrowUp") isB = true
    else if (e.key === "ArrowRight") isC = true
    else if (e.key === "ArrowDown") isD = true
    
    if (isSpacePressed) {
        if (e.key == "h") renderer.queue.push(...PllAlgs.H[0])
        if (e.key == "z") renderer.queue.push(...PllAlgs.Z[0])
        if (e.key == "e") renderer.queue.push(...PllAlgs.E[0])
        if (e.key == "f") renderer.queue.push(...PllAlgs.F[0])
        if (e.key == "t") renderer.queue.push(...PllAlgs.T[0])
        if (e.key == "y") renderer.queue.push(...PllAlgs.Y[0])
        if (e.key == "v") renderer.queue.push(...PllAlgs.V[0])
                                
        if (e.key == "u") isB ? renderer.queue.push(...PllAlgs.Ub[0]) : renderer.queue.push(...PllAlgs.Ua[0])
        if (e.key == "a") isB ? renderer.queue.push(...PllAlgs.Ab[0]) : renderer.queue.push(...PllAlgs.Aa[0])
        if (e.key == "j") isB ? renderer.queue.push(...PllAlgs.Jb[0]) : renderer.queue.push(...PllAlgs.Ja[0])
        if (e.key == "r") isB ? renderer.queue.push(...PllAlgs.Rb[0]) : renderer.queue.push(...PllAlgs.Ra[0])
        if (e.key == "n") isB ? renderer.queue.push(...PllAlgs.Nb[0]) : renderer.queue.push(...PllAlgs.Na[0])
        if (e.key == "g") isD ? renderer.queue.push(...PllAlgs.Gd[0]) : isC ? renderer.queue.push(...PllAlgs.Gc[0]) : isB ? renderer.queue.push(...PllAlgs.Gb[0]) : renderer.queue.push(...PllAlgs.Ga[0])
    } else {
        const key = keyMap[e.key]
        if (!key) return
        
        renderer.queue.push(key)        
    }
})

window.addEventListener("keyup", e => {
    if (e.code === "Space"){
        isSpacePressed = false
    }else if (e.key === "ArrowLeft") isA = false
    else if (e.key === "ArrowUp") isB = false
    else if (e.key === "ArrowRight") isC = false
    else if (e.key === "ArrowDown") isD = false
    
})
