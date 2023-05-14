class ninjaStar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed=10;
      ///////////////////////////////////////////////////////////////////////////////////////////////////////add sfx if time
    }
    update(){
        this.y-=this.moveSpeed;
        if(this.y<0){
            this.destroy();
            //this.setActive(false).setVisible(false);
        }
    }
}