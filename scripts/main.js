import Enemy from "./enemy.js";
import InputHandler from "./inputs.js";
import Player from "./player.js";
import TextScreen from "./text-screen.js";
import { Entity } from "./util.js";
const WIDTH = 48, HEIGHT = 24;
const textCanvas = document.getElementById('game-screen');
class Game{

    constructor(w, h)
    {
        this.width = w;
        this.height = h;
        this.fps = 30;
        this.screen = new TextScreen(w, h);
        this.inputHandler = new InputHandler();
        this.player = new Player(this);
        this.entities = [];
        this.entities.push(this.player);
        this.timerToSpawn = 0;
        this.maxTimeToSpawn = this.fps;
    }
    update()
    {
        this.entities = this.entities.filter(e=>!e.markedForDeletion);
        for(let e of this.entities)
        {
            e.update();
        }
        if(this.timerToSpawn>this.maxTimeToSpawn)
        {
            this.maxTimeToSpawn = Math.random()*this.fps;
            this.timerToSpawn = 0;
            let x = Math.random()*(this.width-3);
            this.entities.push(new Enemy(x, -1, this));
        }
        else
        {
            this.timerToSpawn++;
        }
    }
    render(canvas)
    {
        this.screen.clear();
        for(let e of this.entities)
        {
            e.render(this.screen);
        }
        this.screen.showIn(canvas);
    }
}
const game = new Game(WIDTH, HEIGHT);
function loop()
{
    game.update();
    game.render(textCanvas);
    setTimeout(loop, 1000/game.fps)
}
loop();

const fontSize = document.getElementById('font-size');
const mainContainer = document.getElementById('main-container');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const saveBtn = document.getElementById('save-btn');
const configBtn = document.getElementById('config-btn');
const config = document.getElementById('config');
saveBtn.onclick = ()=>{
    mainContainer.style.fontSize = fontSize.value+'px';
    document.documentElement.style.setProperty('--color1', color1.value);
    document.documentElement.style.setProperty('--color2', color2.value)
}
configBtn.onclick = ()=>{
    if(config.style.display === 'none')
    {
        config.style.display = 'block';
    }
    else
    {
        config.style.display = 'none';
    }
}