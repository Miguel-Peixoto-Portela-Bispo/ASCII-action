class UI{
    constructor(game)
    {
        this.game = game;
    }
    render(scr)
    {
        let state = this.game.getState(this.game.statesIndexes.NORMAL);
        scr.drawString('score: '+state.player.score, 0, 0);
        scr.drawString('lifes: '+state.player.lifes, 0, 1);
    }
}
export default UI;