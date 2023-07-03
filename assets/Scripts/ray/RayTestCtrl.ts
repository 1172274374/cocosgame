import { _decorator, Component, Node, Vec2, v2, PhysicsSystem2D, ERaycast2DType, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroCtrl')
export class RayTestCtrl extends Component {

    @property(Vec2)
    private direct: Vec2 = v2(0, 1);

    onLoad() {
        PhysicsSystem2D.instance.enable = true;
    }

    start() {
        
    }

    update(deltaTime: number) {
        this.node.setPosition(this.node.position.x, this.node.position.y + this.direct.y * 150 * deltaTime);

        const checkRes = PhysicsSystem2D.instance.raycast(this.node.worldPosition, v2(this.node.worldPosition.x, this.node.worldPosition.y + this.direct.y * 100), ERaycast2DType.Closest);

        if (checkRes.length > 0) {
            this.direct.y = this.direct.y * -1;
        }
    }
}

