import * as THREE from 'three'

export function createCubieMesh(){
    const geo = new THREE.BoxGeometry(1,1,1)
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    return new THREE.Mesh(geo,mat)
}