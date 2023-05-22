import { Entity } from "./util.js";

class Enemy extends Entity{

    constructor(x, y, game)
    {
        super(x, y, '<->');
        this.game = game;
        this.speed = Math.random()*0.2+0.1;
    }
    update()
    {
        let state = this.game.getState(this.game.statesIndexes.NORMAL);
        this.y+=this.speed;
        //swiping off the lower side of the screen will be erased
        if(this.y>this.game.height)
        {
            this.markedForDeletion = true;
        }
        //this first condition is important for performance reasons
        if(this.distanceFrom(state.player)<5)
        {
            if(this.isColliding(state.player)&&!state.player.invincible)
            {
                state.player.takeDamage();
            }
        }
    }
}
export default Enemy;