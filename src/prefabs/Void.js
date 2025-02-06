
class Void extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, frame) {
      super(scene, x, y, width, height, frame)
  
      scene.add.existing(this)
      scene.physics.add.existing(this)
    }

  preload(){
  }

  create(){




  }

  update(voidSpeed, playerSpeed) {
    if(this.y > 0){
        this.body.setVelocityY(playerSpeed - voidSpeed)//
    } else{
        this.body.setVelocityY(0)
    }
        
  }
  // 

}