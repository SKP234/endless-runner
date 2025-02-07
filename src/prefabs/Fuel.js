class Fuel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
      scene.add.existing(this)
      scene.physics.add.existing(this)
    }

  preload(){
  }

  create(){



  }

  update(playerSpeed, boost) {
    this.body.setVelocity(0, playerSpeed*1.5)
    if(this.y > game.config.height){
        this.destroy()
    }

  }

}