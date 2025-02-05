class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
    let startSpeed = 5
    let MAX_WIDTH = 1600
    let MAX_HEIGHT = 900
        
    this.load.spritesheet('rocket', './assets/rocket-normal.png', {
        frameWidth: 7,
        frameHeight: 15
    })
    }
    
    create() {
        this.cameras.main.setBackgroundColor("#328da8")
        this.anims.create({
            key: 'rocketnormal',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket',{
                start: 0,
                end: 2
            })
        })
        this.anims.create({
            key: 'rocketboost',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket',{
                start: 3,
                end: 5
            })
        })

        this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'rocket')
        this.player.setScale(4)
        this.player.body.setSize(7, 12).setOffset(0, 0)

        //this.rectangle = this.add.rectangle(game.config.width / 2, game.config.height / 2, 50, 50, 0x000000)



    }

    update() {
        this.player.play('rocketnormal', true)
    }


}