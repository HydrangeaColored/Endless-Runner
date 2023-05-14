class Obstacles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, destructable) {
      super(scene, x, y, texture, frame, speed);
  
      // add object to existing scene
      this.parentScene = scene;
      this.parentScene.add.existing(this);
      this.isDestructable=destructable;
      this.moveSpeed=speed;
      this.parentScene.physics.add.existing(this);
      this.parentScene.add.existing(this);
      this.stalled=false;
    }

    update(){
        if(this.isDestructable==false&&this.stalled==false){
            this.y+=this.moveSpeed;
        }else if (this.stalled==false){
            if(this.y!=0){
                this.y+=this.moveSpeed;
            }
        }
        
        if(this.y>game.config.width){
           this.reset(); 
        }
    }
    reset(){
        if(this.isDestructable){
            this.alpha=0;
        }
        this.y=0;
        this.x=Math.floor(Math.random() * 700);
    }
    setSpeed(speed){
        this.moveSpeed=speed;
    }
}