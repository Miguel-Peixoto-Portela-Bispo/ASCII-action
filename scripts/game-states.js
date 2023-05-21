import Player from "./player.js";
import Score from "./score.js";
import UI from "./UI.js";
import Enemy from "./enemy.js";

class GameState{
    constructor(game)
    {
        this.game = game;
    }
    update(){}
    render(scr){}
}
export class MenuGameState extends GameState{
    constructor(game)
    {
        super(game);
        this.showIndex = 0;
        this.canShow = true;
        this.canChange = false;
        this.title =  '     _    ____   ____ ___ ___ \n'+
        '    / \\  / ___| / ___|_ _|_ _|\n'+
        '   / _ \\ \\___ \\| |    | | | | \n'+
        '  / ___ \\ ___) | |___ | | | | \n'+
        ' /_/   \\_\\____/ \\____|___|___|';
    }
    update()
    {
        this.showIndex++;
        if(this.showIndex%8 === 0)
        {
            this.canShow = !this.canShow;
        }
        let input = this.game.inputHandler;
        if(input.clicking&&this.canChange)
        {
            if(input.touchX>this.game.canvas.getBoundingClientRect().x&&input.touchX<this.game.canvas.getBoundingClientRect().x+this.game.canvas.getBoundingClientRect().width)
            {
                if(input.touchY>this.game.canvas.getBoundingClientRect().y&&input.touchY<this.game.canvas.getBoundingClientRect().y+this.game.canvas.getBoundingClientRect().height)
                {
                    this.game.resetState(this.game.statesIndexes.NORMAL);
                    this.game.setState(this.game.statesIndexes.NORMAL);
                }
            }
        }
        else if(!input.clicking)
        {
            this.canChange = true;
        }
    }
    render(scr)
    {
        if(this.title)
        {
            scr.drawString(this.title, (this.game.width-(this.title.split('\n')[0].length))/2, 2);
        }
        if(this.canShow)
        {
            let str = '<click to start>';
            scr.drawString(str, (this.game.width-str.length)/2, 12);
        }
    }
}
export class NormalGameState extends GameState{
    constructor(game)
    {
        super(game);
        this.player = new Player(game);
        this.ui = new UI(game);
        this.entities = [];
        this.entities.push(this.player);
        this.entities.push(new Score(0, this.player.y-3, this.game))
        this.timerToSpawn = 0;
        this.maxTimeToSpawn = this.game.fps;
    }
    update()
    {
        let input = this.game.inputHandler;
        if(input.clicking)
        {
            let x = this.game.getTouchPosition().x;
            let y = this.game.getTouchPosition().y;
            if(x>=this.game.width-7&&x<this.game.width)
            {
                if(y>=0&&y<3)
                {
                    this.game.resetState(this.game.statesIndexes.PAUSE);
                    this.game.setState(this.game.statesIndexes.PAUSE);
                }
            }
        }
        this.entities = this.entities.filter(e=>!e.markedForDeletion);
        for(let e of this.entities)
        {
            e.update();
        }
        if(this.timerToSpawn>this.maxTimeToSpawn)
        {
            this.maxTimeToSpawn = Math.random()*this.game.fps*3;
            this.timerToSpawn = 0;
            let x = 0;
            for(let i = 0;i<Math.floor(Math.random()*3)+1;i++)
            {
                x = Math.random()*(this.game.width-3);
                this.entities.push(new Enemy(x, -1, this.game));
            }
            if(Math.random()<0.5)
            {
                x = Math.random()*(this.game.width-3);
                this.entities.push(new Score(x, -1, this.game));
            }
        }
        else
        {
            this.timerToSpawn++;
        }
    }
    render(scr)
    {
        for(let e of this.entities)
        {
            e.render(scr);
        }
        this.ui.render(scr);
        let str = 'pause';
        scr.fillRect('*', this.game.width-str.length-2, 0, str.length+2, 3);
        scr.drawString(str, this.game.width-str.length-1, 1);
    }
}
export class PauseGameState extends GameState{
    constructor(game)
    {
        super(game);
        this.options = ['resume', 'exit'];
    }
    update()
    {
        let input = this.game.inputHandler;
        if(input.clicking)
        {
            let x = this.game.getTouchPosition().x;
            let y = this.game.getTouchPosition().y;
            for(let i = 0;i<this.options.length;i++)
            {
                let str = this.options[i];
                if(x>=(this.game.width-str.length)/2&&x<=(this.game.width-str.length)/2+str.length)
                {
                    if(y>this.game.height/2-1+3+i*4&&y<this.game.height/2-1+3+i*4+3)
                    {
                        this.doAction(str);
                    }
                }
            }
        }
    }
    render(scr)
    {
        let str = 'paused'
        scr.fillRect('.', (this.game.width-str.length)/2-1, this.game.height/2-2, str.length+2, 3);
        scr.drawString(str, (this.game.width-str.length)/2, this.game.height/2-1);
        for(let i = 0;i<this.options.length;i++)
        {
            let str = this.options[i];
            scr.fillRect('*', (this.game.width-str.length)/2-1, this.game.height/2-1+3+i*4, str.length+2, 3);
            scr.drawString(str, (this.game.width-str.length)/2, this.game.height/2+3+i*4);
        }
    }
    doAction(str)
    {
        if(str === 'resume')
        {
            this.game.setState(this.game.statesIndexes.NORMAL);
        }
        else if(str === 'exit')
        {
            this.game.resetState(this.game.statesIndexes.MENU);
            this.game.setState(this.game.statesIndexes.MENU);
        }
    }
}
export class OverGameState extends GameState{
    constructor(game)
    {
        super(game);
        this.canChange = false;
        this.mainText1 = '   ____                      \n'+
                         '  / ___| __ _ _ __ ___   ___ \n'+
                         ' | |  _ / _` | \'_ ` _ \\ / _ \\\n'+
                         ' | |_| | (_| | | | | | |  __/\n'+
                         '  \\____|\\__,_|_| |_| |_|\\___|';
        this.mainText2 = '   ___                 \n'+
                         '  / _ \\__   _____ _ __ \n'+
                         ' | | | \\ \\ / / _ \\ \'__|\n'+
                         ' | |_| |\\ V /  __/ |   \n'+
                         '  \\___/  \\_/ \\___|_|   \n';
        this.canShow = true;
        this.showIndex = 0;
    }
    update()
    {
        this.showIndex++;
        if(this.showIndex%8 === 0)
        {
            this.canShow = !this.canShow;
        }
        let input = this.game.inputHandler;
        if(input.clicking&&this.canChange)
        {
            if(input.touchX>this.game.canvas.getBoundingClientRect().x&&input.touchX<this.game.canvas.getBoundingClientRect().x+this.game.canvas.getBoundingClientRect().width)
            {
                if(input.touchY>this.game.canvas.getBoundingClientRect().y&&input.touchY<this.game.canvas.getBoundingClientRect().y+this.game.canvas.getBoundingClientRect().height)
                {
                    this.game.resetState(this.game.statesIndexes.MENU);
                    this.game.setState(this.game.statesIndexes.MENU);
                }
            }
        }
        else if(!input.clicking)
        {
            this.canChange = true;
        }
    }
    render(scr)
    {
        scr.drawString(this.mainText1, (this.game.width-this.mainText1.split('\n')[0].length)/2, 2)
        scr.drawString(this.mainText2, (this.game.width-this.mainText2.split('\n')[0].length)/2, 3+this.mainText1.split('\n').length);
        if(this.canShow)
        {
            let str = '<click to restart>';
            scr.drawString(str, (this.game.width-str.length)/2, 4+this.mainText1.split('\n').length+this.mainText2.split('\n').length)
        }
    }
}