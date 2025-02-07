class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }
    preload(){
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.returnText = this.add.text(this.scale.width / 2, game.config.height / 3, 'press UP').setOrigin(0.5)

        this.creditsText = this.add.text(this.scale.width / 2, game.config.height / 3 * 2 - 100, 
            "\nhttps://pixabay.com/sound-effects/metallic-clang-90964/\nall other audio effects made in jfxr.frozenfractal.com\nall other visual assets made in www.pixilart.com\nhttps://pixabay.com/sound-effects/woosh-104586/\nhttps://pixabay.com/sound-effects/large-rocket-engine-86240/", {
            fontSize: '20px'
        }).setOrigin(0.5)
    
        
    }




    update() {
        if (this.cursors.up.isDown){
            this.scale.setGameSize(game.config.width, this.scale.height)
            this.scene.start('menuScene')
        }
        
      }
      



}