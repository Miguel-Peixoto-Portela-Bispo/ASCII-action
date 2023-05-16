import TextScreen from "./text-screen.js";

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
    }
    update()
    {

    }
    render(canvas = textCanvas)
    {
        this.screen.clear();
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