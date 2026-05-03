import * as THREE from 'three'
import { ConditionalNode } from 'three/webgpu'

const faceColors = [0x000000, 0xffff00,0x00ff00,0x0000ff,0xff0000,0xff8000]

let map = {"+X":0,"-X":0,"+Y":0,"-Y":0,"+Z":0,"-Z":0,}

const ColorIndex = {
    "+X": 0,
    "-X": 1,
    "+Y": 2,
    "-Y": 3,
    "+Z": 4,
    "-Z": 5
}

const black = new THREE.MeshBasicMaterial({ color: "black" })
const red = new THREE.MeshBasicMaterial({ color: "red" })    // +X
const orange = new THREE.MeshBasicMaterial({ color: "orange" }) // -X
const white = new THREE.MeshBasicMaterial({ color: "white" })  // +Y
const yellow = new THREE.MeshBasicMaterial({ color: "yellow" }) // -Y
const green = new THREE.MeshBasicMaterial({ color: "green" })  // +Z
const blue = new THREE.MeshBasicMaterial({ color: "blue" })    // -Z

const colors = [red,orange,white,yellow,green,blue]

const CornerFaceOrder = {
    0: ["+X","+Y", "+Z"],
    1: ["-X","+Z","+Y"],
    2: ["-X","+Y","-Z"],
    3: ["+X","-Z","+Y"],
    4: ["+X","+Z","-Y"],
    5: ["-X","-Y","+Z"],
    6: ["-X","-Z","-Y"],
    7: ["+X","-Y","-Z"],

}

export function createCubieMesh(cubies){
    const result = []
    cubies.forEach(cubie => {

        // --mesh作成-- //
        const geo = new THREE.BoxGeometry(0.95,0.95,0.95)
        const mat = createMat(cubies,cubie.type,cubie.index)
        
        result.push(new THREE.Mesh(geo,mat))
    })
    return result
}

export function createMat(cubies,type,index) {
    const cubie = cubies.filter(c => c.type == type).filter(c => c.index == index)[0]
    const colorMap = [black,black,black,black,black,black]
    const sameTypeCubies = cubies.filter(c => c.type == cubie.type)
    const facecolors = cubie.type != "corner" ? sameTypeCubies[cubie.where].faces.map(c => ColorIndex[c]).map(c => colors[c]) : CornerFaceOrder[cubie.where].map(c => ColorIndex[c]).map(c => colors[c])
    // --ori適用-- //
    if (cubie.ori == 1){
        const tmp = facecolors.splice(-1)
        facecolors.unshift(tmp[0])
    } else if (cubie.ori == 2){
        const tmp = facecolors.splice(0,1)
        facecolors.push(tmp[0])
    }
    // --色貼り付け-- //
    if (cubie.type != "corner"){
            cubie.faces.forEach((axis,index) => {
            colorMap[ColorIndex[axis]] = facecolors[index]
        })
    } else {
        CornerFaceOrder[cubie.index].forEach((axis,index) => {
            colorMap[ColorIndex[axis]] = facecolors[index]
        });
    }
    return [colorMap[0], colorMap[1], colorMap[2], colorMap[3], colorMap[4], colorMap[5]]

}