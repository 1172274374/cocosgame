import { _decorator, Component, Node, CCBoolean } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundCtrl")
export class BackgroundCtrl extends Component {

  @property(CCBoolean)
  private symbol: boolean = true;

  start() { }

  update(deltaTime: number) {
    if (this.symbol) {
      for (let bgItem of this.node.children) {
        bgItem.setPosition(
          bgItem.getPosition().x,
          bgItem.getPosition().y - 150 * deltaTime
        );
        if (bgItem.getPosition().y <= -430) {
          bgItem.setPosition(
            bgItem.getPosition().x,
            bgItem.getPosition().y + 1704
          );
        }
      }
    }
  }

  restart(): void {
    this.symbol = false
  }

  pause(): void {
    this.symbol = false
  }

}
