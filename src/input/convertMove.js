export function convertMove(move, currentFrontFace){

    const prefix = move[0]
    let suffix = move.slice(1)

    if (["U","D","R","L","F","B","M","E","S","x","y","z"].includes(suffix)) suffix = null

    const convertedMove = convertTable[currentFrontFace][prefix]

    if (flipTable[currentFrontFace][prefix]) suffix = flipSuffix(suffix)

    if (!suffix) return convertedMove
    return convertedMove + suffix
}

const convertTable = {
    0:{"R":"B","L":"F","U":"U","D":"D","F":"R","B":"L","M":"S","E":"E","S":"M","x":"z","y":"y","z":"x"},
    1:{"R":"F","L":"B","U":"U","D":"D","F":"L","B":"R","M":"S","E":"E","S":"M","x":"z","y":"y","z":"x"},
    4:{"R":"R","L":"L","U":"U","D":"D","F":"F","B":"B","M":"M","E":"E","S":"S","x":"x","y":"y","z":"z"},
    5:{"R":"L","L":"R","U":"U","D":"D","F":"B","B":"F","M":"M","E":"E","S":"S","x":"x","y":"y","z":"z"}
}

const flipTable = {
    0:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"M":false,"E":false,"S":true,"x":true,"y":false,"z":false},
    1:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"M":true,"E":false,"S":false,"x":false,"y":false,"z":true},
    4:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"M":false,"E":false,"S":false,"x":false,"y":false,"z":false},
    5:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"M":true,"E":false,"S":true,"x":true,"y":false,"z":true}
}

function flipSuffix(suffix){
    if (suffix == "2" || suffix == "3") return suffix
    if (!suffix) return "'"
    return null
}