class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.menuText = this.add.text(game.config.width / 2, game.config.height / 3, 'press ENTER to start').setOrigin(0.5)
        this.creditText = this.add.text(game.config.width / 2, game.config.height / 3+20, 'press DOWN for credits', {
            fontSize: '12px'
        }).setOrigin(0.5)

        this.tutorialText = this.add.text(game.config.width / 2, game.config.height / 3 * 2 - 100, 
            'arrow keys to move\n\nup to boost\nwhen full\n\nboost through rocks\nto keep momentum\n\ncollect fuel to\nlast longer\n\nescape the', {
            fontSize: '14px'
        }).setOrigin(0.5)
        this.voidText = this.add.text(game.config.width / 2, game.config.height / 3 * 2 - 100, 
            '\n\n\n\n\n\n\n\n\n\n\n       void', {
            fontSize: '14px',
            fill: '#ff0000'
        }).setOrigin(0.5)
    
        
    }




    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER)){
            this.scene.start('playScene')
        }
        if (this.cursors.down.isDown){
            this.scale.setGameSize(game.config.width + 600, this.scale.height)
            this.scene.start('creditsScene')
        }
        
      }
      



}