class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('ninja', './assets/ninja.png');
        this.load.image('nstar', './assets/star.png');
        this.load.image('net', './assets/net.png');
        this.load.image('field', './assets/field.png');
        this.load.image('barrel', './assets/barrel.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('BGM', ['./assets/BGM.mp3']);
        this.load.audio('shing', './assets/shing.mp3');
        this.load.audio('boom', './assets/boom.mp3');
        this.load.audio('gameOver', './assets/gameOver.mp3');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#ffffff',
            align: 'right',
        fixedWidth: 0
        }
        this.add.text(game.config.width/2,game.config.height/2, 'Mom get out of my room im playing minecraft', menuConfig).setOrigin(0.5,0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.field = this.add.tileSprite(0, 0, 700, 700, 'field').setOrigin(0, 0);
        this.ninja = this.physics.add.sprite(game.config.width/2,game.config.height-50, 'ninja').setOrigin(0.5);
        this.ninja.setCollideWorldBounds(true);
        this.ninja.destroyed = false;
        this.ninja.stars = 0;
        this.ninjaStarList = [];
        this.barrierList = [];
        this.totalScore=0;
        if (this.textures.exists('titlesnapshot')) {
            let titleSnapLeft = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
            titleSnapLeft.setCrop(0,0,350,700);
            this.tweens.add({
                targets: titleSnapLeft,
                duration: 4500,
                alpha: { from: 1, to: 0 },
                scale: { from: 1, to: 0 },
                repeat: 0,
                x: { from: centerX, to: 0 }
            });
            let titleSnapRight = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
            titleSnapRight.setCrop(350,0,350,700);
            this.tweens.add({
                targets: titleSnapRight,
                duration: 4500,
                alpha: { from: 1, to: 0 },
                scale: { from: 1, to: 0 },
                repeat: 0,
                x: { from: centerX, to: game.config.width },
                onComplete: this.onCompleteHandler.bind(this)
            });
        }
        this.net1 = new Obstacles(this, Math.floor(Math.random() * 700), 0, 'net', 0, 5, false).setOrigin(0, 0);
        this.net2 = new Obstacles(this, Math.floor(Math.random() * 700), 0, 'net', 0, 5, false).setOrigin(0, 0);
        this.net3 = new Obstacles(this, Math.floor(Math.random() * 700), 0, 'net', 0, 5, false).setOrigin(0, 0);
        this.barrel = new Obstacles(this, Math.floor(Math.random() * 700), 0, 'barrel', 0, 10, true).setOrigin(0, 0);
        this.barrelTwo = new Obstacles(this, Math.floor(Math.random() * 700), 0, 'barrel', 0, 10, true).setOrigin(0, 0);
        this.barrel.alpha=0;
        this.barrelTwo.alpha=0;
        this.barrelAvailable=true;
        this.barrelTwoAvailable=true;
        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        fixedWidth: 100
        };
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.totalTime=0;
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 1, callback: this.nStarTracker, callbackScope: this, loop: true });
        let nstarConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }
        };
        this.trackernStar = this.add.sprite(game.config.width-100,30,"nstar");
        this.trackerX = this.add.text(game.config.width-100+this.trackernStar.width,30, 'X', nstarConfig).setOrigin(0.5);
        this.nStarsLeft = this.add.text(game.config.width-100+this.trackernStar.width+this.trackerX.width,30, this.ninja.stars, nstarConfig).setOrigin(0.5);
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }
        };
        this.scoreTracker = this.add.text(game.config.width/2+this.trackernStar.width,30, this.totalScore, scoreConfig).setOrigin(0.5);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.ninjaStarList.push(new ninjaStar(this, this.ninja.x, this.ninja.y, 'nstar'));
        this.bgmusic = this.sound.add("BGM", { loop: true });
        this.bgmusic.play();
        this.backgroundTracker=0;
    }
    
    update() { 
        if(!this.ninja.destroyed){
            this.field.tilePositionY -= 4;
            this.field.tilePositionY -= this.backgroundTracker;
            if(keyLeft.isDown){
                this.ninja.x-=8;
            }
            if(keyRight.isDown){
                this.ninja.x+=8;
            }
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.throwStar();
            }
            for (var i = 0; i < this.ninjaStarList.length; i++) {
                this.ninjaStarList[i].update();
                this.barrelCheck(this.ninjaStarList[i],this.barrel);
                this.barrelCheck(this.ninjaStarList[i],this.barrelTwo);
            }
            this.net1.update();
            this.net2.update();
            this.net3.update();
            this.barrel.update();
            this.barrelTwo.update();
            this.physics.world.collide(this.ninja, this.net1, this.gotHit, null, this);
            this.physics.world.collide(this.ninja, this.net2, this.gotHit, null, this);
            this.physics.world.collide(this.ninja, this.net3, this.gotHit, null, this);
            this.physics.world.collide(this.ninja, this.barrel, this.gotHit, null, this);
            this.physics.world.collide(this.ninja, this.barrelTwo, this.gotHit, null, this);
        }
        if (this.ninja.destroyed && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.bgmusic.stop();
            this.scene.restart();

        }
        if (this.ninja.destroyed && Phaser.Input.Keyboard.JustDown(keyT)) {
            this.bgmusic.stop();
            this.scene.start("menuScene");
        }
    }
    throwStar(){
        if(this.ninja.stars>0){
            this.ninjaStarList.push(new ninjaStar(this, this.ninja.x, this.ninja.y, 'nstar'));
            this.ninja.stars--;
            this.sound.play('shing');
        }
    }
    gotHit(){
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+64, 'You survived for:    seconds and earned    points!', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2-55, game.config.height/2+64, this.totalTime, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2+155, game.config.height/2+64, this.totalScore, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64+25, 'Press (R) to Restart or (T) for Menu', this.gameOverConfig).setOrigin(0.5);
        this.ninja.destroyed = true;
        this.sound.play('gameOver');
    }
    updateTime (){
        if((this.totalTime%5==0)&&(!this.ninja.destroyed)&&(this.totalTime!=0)){
            this.net1.setSpeed(this.net1.moveSpeed+1);
            this.net2.setSpeed(this.net2.moveSpeed+1);
            this.net3.setSpeed(this.net3.moveSpeed+1);
            this.barrel.setSpeed(this.barrel.moveSpeed+1);
            this.barrelTwo.setSpeed(this.barrelTwo.moveSpeed+1);
            this.backgroundTracker++;
            this.ninja.stars++;
            this.barrelAvailable=true;
            this.barrelTwoAvailable=true;
        }
        this.totalTime++;
        if(!this.ninja.destroyed){
            this.barrelChance();
            this.totalScore+=3;
        }
    }

    onCompleteHandler(){
        this.textures.remove('titlesnapshot');
    }
    nStarTracker(){
        this.nStarsLeft.text=this.ninja.stars;
        this.scoreTracker.text=this.totalScore;
    }
    barrelChance(){
        if((Math.floor(Math.random() * 3)==0)){
            if((this.barrel.y==0)&&(this.barrelAvailable==true)){
                this.barrel.alpha=1;
                this.barrel.y=1;
                this.barrelAvailable=false;
            }
        }
        if((Math.floor(Math.random() * 3)==0)){
            if((this.barrelTwo.y==0)&&(this.barrelTwoAvailable==true)){
                this.barrelTwo.alpha=1;
                this.barrelTwo.y=1;
                this.barrelTwoAvailable=false;
            }
        }
    }
    barrelCheck(ninStar, thisBarrel){
        if((ninStar.y>=thisBarrel.y)&&(ninStar.y<=(thisBarrel.y+50))&&(ninStar.x>=thisBarrel.x-24)&&(ninStar.x<=(thisBarrel.x+50))&&(thisBarrel.alpha==1)){
            ninStar.destroy();
            thisBarrel.stalled=true;
            this.totalScore+=5;
            let boom = this.add.sprite(thisBarrel.x, thisBarrel.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
            this.sound.play('boom');
            boom.on('animationcomplete', () => {    // callback after anim completes
                thisBarrel.reset();
                thisBarrel.stalled=false;                
                boom.destroy();                       // remove explosion sprite
            });
        }
    }
}