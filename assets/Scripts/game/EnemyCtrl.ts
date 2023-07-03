import {
  _decorator,
  Component,
  resources,
  SpriteFrame,
  Sprite,
  CCInteger,
  v3,
  CCBoolean,
} from "cc";
const { ccclass, property } = _decorator;

// 敌人
@ccclass("EnemyCtrl")
export class EnemyCtrl extends Component {
  @property(CCInteger)
  private speed: number = 250;

  @property(CCBoolean)
  public isDestory: boolean = false;

  start(): void { }

  update(deltaTime: number) {
    // 移动
    this.node.setWorldPosition(v3(this.node.getWorldPosition().x, this.node.getWorldPosition().y - this.speed * deltaTime));
    // 离开屏幕销毁子弹
    if (this.node.getPosition().y < -800) {
      this.node.destroy();
    }
  }

  // 死亡销毁
  die(): void {
    if (!this.isDestory) {
      this.isDestory = true;
      resources.load(
        "enemy0_die/spriteFrame",
        SpriteFrame,
        (err: Error, data: SpriteFrame) => {
          if (!err) {
            this.node.getComponent(Sprite).spriteFrame = data;
          }
          // 300ms后销毁
          setTimeout(() => {
            this.node?.destroy();
          }, 200);
        }
      );
    }
  }

  vectory(): void {
    resources.load(
      "enemy0_die/spriteFrame",
      SpriteFrame,
      (err: Error, data: SpriteFrame) => {
        if (!err) {
          this.node.getComponent(Sprite).spriteFrame = data;
        }
      }
    );
  }
}
