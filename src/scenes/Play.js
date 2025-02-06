class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        
    this.load.spritesheet('rocket', './assets/rocket-normal.png', {
        frameWidth: 7,
        frameHeight: 15
    })
    }
    
    create() {
        this.playerSpeed = 5
        this.boostSpeed = this.playerSpeed * 2
        this.normalSpeed = this.playerSpeed
        this.voidSpeed = 0
        this.boostMax = 1
        this.boostPoints = 1

        // controls text fade away
        this.tutorialText = this.add.text(game.config.width / 2, game.config.height / 3 * 2, 
            'arrow keys to move\n\nup to boost\nwhen full bar\n\nescape the void', {
                fontSize: '14px'
            }).setOrigin(0.5)
        this.tweens.add({
            targets: this.tutorialText,
            alpha: 0,
            duration: 5000,
            ease: 'EaseOut',
        })

        //things
        this.player = new Player(this, game.config.width / 2, game.config.height , 'rocket')
        this.void = new Void(this, game.config.width / 2, game.config.height, 2000, 4000, 0x000000).setOrigin(0.5, 0)


        this.cursors = this.input.keyboard.createCursorKeys()
        
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
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rocket',{
                start: 3,
                end: 5
            })
        })

        
        
        // rocket goes into scene
        this.player.body.setVelocityY(-200)
        this.time.addEvent({
        delay: 40,
        callback: () => {
            if(this.player.body.velocity.y < 0){
                this.player.body.setVelocityY(this.player.body.velocity.y + 4)
            }
        },
        repeat: 50
        })
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.player.body.setDamping(true).setDrag(0.3)
                this.player.body.setCollideWorldBounds(true)
                rocketstart = true
                boost = false
                this.boostPoints = 0
            }
          })

          //text
          this.score = 0
          this.scoreText = this.add.text(game.config.width / 2, 20, this.score + 'm').setOrigin(0.5, 0)
          this.speedText = this.add.text(game.config.width - 20, 20, this.playerSpeed + " m/s").setOrigin(1, 0)
          this.voidspeedText = this.add.text(0,20, this.voidSpeed + " m/s", {
            fill: '#ff0000'
          }).setOrigin(0, 0)          
          this.voiddistanceText = this.add.text(0,  game.config.height - 16, this.void.y - (this.player.y + 18) + " m away", {
            fill: '#ff0000'
          }).setOrigin(0, 0)
          // score increase
          this.time.addEvent({
            delay: 1000 / this.playerSpeed,
            callback: () => {
                this.score += 1
            },
            loop: true
          })
          
          // boost bar
          this.boostBar = this.add.graphics()
        
                //this.scale.setGameSize(this.scale.width + 50, this.scale.height);
                //this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
          
        
                this.void.setDepth(200)
    }

    update() {
        
        if(this.scale.width < MAX_WIDTH){
            this.scale.setGameSize(this.scale.width + 10, this.scale.height);
            this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
        }
        //boost bar update
        this.boostBar.clear();
        this.boostBar.fillStyle(0xFFFFFF, 1);
        this.boostBar.fillRect(this.scale.width - 5, 0, 5, game.config.height * (this.boostPoints))

        //update text
        this.scoreText.text = this.score + 'm'
        this.speedText.text = Math.trunc(this.playerSpeed) + " m/s"
        this.voidspeedText.text = Math.trunc(this.voidSpeed) + " m/s"
        this.voiddistanceText.text = Math.trunc(this.void.y - (this.player.y + 18)) + " m away"
        //makes sure stuff stays centered
        this.scoreText.x = this.scale.width / 2
        this.voidspeedText.x = 0
        this.voiddistanceText.x = 0
        this.speedText.x = this.scale.width-10
        this.void.x = this.scale.width / 2

        // boost control and logic
        if (this.cursors.up.isDown && this.boostPoints >= this.boostMax) {
            this.boostPoints = this.boostMax
            boost = true
        }
        if (boost && this.boostPoints <= 0 && rocketstart) {
            boost = false
        }
        this.boostSpeed = this.normalSpeed * 2
        if(boost){
            this.boostPoints -= 0.01
            this.player.play('rocketboost', true)
            this.playerSpeed = this.boostSpeed
        } else {
            this.boostPoints += 0.001
            this.player.play('rocketnormal', true)
            this.playerSpeed = this.normalSpeed
        }


        // void/player collision
        //this.physics.add.collider(this.void, this.player, (void, player) =>)




        this.player.update(this.cursors, rocketstart)
        this.void.update(this.voidSpeed, this.playerSpeed)

    
    }


}