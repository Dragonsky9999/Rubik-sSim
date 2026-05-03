export class Cubies {
    container(){
        this.state = {
            "corner":[
                {id:0,where:0,pos:[1,1,1],ori:0,faces:["+X","+Y","+Z"],colors:["red","white","green"]},
                {id:1,where:1,pos:[-1,1,1],ori:0,faces:["-X","+Z","+Y"],colors:["orange","white","green"]},
                {id:2,where:2,pos:[-1,1,-1],ori:0,faces:["-X","+Y","-Z"],colors:["orange","white","blue"]},
                {id:3,where:3,pos:[1,1,-1],ori:0,faces:["+X","-Z","+Y"],colors:["red","white","blue"]},
                {id:4,where:4,pos:[1,-1,1],ori:0,faces:["+X","+Z","-Y"],colors:["red","yellow","green"]},
                {id:5,where:5,pos:[-1,-1,1],ori:0,faces:["-X","-Y","+Z"],colors:["orange","yellow","green"]},
                {id:6,where:6,pos:[-1,-1,-1],ori:0,faces:["-X","-Z","-Y"],colors:["orange","yellow","blue"]},
                {id:7,where:7,pos:[1,-1,-1],ori:0,faces:["+X","-Y","-Z"],colors:["red","yellow","blue"]},
            ],
            "edge":[
                {id:0,where:0,pos:[1,1,0],ori:0,faces:["+X","+Y"],colors:["red","white"]},
                {id:1,where:1,pos:[0,1,1],ori:0,faces:["+Y","+Z"],colors:["white","green"]},
                {id:2,where:2,pos:[-1,1,0],ori:0,faces:["-X","+Y"],colors:["orange","white"]},
                {id:3,where:3,pos:[0,1,-1],ori:0,faces:["+Y","-Z"],colors:["white","blue"]},
                {id:4,where:4,pos:[1,-1,0],ori:0,faces:["+X","-Y"],colors:["red","yellow"]},
                {id:5,where:5,pos:[0,-1,1],ori:0,faces:["-Y","+Z"],colors:["yellow","green"]},
                {id:6,where:6,pos:[-1,-1,0],ori:0,faces:["-X","-Y"],colors:["orange","yellow"]},
                {id:7,where:7,pos:[0,-1,-1],ori:0,faces:["-Y","-Z"],colors:["yellow","blue"]},
                {id:8,where:4,pos:[1,0,1],ori:0,faces:["+X","+Z"],colors:["red","green"]},
                {id:9,where:5,pos:[-1,0,1],ori:0,faces:["-X","+Z"],colors:["orange","green"]},
                {id:10,where:6,pos:[1,0,-1],ori:0,faces:["-X","-Z"],colors:["orange","blue"]},
                {id:11,where:7,pos:[-1,0,-1],ori:0,faces:["+X","-Z"],colors:["red","blue"]},
                
            ],
            "center":[
                {id:0,where:0,pos:[1,0,0],ori:0,faces:["+X"],colors:["red"]},
                {id:1,where:1,pos:[1,0,0],ori:0,faces:["-X"],colors:["orange"]},
                {id:2,where:2,pos:[0,1,0],ori:0,faces:["+Y"],colors:["white"]},
                {id:3,where:3,pos:[0,-1,0],ori:0,faces:["-Y"],colors:["yellow"]},
                {id:4,where:4,pos:[0,0,1],ori:0,faces:["+Z"],colors:["green"]},
                {id:5,where:5,pos:[0,0,-1],ori:0,faces:["-Z"],colors:[,"blue"]},
            ],
        }
    }
    update(cube){
        for (let n=0; n<3; n++){
            for (let i=0;i<cube.state.CP.length;i++){
                const where = cube.state.CP[i]
                this.state.corner[where].where = i
                this.state.corner[where].pos =  order[n][i]
                this.state.corner[where].ori = cube.state.CO[i]
            }
        }
    }
    getState(type){
        if (type == null) console.log(this.state)
        if (type == "corner") console.log(this.state["corner"])
        if (type == "edge") console.log(this.state["edge"])
        if (type == "center") console.log(this.state["center"])
    }
}

const order = [cornerPostions,edgePostions,centerPositions]
const cornerPositions = [
    [1,1,1],
    [-1,1,1],
    [-1,1,-1],
    [1,1,-1],
    [1,-1,1],
    [-1,-1,1],
    [-1,-1,-1],
    [1,-1,-1],
]
const edgePositions = [
    [1,1,0],
    [0,1,1],
    [-1,1,0],
    [0,1,-1],
    [1,-1,0],
    [0,-1,1],
    [-1,-1,0],
    [0,-1,-1],
    [1,0,1],
    [-1,0,1],
    [1,0,-1],
    [-1,0,-1],
]
const  centerPositions = [
    [1,0,0],
    [1,0,0],
    [0,1,0],
    [0,-1,0],
    [0,0,1],
    [0,0,-1],
]