// import * as THREE from "three"

// export class Animator {
//     constructor(scene, cube, renderer) {
//         this.scene = scene
//         this.cube = cube
//         this.renderer = renderer

//         this.group = new THREE.Group()
//         this.scene.add(this.group)

//         this.animating = false
//         this.move = null

//         this.progress = 0
//         this.speed = 0.15 // 速度調整
//         this.axis = new THREE.Vector3(0, 0, 0)
//     }

//     startMove(move) {
//         if (this.animating) return
//         this.animating = true

//         this.move = move
//         this.progress = 0

//         // ① 回転軸を決める
//         this.axis = this.getAxis(move)

//         // ② 対象キューブ取得
//         const meshes = this.getLayerMeshes(move)

//         // ③ groupに入れる
//         meshes.forEach(m => this.group.add(m))
//     }

//     update(dt) {
//         if (!this.animating) return

//         this.progress += dt * this.speed

//         const angle = this.progress * Math.PI / 2

//         // 軸回転
//         this.group.rotation.set(0, 0, 0)
//         this.group.rotateOnAxis(this.axis, angle)

//         // 終了判定
//         if (this.progress >= 1) {
//             this.finishMove()
//         }
//     }

//     finishMove() {
//         // ① group解除
//         const children = [...this.group.children]
//         children.forEach(m => {
//             this.scene.add(m)
//         })

//         this.group.clear()

//         // ② 論理更新
//         this.cube.applyMove(this.move)

//         // ③ 見た目同期
//         const cubies = BuildCubies(this.cube)
//         for (let i = 0; i < cubies.length; i++) {
//             const m = this.renderer.meshes[i]
//             m.position.set(...cubies[i].pos)
//         }

//         this.animating = false
//         this.move = null
//     }

//     getAxis(move) {
//         const map = {
//             "R": new THREE.Vector3(1, 0, 0),
//             "R'": new THREE.Vector3(1, 0, 0),

//             "L": new THREE.Vector3(1, 0, 0),
//             "L'": new THREE.Vector3(1, 0, 0),

//             "U": new THREE.Vector3(0, 1, 0),
//             "U'": new THREE.Vector3(0, 1, 0),

//             "D": new THREE.Vector3(0, 1, 0),
//             "D'": new THREE.Vector3(0, 1, 0),

//             "F": new THREE.Vector3(0, 0, 1),
//             "F'": new THREE.Vector3(0, 0, 1),

//             "B": new THREE.Vector3(0, 0, 1),
//             "B'": new THREE.Vector3(0, 0, 1),

//             "M": new THREE.Vector3(1, 0, 0),
//             "E": new THREE.Vector3(0, 1, 0),
//             "S": new THREE.Vector3(0, 0, 1),
//         }
//         return map[move]
//     }
    
//     getLayerMeshes(move) {
//         const meshes = this.renderer.meshes

//         return meshes.filter((m, i) => {
//             const pos = this.cube.state.CP[i] // 仮

//             // ここは後で完全判定にする
//             return true
//         })
//     }
// }
