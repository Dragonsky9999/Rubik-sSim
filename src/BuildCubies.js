import { data } from "./data.js"

export function BuildCubies(cube){
   return [
    ...BuildCornerCubies(cube),
    ...BuildEdgeCubies(cube),
    ...BuildCenterCubies(cube)
   ]
}

const cornerPositions = data[0]
const edgePositions = data[1]
const centerPositions = data[2]


function BuildCornerCubies(cube){
    const result = []
    for (let i=0; i<cube.cornerSize; i++){
        const cubieIndex = cube.state.CP[i];
        const cubieOri = cube.state.CO[i];

        result.push({
            type: "corner",
            index: i,
            where: cubieIndex,
            pos: cornerPositions[i],
            ori: cubieOri,
            faces: createFaces(cornerPositions[i])
        })
    }
    return result
}

function BuildEdgeCubies(cube){
        const result = []
    for (let i=0; i<cube.edgeSize; i++){
        const cubieIndex = cube.state.EP[i];
        const cubieOri = cube.state.EO[i];

        result.push({
            type: "edge",
            index: i,
            where: cubieIndex,
            pos: edgePositions[i],
            ori: cubieOri,
            faces: createFaces(edgePositions[i])

        })
    }
    return result
}

function BuildCenterCubies(cube){
    const result = []
    for (let i=0; i<cube.centerSize; i++){
        const cubieIndex = cube.state.CenterP[i];
        const cubieOri = 0;

        result.push({
            type: "center",
            index: i,
            where: cubieIndex,
            pos: centerPositions[i],
            ori: cubieOri,
            faces: createFaces(centerPositions[i])
        })
    }
    return result
}

function createFaces(pos){
    const result = []
    for (let i=0; i<pos.length; i++){
        if (pos[i] == 0) continue;
        const prefix = pos[i] == 1 ? "+" : pos[i] == -1 ? "-" : ""
        const suffix = i == 0 ? "X" : i == 1 ? "Y" : "Z" 
        result.push(prefix + suffix)
    }
    return result
}

