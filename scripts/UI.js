class UI{
    constructor(game)
    {
        this.game = game;
    }
    render(scr)
    {
        scr.drawString('score: '+this.game.player.score, 0, 0);
        scr.drawString('lifes: '+this.game.player.lifes, 0, 1);
    }
}
export default UI;