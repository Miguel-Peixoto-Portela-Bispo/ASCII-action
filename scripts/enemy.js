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
        this.y+=this.speed;
        if(this.y>this.game.height)
        {
            this.markedForDeletion = true;
        }
        if(this.distanceFrom(this.game.player)<5)
        {
            if(this.isColliding(this.game.player)&&!this.game.player.invincible)
            {
                this.game.player.takeDamage();
            }
        }
    }
}
export default Enemy;