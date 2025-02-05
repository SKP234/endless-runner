// Kyle Nguyen
// 
//
// sources:
// parry.mp3 https://pixabay.com/sound-effects/metallic-clang-90964/
// all other audio effects made in https://jfxr.frozenfractal.com/ 

let config = {
    type: Phaser.AUTO,
    width: 100,
    height: 200,
    scene: [ Load, Menu, Play ],
    scale: {
        autoCenter: Phaser.Scale.autoCenter
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
}


let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3