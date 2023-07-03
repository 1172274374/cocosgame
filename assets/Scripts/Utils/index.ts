import {Layers, Node, UITransform, random} from "cc"

export const createUiNode = (name:string = '')=>{
    
    const node = new Node(name)
    const transform =  node.addComponent(UITransform)
    transform.setAnchorPoint(0,1)

    node.layer = 1 << Layers.nameToLayer("UI_2D")
    return node

}

export const randomByRange = (start: number,end:number) => Math.floor(start + (end -start) * Math.random())
 