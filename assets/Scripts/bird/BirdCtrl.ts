import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, v2, RigidBody2D, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdCtrl')
export class BirdCtrl extends Component {
    onLoad() {
        // 检测小鸟碰撞
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.ranhsizhang, this);
        }
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }

    fly(): void {
        this.node.getComponent(RigidBody2D).linearVelocity = v2(0, 6);
    }

    ranhsizhang(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) :void {
        // this.node.getComponent(Animation).stop();
        console.log(selfCollider.tag, otherCollider.tag)
    }
}

