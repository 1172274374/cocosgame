import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
import Levels from '../../Levels';
import { createUiNode } from '../Utils';
import { TileManager} from './TileManager';
import DataManager from '../../Runtime/DataManager';
import ResourceManager from '../../Runtime/ResourceManager';
const { ccclass, property } = _decorator;


export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileMapManager extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    async init(){
        const spriteFrames = await ResourceManager.Instance.loadRes("texture/tile/tile")
        const {mapInfo} = DataManager.Instance
        console.log(spriteFrames);
        
        for(let i=0;i< mapInfo.length;i++){
            const column = mapInfo[i];
            for(let j=0;j< column.length;j++){
                const item = column[j];

                if(item.src === null || item.type === null){
                    continue;
                }


                const imgSrc = `tile (${item.src})`
                const node = createUiNode()
                
                const spriteFrame = spriteFrames.find(v=>v.name === imgSrc) || spriteFrames[0]
                
                const tileManager = node.addComponent(TileManager)
                tileManager.init(spriteFrame,i,j)

                node.setParent(this.node)
            }
        }
        
        
    }


    // loadRes(){
    //     return new Promise<SpriteFrame[]>((resolve,reject)=>{

    //         resources.loadDir("texture/tile/tile",SpriteFrame,(err,assets)=>{

    //             if(err){
    //                 reject(err)
    //                 return
    //             }

    //             resolve(assets)
    //         })

    //     })

    // }
}


