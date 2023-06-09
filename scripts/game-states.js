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
        this.canChange = false;
        this.title1 =  '     _    ____   ____ ___ ___ \n'+
        '    / \\  / ___| / ___|_ _|_ _|\n'+
        '   / _ \\ \\___ \\| |    | | | | \n'+
        '  / ___ \\ ___) | |___ | | | | \n'+
        ' /_/   \\_\\____/ \\____|___|___|';
        this.title2 = '             _   _             \n'+
                      '   __ _  ___| |_(_) ___  _ __  \n'+
                      '  / _` |/ __| __| |/ _ \\| \'_ \\ \n'+
                      ' | (_| | (__| |_| | (_) | | | |\n'+
                      '  \\__,_|\\___|\\__|_|\\___/|_| |_|\n'
        this.highScore = 0 || localStorage.getItem('high-score');
        this.options = ['play', 'tutorial'];
    }
    update()
    {
        let input = this.game.inputHandler;
        if(input.clicking&&this.canChange)
        {
            if(!this.inTutorial)
            {
                let x = this.game.getTouchPosition().x;
                let y = this.game.getTouchPosition().y;
                for(let i = 0;i<this.options.length;i++)
                {
                    let str = this.options[i];
                    if(x>=(this.game.width-str.length)/2&&x<=(this.game.width-str.length)/2+str.length+1)
                    {
                        if(y>=this.game.height/2-1+3+i*4&&y<this.game.height/2-1+3+i*4+3)
                        {
                            this.doAction(str);
                        }
                    }
                }
            }
            else
            {
                if(input.touchX>this.game.canvas.getBoundingClientRect().x&&input.touchX<this.game.canvas.getBoundingClientRect().x+this.game.canvas.getBoundingClientRect().width)
                {
                    if(input.touchY>this.game.canvas.getBoundingClientRect().y&&input.touchY<this.game.canvas.getBoundingClientRect().y+this.game.canvas.getBoundingClientRect().height)
                    {
                        this.inTutorial = false;
                    }
                }
            }
            this.canChange = false;
        }
        else if(!input.clicking)
        {
            this.canChange = true;
        }
    }
    render(layer)
    {
        if(!this.inTutorial)
        {
            layer.drawString(this.title1, (this.game.width-(this.title1.split('\n')[0].length))/2, 2);
            layer.drawString(this.title2, (this.game.width-(this.title2.split('\n')[0].length))/2, 3+this.title1.split('\n').length);
            for(let i = 0;i<this.options.length;i++)
            {
                let str = this.options[i];
                layer.fillRect('*', (this.game.width-str.length)/2-1, this.game.height/2-1+3+i*4, str.length+2, 3);
                layer.drawString(str, (this.game.width-str.length)/2, this.game.height/2+3+i*4);
            }
            let str = 'high-score: '+this.highScore;
            layer.drawString(str, (this.game.width-str.length)/2, this.game.height-1);
        }
        else
        {
            let str = 'goals:'+'\n'+
                      ' - take all the (+)'+'\n'+
                      ' - avoid all the <->'+'\n'+
                      '\n'+
                      'rules:'+'\n'+
                      ' - if the timer reaches 0 seconds, then is' + '\n'+
                      ' game over'+'\n'+
                      ' - if lifes reaches 0, then is game over';
            layer.drawString(str, 4, 4);
            let str2 = '<click to exit>';
            layer.drawString(str2, this.game.width-str2.length, this.game.height-1);
        }
    }
    doAction(str)
    {
        if(str === 'play')
        {
            this.game.resetState(this.game.statesIndexes.NORMAL);
            this.game.setState(this.game.statesIndexes.NORMAL);
        }
        else if(str === 'tutorial')
        {
            this.inTutorial = true;
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
        //deletes all the marked entities
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
            for(let i = 0;i<Math.floor(Math.random()*10)+1;i++)
            {
                x = Math.random()*(this.game.width-3);
                this.entities.push(new Enemy(x, -1, this.game));
            }
            x = Math.random()*(this.game.width-3);
            this.entities.push(new Score(x, -1, this.game));
        }
        else
        {
            this.timerToSpawn++;
        }
    }
    render(layer)
    {
        for(let e of this.entities)
        {
            e.render(layer);
        }
        this.ui.render(layer);
        let str = 'pause';
        layer.fillRect('*', this.game.width-str.length-2, 0, str.length+2, 3);
        layer.drawString(str, this.game.width-str.length-1, 1);
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
                if(x>=(this.game.width-str.length)/2&&x<=(this.game.width-str.length)/2+str.length+1)
                {
                    if(y>=this.game.height/2-1+3+i*4&&y<this.game.height/2-1+3+i*4+3)
                    {
                        this.doAction(str);
                    }
                }
            }
        }
    }
    render(layer)
    {
        let str = 'paused'
        layer.fillRect('.', (this.game.width-str.length)/2-1, this.game.height/2-2, str.length+2, 3);
        layer.drawString(str, (this.game.width-str.length)/2, this.game.height/2-1);
        for(let i = 0;i<this.options.length;i++)
        {
            let str = this.options[i];
            layer.fillRect('*', (this.game.width-str.length)/2-1, this.game.height/2-1+3+i*4, str.length+2, 3);
            layer.drawString(str, (this.game.width-str.length)/2, this.game.height/2+3+i*4);
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
        if(this.showIndex%this.game.fps/3 === 0)
        {
            this.canShow = !this.canShow;
        }
        let input = this.game.inputHandler;
        if(input.clicking&&this.canChange)
        {
            //this 2 conditions makes sure the touch was on the game screen
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
    render(layer)
    {
        layer.drawString(this.mainText1, (this.game.width-this.mainText1.split('\n')[0].length)/2, 2)
        layer.drawString(this.mainText2, (this.game.width-this.mainText2.split('\n')[0].length)/2, 3+this.mainText1.split('\n').length);
        if(this.canShow)
        {
            let str = '<click to enter main menu>';
            layer.drawString(str, (this.game.width-str.length)/2, 4+this.mainText1.split('\n').length+this.mainText2.split('\n').length)
        }
        let str = 'final score: '+this.game.getState(this.game.statesIndexes.NORMAL).player.score;
        layer.drawString(str,  (this.game.width-str.length)/2, this.game.height-1);
    }
}