import { Entity } from "./util.js";

class Player extends Entity{
    constructor(x, y, game)
    {
        super(x, y, ' 0 \n/|\\\n/ \\');
        this.game = game;
    }
    update(input)
    {
        if(input.isKeyActive('ArrowRight')||input.isSwipeActive('swipe right'))
        {
            this.x+=0.5;
        }
        if(input.isKeyActive('ArrowLeft')||input.isSwipeActive('swipe left'))
        {
            this.x-=0.5;
        }
        if(this.x<0)
        {
            this.x = 0;
        }
        if(this.x+3>this.game.width)
        {
            this.x = this.game.width-3;
        }
    }
}
export default Player;