import { _decorator, Collider, Collider2D, Component, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {

    onLoad(): void {
        let collider = this.getComponent(Collider2D);

        
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this)
        }
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }

    onBeginContact(seftCollider:Collider2D,otherCollider:Collider2D){
        console.log(seftCollider,otherCollider);
        console.log(123);
        
        
    }
}


