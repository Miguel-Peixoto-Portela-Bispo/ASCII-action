import { Entity } from "./util.js";

class Score extends Entity{
    constructor(x, y, game)
    {
        super(x, y, '(+)');
        this.game = game;
        this.speed = Math.random()*0.4+0.1;
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
            if(this.isColliding(this.game.player))
            {
                this.markedForDeletion = true;
                this.game.player.score++;
                if(Math.random()<0.3)
                {
                    this.game.player.lifes++;
                }
            }
        }
    }
}
export default Score;