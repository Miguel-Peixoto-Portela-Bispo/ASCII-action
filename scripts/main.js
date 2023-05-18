import InputHandler from "./inputs.js";
import Player from "./player.js";
import TextScreen from "./text-screen.js";
import { Entity } from "./util.js";
const WIDTH = 48, HEIGHT = 24;
const textCanvas = document.getElementById('game-screen');
// textCanvas.style.width = WIDTH+'ch';
class Game{

    constructor(w, h)
    {
        this.width = w;
        this.height = h;
        this.fps = 60;
        this.screen = new TextScreen(w, h);
        this.inputHandler = new InputHandler();
        this.player = new Player(0, h-3, this);
    }
    update()
    {
        this.player.update(this.inputHandler);
    }
    render(canvas)
    {
        this.screen.clear();
        this.player.render(this.screen);
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