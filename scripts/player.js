import { Entity } from "./util.js";

class Player extends Entity{
    constructor(game)
    {
        super(0, game.height-3, ' 0 \n/|\\\n/ \\');
        this.game = game;
        this.lifes= 3;
        this.invincibleTimer = 0;
        this.score = 0;
        this.canShow = true;
        this.timer = game.fps*30;
    }
    update()
    {
        this.timer--;
        if(this.game.inputHandler.isKeyActive('ArrowRight')||this.game.inputHandler.isSwipeActive('swipe right'))
        {
            this.x+=0.5;
        }
        if(this.game.inputHandler.isKeyActive('ArrowLeft')||this.game.inputHandler.isSwipeActive('swipe left'))
        {
            this.x-=0.5;
        }
        //makes sure the player can't pass out on the left side of the screen
        if(this.x<0)
        {
            this.x = 0;
        }
        //makes sure the player can't pass out on the right side or the screen
        if(this.x+3>this.game.width)
        {
            this.x = this.game.width-3;
        }
        //if the player is invincible he will blink
        if(this.invincible)
        {
            this.invincibleTimer++;
            if(this.invincibleTimer%2 === 0)
            {
                this.canShow = !this.canShow;
            }
            if(this.invincibleTimer>this.game.fps*2)
            {
                this.invincibleTimer = 0;
                this.invincible = false;
                this.canShow = true;
            }
        }
        //if the life is equal or less than 0 is game over
        if(this.lifes <= 0||this.timer<=0)
        {
            this.game.resetState(this.game.statesIndexes.OVER);
            this.game.setState(this.game.statesIndexes.OVER);
        }
        let menu = this.game.getState(this.game.statesIndexes.MENU);
        if(this.score>Number(menu.highScore))
        {
            menu.highScore = this.score;
            localStorage.setItem('high-score', this.score);
        }
    }
    takeDamage()
    {
        this.lifes--;
        this.invincible = true;
    }
    render(scr)
    {
        if(this.canShow)
        {
            super.render(scr);
        }
    }
}
export default Player;