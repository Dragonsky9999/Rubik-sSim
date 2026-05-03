import * as THREE from 'three'
import { Cubies } from '../src/cubies' 
import { color } from 'three/tsl'

const cubies = new Cubies()
export class Mesh {
    constructor(){
        this.meshes = []
    }

    update(cubies){
        console.log("cubies",cubies.state)
        const CornerCubies = cubies.state.corner
        const EdgeCubies = cubies.state.edge
        const CenterCubies = cubies.state.center
        const State = [CornerCubies,EdgeCubies,CenterCubies]

        for (let n=0;n<3;n++){
            for (let i=0; i<State[n].length; i++){
                const cubie = State[n][i]
                const id = i + n * 100
                const mesh = this.meshes.filter(m => m.userData.id == id)
    
                // -- color 作成　-- //
                let colors = [black,black,black,black,black,black]
    
                cubie.faces.forEach((axis, index) => {
                    colors[AxisMap[axis]] = colorMap[cubie.colors[index]]
                });
    
                // -- color 貼り付け -- //
                mesh[0].material = [...colors]
                mesh[0].position.set(...cubie.pos)
            }
        }
    }

    init(){
        for (let n=0; n<3; n++){
        
            for (let i=0; i<Object.keys(state[n]).length; i++){
                let colors = [black,black,black,black,black,black]
    
                const cubie = state[n][i]
                const geo = new THREE.BoxGeometry(0.95,0.95,0.95)
    
                cubie.faces.forEach((axis, i) => {
                    colors[AxisMap[axis]] = colorMap[cubie.colors[i]]
                });
                const mat = [...colors]
                const mesh = new THREE.Mesh(geo,mat)
                mesh.userData.id = n * 100 + i
                mesh.position.set(...cubie.pos)
                this.meshes.push(mesh)
            }
        }
    }
}

const state = [cubies.state.corner,cubies.state.edge,cubies.state.center]

const black = new THREE.MeshBasicMaterial({ color: "black" })
const red = new THREE.MeshBasicMaterial({ color: "red" })
const orange = new THREE.MeshBasicMaterial({ color: "orange" })
const white = new THREE.MeshBasicMaterial({ color: "white" })
const yellow = new THREE.MeshBasicMaterial({ color: "yellow" })
const green = new THREE.MeshBasicMaterial({ color: "green" })
const blue = new THREE.MeshBasicMaterial({ color: "blue" })

const AxisMap = {
    "+X":0,"-X":1,
    "+Y":2,"-Y":3,
    "+Z":4,"-Z":5
}

const colorMap = {
    "red": red, "orange": orange,
    "white": white, "yellow": yellow,
    "green": green, "blue": blue,
}