class Load extends Phaser.Scene {

    constructor() {
        super("loadScene")
    }

    preload() {
        this.loadingText = this.add.text(game.config.width / 2, game.config.height / 3, 'loading.').setOrigin(0.5)

        this.time.addEvent({
          delay: 500,
          callback: () => {
            if(this.loadingText.text == 'loading...'){
                this.loadingText.text = 'loading.'
            } else{
                this.loadingText.text += '.'
            }
            //this.scale.setGameSize(this.scale.width + 50, this.scale.height + 50);
            
          },
          loop: true
        })

        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5)
        })   
        this.load.on('complete', () => {
            loadingBar.destroy();
            this.scene.start('menuScene')
        })
        
        this.load.image('moon', './assets/moon.png')
        this.load.image('star', './assets/star.png')
        this.load.image('fuel', './assets/fuel.png')
            
        this.load.audio('sfx-explode', './assets/explode.wav')
        this.load.audio('sfx-rockhit', './assets/clang.wav')
        this.load.audio('sfx-fuel', './assets/fuel.wav')
        this.load.audio('sfx-boost', './assets/boost.wav')
        this.load.audio('bgm', './assets/bgm.mp3')
        this.load.audio('static', './assets/static.mp3')
        
    }

    create(){

    }

}