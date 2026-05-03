import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Cube } from './Cube.js';
import { Renderer } from '../render/renderer.js'
import { moveDefs } from './moveDefs.js';

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

document.addEventListener("keydown", e => {
    const key = keyMap[e.key]
    if (key == "q") renderer.quit()
    if (!key) return
    
    
    renderer.queue.push(key)
})


