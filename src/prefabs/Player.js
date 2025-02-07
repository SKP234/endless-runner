class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      scene.add.existing(this)
      scene.physics.add.existing(this)
      //this.body.setCollideWorldBounds(true)
      this.body.setBounce(1)
      this.accelDir = 0
      this.body.setSize(7, 12).setOffset(0, 0)
      this.setScale(4)
    }

  preload(){
  }

  create(){



  }

  update(cursors, rocketstart, boost) {
    if(rocketstart){
      if (cursors.left.isDown) {
        this.accelDir = -2
        if(boost){
          this.accelDir = -4
        }
      } else if (cursors.right.isDown) {
        this.accelDir = 2
        if(boost){
          this.accelDir = 4
        }
      } else {
        this.accelDir = 0
      }
    
      if(Math.sign(this.accelDir) == Math.sign(this.body.velocity.x)){ // normal speed
        this.body.setVelocityX(this.body.velocity.x + (this.accelDir))
      } else { // decelerates faster
        this.body.setVelocityX(this.body.velocity.x + (this.accelDir * 2))
      }
      this.body.setVelocityY(0)

    }
    


  }

}