class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('ninja', './assets/ninja.png');
        this.load.image('background', './assets/field.png');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
        fixedWidth: 0
        }
        this.add.sprite(0,0,"background").setOrigin(0,0);
        this.add.text(game.config.width/2,game.config.height/2, 'Ninja Run', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=14;
        this.add.text(game.config.width/2,game.config.height/2+10+28, 'By Steven Ren', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2+10+28+25, 'Press Enter for instructions', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2+10+28+50, 'Press Space to Play', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2+10+28+50+25, 'Press (R) for credits', menuConfig).setOrigin(0.5,0.5);
       
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.sprite(game.config.width/2,game.config.height-50,"ninja");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            let textureManager = this.textures;
            this.game.renderer.snapshot((snapshotImage) => {
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                textureManager.addImage('titlesnapshot', snapshotImage);
            });
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('instructionsScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('creditsScene'); 
        }
    }
}