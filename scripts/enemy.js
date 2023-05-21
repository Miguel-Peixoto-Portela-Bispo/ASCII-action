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
        if(this.y>this.game.height)
        {
            this.markedForDeletion = true;
        }
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