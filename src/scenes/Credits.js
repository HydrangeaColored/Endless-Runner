class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload() {
        this.load.image('instBackground', './assets/green.png');
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
        this.add.text(game.config.width/2,game.config.height/4, "BGM by IBERIAN", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/4+50, "Ninja Star throwing sfx by Pixabay (edited by me)", menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize='20px';
        this.add.text(game.config.width/2,game.config.height/4+50+50, "Explosion sfx by PremswaroopKasukurthi (edited by me)", menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize='28px';
        this.add.text(game.config.width/2,game.config.height/4+50+50+50, "Game Over sfx by Pixabay", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/4+50+50+50+50, "All art by me", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/4+50+50+50+50+50, "Programmed by me", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height*9/10, "Press Enter to go back to menu", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
    }
}