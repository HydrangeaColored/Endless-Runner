let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    scene: [ Menu, Instructions, Play, Credits],
    physics: {
        default:"arcade",
        arcade:{
            //debug:true
        }
    }
}
let game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;
// reserve keyboard vars
let keySPACE, keyENTER, keyLeft, keyRight, keyR, keyT;