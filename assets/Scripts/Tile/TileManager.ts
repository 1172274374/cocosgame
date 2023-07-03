import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
import Levels from '../../Levels';
const { ccclass, property } = _decorator;


export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileManager')
export class TileManager extends Component {


    init(spriteFrame:SpriteFrame,i:number,j:number){



        const spite = this.addComponent(Sprite);
        // const imgSrc = `tile (${item.src})`


        spite.spriteFrame = spriteFrame

        const transform =  this.addComponent(UITransform)

        transform.setContentSize(TILE_WIDTH,TILE_HEIGHT)

        // node.layer = 1 << Layers.nameToLayer("UI_2D")
        this.node.setPosition(i*TILE_WIDTH,-j*TILE_HEIGHT)


    }
}
    
        




