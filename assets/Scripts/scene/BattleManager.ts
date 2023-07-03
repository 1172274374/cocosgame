import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from '../Tile/TileMapManager';
import { createUiNode } from '../Utils';
import levels ,{ ILevel }from '../../Levels';
import  DataManager  from '../../Runtime/DataManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
import { PlayerManager } from '../Player/PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    level:ILevel
    stage:Node


    onLoad() {
        EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL,this.nextLevel,this)
        EventManager.Instance.on(EVENT_ENUM.BACK_LEVEL,this.lastLevel,this)
    }

    onDestroy() {
        EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL,this.nextLevel)
        EventManager.Instance.off(EVENT_ENUM.BACK_LEVEL,this.lastLevel)
    }

    start() {
        this.generateStage()
        this.initLevel()
        
    }


    update(deltaTime: number) {
        
    }
    
    initLevel(){
        const level = levels[`level${DataManager.Instance.levelIndex}`]
        if(level){
            this.level = level
            this.clearLevel()
            DataManager.Instance.mapInfo = this.level.mapInfo
            DataManager.Instance.mapRowCount = this.level.mapInfo.length
            DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length
            
            this.generateTileMap()
            this.generatePlayer()
        }
    }

    nextLevel(){
        DataManager.Instance.levelIndex ++
        this.initLevel()
    }

    lastLevel(){
        DataManager.Instance.levelIndex --
        this.initLevel()
    }

    clearLevel(){
        this.stage.destroyAllChildren()
        DataManager.Instance.reset()
    }

    generateStage(){
        //舞台
        this.stage = createUiNode();
        this.stage.setParent(this.node);
    }

    generateTileMap(){
        console.log(this.stage);
        
        //地图
        const tileMap = createUiNode();
        tileMap.setParent(this.stage);
        
        const tileMaoManager =tileMap.addComponent(TileMapManager)
        
        tileMaoManager.init()
        this.addaptPos()
        
    }

    generatePlayer(){
        const player = createUiNode()
        player.setParent(this.node)

        const playerManager = player.addComponent(PlayerManager)

        playerManager.init()
    }

    addaptPos(){
        const {mapRowCount,mapColumnCount}  = DataManager.Instance
        const disX = (TILE_WIDTH * mapRowCount) / 2  - 60
        const disY = (TILE_HEIGHT * mapColumnCount) / 2 -60

        this.stage.setPosition(-disX,disY)
        // this.stage.setScale(0.9,0.9)
    }
}


