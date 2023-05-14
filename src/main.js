/*
Ninja Run
By Steven Ren
25 Hours

When moving from menu to the actual game, I made the character throw a ninja star and split the menu screen in half like it
was split by the ninja star. But I ran into an issue where if you restarted from the same play scene, the menu scene would still get sliced
even though it didn't start from there. I first tried to delete it right after the tween was made but it registered as an error due
to a modified verion of it still being used. I then did some research and learned of the oncomplete and bind techniques where I could
call a command in create after the tween was finished so that it would remember my variables. So I ended up using that to delete the texture
so now when I restart from the play scene, it doesn't show the screen getting cut in half. I'm very proud of that discovery. For something
that I implemented that I think is interesting, read the bottom paragraph.

I added a resource into my endless runner: ninja stars. The player gets a limited number of ninja stars and has to decide between
using them offensively and seeking out the barrels to destroy, thus gaining points. Or using them defensively for when the barrels and nets
completely block the horizontal screen. It's testing the player's sense of risk vs reward. "How far is that barrel from me?" "How safe
is my current situation?" "How long until my next star?"
I like my visual style as well. It's a simple cartoon-y style which I think fits my game very well.
*/
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