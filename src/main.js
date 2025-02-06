// Name: Kyle Nguyen
// Game Title: Rocket Escape
// Approximate hours: 20, most of it spent thinking because i'm very disorganized
// Creative Tilt 1: did stuff with a dynamically changing game size
// Creative Tilt 1: visually I tried to dynamically change the html background color depending on how
// close the void was to you
//
// sources:
// clang.mp3 https://pixabay.com/sound-effects/metallic-clang-90964/
// all other audio effects made in https://jfxr.frozenfractal.com/ 
// all other visual assets made in https://www.pixilart.com/


// [yes] Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (1)
// [yes] Submit a playable link on GitHub pages (1)
// [yes] In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (1)

// [yes] Use multiple Scene classes (dictated by your game's style) (1)
// Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
// [yes] Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
// Have some form of player input/control appropriate to your game design (1)
// [yes] Include one or more animated characters that use a texture atlas/sprite sheet* (1)
// Simulate scrolling with a tileSprite (or equivalent means) (1)
// Implement proper collision detection (via Arcade Physics or a custom routine) (1)
// Have looping background music* (1)
// Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
// Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
// Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
// Be theoretically endless (1)
// Be playable for at least 15 seconds for a new player of low to moderate skill (1)
// Run without significant crashes or errors (1)
// Include in-game credits for all roles, assets, music, etc. (1)


// ...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (1)
// ...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (1)

let config = {
    type: Phaser.AUTO,
    width: 200,
    height: 800,
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

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let rocketstart = false
let boost = true;
let boostReady = true;
let MAX_WIDTH = 800
let MAX_HEIGHT = 900