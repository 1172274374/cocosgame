import { _decorator, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PiplineCtrl')
export class PiplineCtrl extends Component {

    @property(CCInteger)
    private speed: number = 50;

    @property(CCInteger)
    private width: number = 400;

    start() {

    }

    update(deltaTime: number) {
        for (let pipe of this.node.children) {
            pipe.setPosition(pipe.position.x - this.speed * deltaTime, pipe.position.y);

            // 重复 Sprite
            if (pipe.position.x < -this.width) {
                pipe.setPosition(pipe.position.x + this.width * 2, Math.random() * 340 + 270);
            }
        }
    }
}

