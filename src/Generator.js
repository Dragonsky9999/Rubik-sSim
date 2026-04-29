import { rotate } from "three/src/nodes/utils/RotateNode.js";
import { data } from "./data.js"
import { convert } from "three/src/nodes/tsl/TSLCore.js";

const cornerPoss = data[0];
const edgePoss = data[1];
const centerPoss = data[2];
let cubies = data[3];
const cornerPosMap = data[4];
const edgePosMap = data[5];
const centerPosMap = data[6];

const invertCO = [false,true,false,true,true,false,true,false]

export function generateMove(MoveName){

    let CP, CO, EP, EO, CenterP
    
    CP = cornerPoss.map(pos => Rotate(pos, pos, MoveName))
    EP = edgePoss.map(pos => Rotate(pos, pos, MoveName))
    CenterP = centerPoss.map(pos => Rotate(pos, pos, MoveName))

    const move = {
        CP: convertPositionsToIndexArray(CP,"corner"),
        CO: CO,
        EP: convertPositionsToIndexArray(EP,"edge"),
        EO: EO,
        CenterP: convertPositionsToIndexArray(CenterP,"center")
    }
    
    return move
}

/**
 * 回転後の座標配列を、対応するインデックス配列に変換する
 * @param {Array} rotatedPositions - 回転計算後の[x,y,z]の配列
 * @param {Object} posMap - data[4], [5], [6] などの元々の位置マップ
 */
function convertPositionsToIndexArray(rotatedPositions, posMap) {
    return rotatedPositions.map(pos => {
        // 1. 小数点誤差を消すために丸める
        const [rx, ry, rz] = pos.map(n => Math.round(n));

        // 2. マップ内をループして一致するインデックスを探す
        for (const [idx, originalPos] of Object.entries(posMap)) {
            const [ox, oy, oz] = originalPos.map(n => Math.round(n));
            
            if (rx === ox && ry === oy && rz === oz) {
                return parseInt(idx);
            }
        }

        // もし見つからなかったらエラーを出してデバッグしやすくする
        console.error(`一致する座標が見つかりません: [${rx}, ${ry}, ${rz}]`, posMap);
        return null;
    });
}

// function applyOri(moveName) {
//     const length = Object.keys(cubies).length
//     console.log(length)
//     for (let i=0;i<length;i++){
//         console.log(i,cubies[i])
//         const nextUp = Rotate(cubies[i].up, cubies[i].pos, moveName);

//         cubies[i].up = nextUp;
//         console.log(cubies[i])
//     }
// }
// applyOri("R");

function Rotate([x,y,z],[x2,y2,z2],type){
    if (type == "U"){
        if (y2 != 1) return [x,y,z];
        return [z,y,-x];
    }
    if (type == "U'"){
        if (y2 != 1) return [x,y,z];
        return [-z,y,x];
    }
    if (type == "D"){
        if (y2 != -1) return [x,y,z];
        return [-z,y,x];
    }
    if (type == "D'"){
        if (y2 != -1) return [x,y,z];
        return [z,y,-x];
    }
    if (type == "F"){
        if (z2 != 1) return [x,y,z];
        return [-y,x,z]
    }
    if (type == "F'"){
        if (z2 != 1) return [x,y,z];
        return [y,-x,z]
    }
    if (type == "B"){
        if (z2 != -1) return [x,y,z];
        return [y,-x,z]
    }
    if (type == "B'"){
        if (z2 != -1) return [x,y,z];
        return [-y,x,z]
    }
    if (type == "R"){
        if (x2 != 1) return [x,y,z];
        return [x,-z,y]
    }
    if (type == "R'"){
        if (x2 != 1) return [x,y,z];
        return [x,z,-y]
    }
    if (type == "L"){
        if (x2 != -1) return [x,y,z];
        return [x,z,-y]
    }
    if (type == "L'"){
        if (x2 != -1) return [x,y,z];
        return [x,-z,y]
    }
    if (type == "M"){
        if (x2 != 0) return [x,y,z];
        return [x,z,-y]
    }
    if (type == "M'"){
        if (x2 != 0) return [x,y,z];
        return [x,-z,y]
    }
    if (type == "E"){
        if (y2 != 0) return [x,y,z];
        return [-z,y,x]
    }
    if (type == "E'"){
        if (y2 != 0) return [x,y,z];
        return [z,-y,-x]
    }
    if (type == "S"){
        if (z2 != 0) return [x,y,z];
        return [-y,x,z]
    }
    if (type == "S'"){
        if (z2 != 0) return [x,y,z];
        return [y,-x,z]
    }
    if (type == "x"){
        return [x,-z,y]   
    }
    if (type == "x'"){
        return [x,z,-y]   
    }
    if (type == "y"){
        return [z,y,-x]
    }
    if (type == "y'"){
        return [-z,y,x]
    }
    if (type == "z"){
        return [-y,x,z]
    }
    if (type == "z'"){
        return [y,-x,z]
    }
}

