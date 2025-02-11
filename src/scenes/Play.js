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
        this.rocketstart = false
        this.boost = true
        this.gameover = false
        this.endscreen = false


        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.fuelCollected = 0
        this.fuelSpawned = 0
        this.playerSpeed = 40
        this.boostSpeed = this.playerSpeed * 3
        this.normalSpeed = this.playerSpeed
        this.baseSpeed = this.playerSpeed
        this.basevoidSpeed = 30
        this.voidSpeed = this.basevoidSpeed
        this.boostMax = 1
        this.boostPoints = 1
        this.alpha = 0.7
        this.boostsound = this.sound.add('sfx-boost')
        this.bgm = this.sound.add('bgm', {loop: true})
        this.bgm.setVolume(0.15)
        this.bgm.play()
        this.static = this.sound.add('static')
        this.static.setVolume(0.2)
        // controls text fade away
        this.tutorialText = this.add.text(game.config.width / 2, game.config.height / 3 * 2-100, 
            'arrow keys to move\n\nup to boost\nwhen full\n\nboost through rocks\nto keep momentum\n\ncollect fuel to\nlast longer\n\nescape the', {
                fontSize: '14px'
            }).setOrigin(0.5)
        this.voidText = this.add.text(game.config.width / 2, game.config.height / 3 * 2-100, 
            '\n\n\n\n\n\n\n\n\n\n\n       void', {
            fontSize: '14px',
            fill: '#ff0000'
        }).setOrigin(0.5)
        this.tweens.add({
            targets: [this.tutorialText, this.voidText],
            alpha: 0,
            duration: 5000,
            ease: 'EaseOut',
        })

        //things
        this.player = new Player(this, game.config.width / 2, game.config.height , 'rocket')
        this.void = new Void(this, game.config.width / 2, game.config.height + 100, 2000, 4000, 0x000000).setOrigin(0.5, 0)
        //this.star = new Star(this, 'star')


        this.cursors = this.input.keyboard.createCursorKeys()
        
        this.cameras.main.setBackgroundColor("#000000")
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
            delay: 5000,
            callback: () => {
                this.player.body.setDamping(true).setDrag(0.3)
                this.player.body.setCollideWorldBounds(true)
                this.rocketstart = true
                this.boost = false
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
          this.endText = this.add.text(game.config.width / 2, game.config.height / 2, '', {
            fontSize: '20px'
          }).setOrigin(0.5, 0)
          this.endText.setAlpha(1)
          this.endText.setDepth(201)


          // score increase
          this.time.addEvent({
            delay: 1000 / this.playerSpeed,
            callback: () => {
                if(!this.gameover){
                    this.score += 1
                }
            },
            loop: true
          })
          
          // boost bar
          this.boostBar = this.add.graphics()
        
          
          //makes sure player and void is on top of everything else
          this.player.setDepth(199)
          this.void.setDepth(200)

          //spawn stars in background
            this.stars = this.add.group()
            this.starSpawner = this.time.addEvent({
            delay: (10000 / this.playerSpeed)*(game.config.width / this.scale.width),
            callback: () => {
                starSpawn = new Star(this, Phaser.Math.Between(0, this.scale.width), 0, 'star')
                this.stars.add(starSpawn)
            },
            loop: true
          })

          //rock spawner
          this.rocks = this.add.group()
          this.rockSpawner = this.time.addEvent({
          delay: (5000)*(game.config.width / this.scale.width),
          callback: () => {
            if(!this.gameover){
              rockSpawn = new Rock(this, Phaser.Math.Between(0, this.scale.width), -70, 'moon').setOrigin(0.5,0)
              this.rocks.add(rockSpawn)
            }
          },
          loop: true
        })

        //fuel spawner
        this.fuels = this.add.group()
        this.fuelSpawner = this.time.addEvent({
        delay: (5000)*(game.config.width / this.scale.width),
        callback: () => {
            
            if(!this.gameover){
            fuelSpawn = new Fuel(this, Phaser.Math.Between(0, this.scale.width), 0, 'fuel').setOrigin(0.5,0)
            this.fuels.add(fuelSpawn)
            this.fuelSpawned += 1
            }
        },
        loop: true
      })


    }

    update() {

        //fuel updates
        this.normalSpeed = this.baseSpeed + (this.fuelCollected * 10)
        if(!this.gameover){
            this.voidSpeed = this.basevoidSpeed +(this.fuelSpawned * 8)
        }
        //boost bar update
        this.boostBar.clear()
        this.boostBar.fillStyle(0xFFFFFF, 1)
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
        this.speedText.x = this.scale.width-6
        this.void.x = this.scale.width / 2

        // boost control and logic
        if (this.cursors.up.isDown && this.boostPoints >= this.boostMax) {
            this.boostPoints = this.boostMax
            this.boost = true
        }
        if (this.boost && this.boostPoints <= 0 && this.rocketstart) {
            this.boost = false
        }
        this.boostSpeed = this.normalSpeed * 1.5
        if(this.boost){
            this.boostPoints -= 0.005
            if(!this.boostsound.isPlaying){
                this.boostsound.play()
            }
            this.player.play('rocketboost', true)
            this.playerSpeed = this.boostSpeed
        } else {
            this.boostPoints += 0.001
            this.boostsound.pause()
            this.player.play('rocketnormal', true)
            this.playerSpeed = this.normalSpeed
        }


        // void/player overlap
        this.physics.add.overlap(this.void, this.player, () =>{
            this.rocketstart = false
            this.gameover = true
        })
        if(!this.gameover){
            
            // rock/player collision
            this.physics.add.collider(this.rocks, this.player, (rock, player) =>{
                if(!this.boost && this.normalSpeed > 0){
                    this.baseSpeed -= 10
                }
                this.sound.play('sfx-rockhit')
                rock.destroy()
            })
            // fuel/player collision
            this.physics.add.overlap(this.fuels, this.player, (fuel, player) =>{
                this.fuelCollected += 1
                this.boostPoints += 0.5
                this.sound.play('sfx-fuel')
                fuel.destroy()
                if(this.scale.width < MAX_WIDTH){
                    this.scale.setGameSize(this.scale.width + 30, this.scale.height)
                    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
                }
            })
        }

        //game over sequence
        if(this.gameover){
            this.voidSpeed += 0.7
            this.alpha += alphaChange
            document.body.style.backgroundColor = `rgba(0, 0, 0, ${this.alpha})`
        }
        if(this.gameover && this.endscreen && (Phaser.Input.Keyboard.JustDown(this.keyENTER))){
            this.scene.start('menuScene')
            document.body.style.backgroundColor = `rgba(0, 0, 0, 0.7)`
            this.scale.setGameSize(game.config.width, game.config.height)
            this.physics.world.setBounds(0, 0, game.config.width, game.config.height)
        }
        if(this.gameover && !this.endscreen){
            this.endScreen = this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.sound.play('sfx-explode')
                    this.bgm.stop()
                    this.static.play()
                },
              })
            this.endScreen = this.time.addEvent({
                delay: 4000,
                callback: () => {
                    this.scale.setGameSize(MAX_WIDTH, this.scale.height)
                    this.physics.world.setBounds(0, 0, MAX_WIDTH, this.scale.height)
                    this.endText.x = MAX_WIDTH / 2 
                    this.endText.y = this.scale.height / 2  
                    this.endText.text = `distance: ${this.score}m\nhighest speed: ${this.playerSpeed}m/s\nfuel collected: ${this.fuelCollected}`
                    this.endText.setAlpha(1)
                },
              })
              this.endScreen = this.time.addEvent({
                  delay: 5000,
                  callback: () => {
                      this.returnText = this.add.text(MAX_WIDTH / 2, this.scale.height / 2 + 100,`ENTER to return to menu`,{
                            fontSize: '20px'
                        }).setOrigin(0.5)
                        this.returnText.setDepth(202)
                        
                        this.static.stop()
                  },
                })
                this.endscreen = true
        }

            
            
        console.log(this.rockSpawner.delay)


        // update() for all prefabs
        this.player.update(this.cursors, this.rocketstart, this.boost)
        this.void.update(this.voidSpeed, this.playerSpeed)
        this.starSpawner.delay = (5000 / this.playerSpeed)*(game.config.width / this.scale.width)
        for(let i = 0; i < this.stars.getChildren().length; i++){
            this.stars.getChildren()[i].update(this.playerSpeed, this.boost)
        }
        if(this.rockSpawner.delay > minRockTime){
            this.rockSpawner.delay = (5000)*(game.config.width / this.scale.width) - (this.score / 5)
        }
        for(let i = 0; i < this.rocks.getChildren().length; i++){
            this.rocks.getChildren()[i].update(this.playerSpeed, this.boost)
        }
        
        if(this.fuelSpawner.delay > minFuelTime){
            this.fuelSpawner.delay = (5000)*(game.config.width / this.scale.width) - (this.score / 3)

        }
        for(let i = 0; i < this.fuels.getChildren().length; i++){
            this.fuels.getChildren()[i].update(this.playerSpeed, this.boost)
        }

    
    }


}
