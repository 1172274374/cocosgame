import { AnimationClip, Sprite, SpriteFrame,animation } from "cc";
import { PlayerStateMachine } from "../Scripts/Player/PlayerStateMachine";
import ResourceManager from "../Runtime/ResourceManager";

const ANIMATION_SPEED = 1 / 8

export default class State{
    private animationClip:AnimationClip
    constructor(private fsm:PlayerStateMachine,private path:string,wrapMode:AnimationClip.WrapMode = AnimationClip.WrapMode.Normal){
        this.init()
    }

    async init(){


        const promiss = ResourceManager.Instance.loadRes(this.path)
        this.fsm.waitingList.push(promiss)

        const spriteFrames = await promiss;

        this.animationClip = new AnimationClip();
        this.animationClip.duration = 1.0; // 整个动画剪辑的周期
        const track  = new animation.ObjectTrack(); // 创建一个对象轨道

        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
        
        const frames:Array<[number,SpriteFrame]> = spriteFrames.map((item,index)=>[ANIMATION_SPEED * index,item])
        track.channel.curve.assignSorted(frames);
        // 最后将轨道添加到动画剪辑以应用
        this.animationClip.addTrack(track);

        
        this.animationClip.duration = frames.length * ANIMATION_SPEED
        this.animationClip.wrapMode = AnimationClip.WrapMode.LoopReverse
        
    }

    run(){
        this.fsm.animateionComponent.defaultClip = this.animationClip
        this.fsm.animateionComponent.play()

    }

}