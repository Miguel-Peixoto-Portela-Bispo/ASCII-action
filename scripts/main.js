import { MenuGameState, NormalGameState, OverGameState, PauseGameState } from "./game-states.js";
import InputHandler from "./inputs.js";
import TextScreen from "./text-screen.js";
const WIDTH = 48, HEIGHT = 24;
const textCanvas = document.getElementById('game-screen');
class Game{

    constructor(w, h, canvas)
    {
        this.width = w;
        this.height = h;
        this.canvas = canvas;
        this.fps = 24;
        this.screen = new TextScreen(w, h);
        this.inputHandler = new InputHandler();
        this.statesIndexes = {MENU: 0, NORMAL: 1, PAUSE: 2, OVER: 3};
        this.states = [new MenuGameState(this), new NormalGameState(this), new PauseGameState(this), new OverGameState(this)];
        this.curState = this.states[this.statesIndexes.MENU];
    }
    update()
    {
        this.curState.update();
    }
    render()
    {
        this.screen.clear();
        this.curState.render(this.screen);
        this.screen.showIn(this.canvas);
    }
    setState(index)
    {
        this.curState = this.states[index];
    }
    getState(index)
    {
        return this.states[index];
    }
    resetState(index)
    {
        let state = null;
        if(index === this.statesIndexes.MENU)
        {
            state = new MenuGameState(this);
        }
        else if(index === this.statesIndexes.NORMAL)
        {
            state = new NormalGameState(this);
        }
        else if(index === this.statesIndexes.PAUSE)
        {
            state = new PauseGameState(this);
        }
        else if(index === this.statesIndexes.OVER)
        {
            state = new OverGameState(this);
        }
        this.states[index] = state;
    }
    getTouchPosition()
    {
        let fontSize = window.getComputedStyle(this.canvas).getPropertyValue('font-size');
        let div = document.createElement('div');
        div.style.width = 'min-content';
        div.style.fontFamily = '\'Courier New\', Courier, monospace';
        div.style.fontSize = fontSize;
        div.style.backgroundColor = 'blue';
        div.innerText = '.';
        document.body.appendChild(div);
        let scaleX = div.getBoundingClientRect().width;
        let x = Math.floor((this.inputHandler.touchX-this.canvas.getBoundingClientRect().x)/scaleX);
        let scaleY = div.getBoundingClientRect().height;
        let y = Math.floor((this.inputHandler.touchY-this.canvas.getBoundingClientRect().y)/scaleY);
        div.remove();
        return {x: x, y: y};
    }
}
const game = new Game(WIDTH, HEIGHT, textCanvas);
function loop()
{
    game.update();
    game.render(textCanvas);
    setTimeout(loop, 1000/game.fps)
}
loop();

const fontSize = document.getElementById('font-size');
const gameScreen = document.getElementById('game-screen');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const setBtn = document.getElementById('set-btn');
const configBtn = document.getElementById('config-btn');
const config = document.getElementById('config');
setBtn.onclick = ()=>{
    gameScreen.style.fontSize = fontSize.value+'px';
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