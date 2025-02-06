class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
    }

    create() {
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.menuText = this.add.text(game.config.width / 2, game.config.height / 3, 'press ENTER').setOrigin(0.5)

        this.tutorialText = this.add.text(game.config.width / 2, game.config.height / 3 * 2, 
            'arrow keys to move\n\nup to boost\nwhen full bar\n\nescape the void', {
            fontSize: '14px'
        }).setOrigin(0.5)
    
    
        
    }




    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER)){
            this.scene.start('playScene')
        }
        
      }
      



}