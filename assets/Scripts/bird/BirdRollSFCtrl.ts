import { BirdCtrl } from './BirdCtrl';
import { _decorator, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdRollSFCtrl')
export class BirdRollSFCtrl extends Component {

    @property(CCInteger)
    private speed: number = 20;

    @property(CCInteger)
    private width: number = 400;

    @property(BirdCtrl)
    private bird: BirdCtrl = null;

    start() {
        for (let item of this.node.children) {
            item.on(Node.EventType.MOUSE_DOWN, () => {
                this.bird?.fly();
            })
        }
    }

    update(deltaTime: number) {
        for (let item of this.node.children) {
            // 移动 Sprite
            item.setPosition(item.position.x - this.speed * deltaTime, item.position.y);
            // 重复 Sprite
            if (item.position.x < -this.width) {
                item.setPosition(item.position.x + this.width * 2, item.position.y);
            }
        }
    }
}

