class Rock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
      this.xVelocity = Phaser.Math.Between(-10,10)
      scene.add.existing(this)
      scene.physics.add.existing(this)
    }

  preload(){
  }

  create(){



  }

  update(playerSpeed, boost) {
    this.body.setVelocity(this.xVelocity, playerSpeed * 2)
    if(this.y > game.config.height){
        this.destroy()
    }

  }

}