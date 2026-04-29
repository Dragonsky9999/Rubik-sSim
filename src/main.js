import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Cube } from './Cube.js';
import { Renderer } from '../render/renderer.js'

const sceneContainer = document.getElementById("sceneContainer");
const cube = new Cube();
const renderer = new Renderer(sceneContainer);

// const mesh = renderer.createMesh()
const geo = new THREE.BoxGeometry(1,1,1)
const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
const mesh = new THREE.Mesh(geo,mat)
renderer.scene.add(mesh)

renderer.render()






