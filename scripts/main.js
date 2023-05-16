import Player from "./player.js";
import TextScreen from "./text-screen.js";
import { Entity } from "./util.js";
const WIDTH = 64, HEIGHT = 32;
const textCanvas = document.getElementById('game-screen');
textCanvas.style.width = WIDTH+'ch';
class Game{

    constructor(w, h)
    {
        this.width = w;
        this.height = h;
        this.fps = 60;
        this.screen = new TextScreen(w, h);
        this.player = new Player(0, 0, this);
    }
    update()
    {
        this.player.update();
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