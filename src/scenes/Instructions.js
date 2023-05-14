class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }
    preload() {
        this.load.image('instBackground', './assets/green.png');
        this.load.image('ninja', './assets/ninja.png');
        this.load.image('nstar', './assets/star.png');
        this.load.image('net', './assets/net.png');
        this.load.image('barrel', './assets/barrel.png');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#000000',
            align: 'left',
        fixedWidth: 0
        }
        this.add.sprite(0,0,"instBackground").setOrigin(0,0);
        this.add.text(game.config.width/2,game.config.height/4, "Here's how to play the game", menuConfig).setOrigin(0.5,0.5);
        this.add.sprite(game.config.width/4,game.config.height/4+80,"ninja");
        this.add.sprite(game.config.width/4,game.config.height/4+80+100,"nstar");
        this.add.sprite(game.config.width/4,game.config.height/4+80+100+25+25+40,"net");
        this.add.sprite(game.config.width/4,game.config.height/4+80+100+25+25+50+40+65,"barrel");
        menuConfig.fontSize=14;
        this.add.text(game.config.width/2+100,game.config.height/4+80, 'Ninja = you. Try to avoid getting hit by anything.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+25, 'Use ← and → to move', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100-25, 'These are the ninja stars you can throw.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100, 'Ninja stars you throw can destroy barrels but not nets so be careful!', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25, 'You get a ninja star every 5 seconds.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25+25+25, 'These nets will stop your ninja dead in their tracks.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25+25+25+25, 'Colliding with one will result in a game over.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25+25+50+40+35, 'Barrels will occassionly rain down from the sky.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25+25+50+40+35+25, 'Getting hit by one means game over as well.', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100+25+25+50+40+35+25+25, 'You can destroy barrels with your ninja stars and get additional points.', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=28;
        this.add.text(game.config.width/2,game.config.height*9/10, "Press Enter to go back to menu", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
    }
}