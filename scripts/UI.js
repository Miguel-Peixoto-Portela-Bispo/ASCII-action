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
        let seconds = Math.floor(state.player.timer/this.game.fps%60);
        let minutes = Math.floor(state.player.timer/this.game.fps/60);
        scr.drawString('timer: '+minutes+':'+(seconds<10?'0':'')+seconds, 0, 2);
    }
}
export default UI;