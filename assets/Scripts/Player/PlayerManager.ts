import { _decorator, Component, animation, AnimationClip, Sprite, UITransform, Animation, SpriteFrame } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
import { CONTROLLER_ENUM, EVENT_ENUM, PARAMS_NAME_ENUM } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;




@ccclass('PlayerManager')
export class PlayerManager extends Component {

    x:number = 0
    y:number = 0
    targetX:number = 0
    targetY:number = 0
    private readonly speed = 1/10
    fsm:PlayerStateMachine

    async init(){
       const sprite = this.addComponent(Sprite)
       sprite.sizeMode = Sprite.SizeMode.CUSTOM
       
       const transform = this.getComponent(UITransform)
       transform.setContentSize(TILE_WIDTH * 4,TILE_HEIGHT * 4)

       this.fsm = this.node.addComponent(PlayerStateMachine)
       this.fsm.init()
       this.fsm.setParamas(PARAMS_NAME_ENUM.IDLE,true)
    //    await this.render()
       
       EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL,this.move,this)
    }

    update() {
        this.updateXY()

        console.log(this.x * TILE_WIDTH - TILE_WIDTH * 1.5, -this.y * TILE_HEIGHT + TILE_HEIGHT * 1.5);
        
        this.node.setPosition(this.x * TILE_WIDTH - TILE_WIDTH * 0.7, -this.y * TILE_HEIGHT + TILE_HEIGHT * 1.2)
    }

    updateXY(){
        if(this.targetX < this.x){
            this.x -= this.speed
        }else if(this.targetX > this.y){
            this.x += this.speed
        }

        if(this.targetY < this.y){
            this.y -= this.speed
        }else if(this.targetY > this.y){
            this.y += this.speed
        }

        if(Math.abs(this.targetX - this.x) <= 0.1 && Math.abs(this.targetY - this.y) <= 0.1){
            this.x = this.targetX
            this.y = this.targetY

            
        }
        
    }

    move(inputDirection:CONTROLLER_ENUM){
        
        
        if(inputDirection === CONTROLLER_ENUM.TOP){
            this.targetY -= 1
        }else if(inputDirection === CONTROLLER_ENUM.BOTTOM){
            this.targetY += 1
        }else if(inputDirection === CONTROLLER_ENUM.LEFT){
            this.targetX -= 1
        }else if(inputDirection == CONTROLLER_ENUM.RIGHT){
            this.targetX += 1
        }else if(inputDirection == CONTROLLER_ENUM.TURNLEFT){
            this.fsm.setParamas(PARAMS_NAME_ENUM.TURNLEFT,true)
        }
    }    
        
    
    // async render(){

    //     const sprite = this.addComponent(Sprite)
    //     sprite.sizeMode = Sprite.SizeMode.CUSTOM
        
    //     const transform = this.getComponent(UITransform)
    //     transform.setContentSize(TILE_WIDTH * 4,TILE_HEIGHT * 4)

    //     const spriteFrames = await ResourceManager.Instance.loadRes("texture/player/idle/top")
    //     const animateionComponent = this.addComponent(Animation)

    //     const animationClip = new AnimationClip();
    //     animationClip.duration = 1.0; // 整个动画剪辑的周期
    //     const track  = new animation.ObjectTrack(); // 创建一个对象轨道

    //     track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
        
    //     const frames:Array<[number,SpriteFrame]> = spriteFrames.map((item,index)=>[ANIMATION_SPEED * index,item])
    //     track.channel.curve.assignSorted(frames);
    //     // 最后将轨道添加到动画剪辑以应用
    //     animationClip.addTrack(track);

        
    //     animationClip.duration = frames.length * ANIMATION_SPEED
    //     animationClip.wrapMode = AnimationClip.WrapMode.LoopReverse
    //     animateionComponent.defaultClip = animationClip
    //     animateionComponent.play()
    // }
}


