import { Entity } from "./util.js";

class Player extends Entity{
    constructor(x, y, game)
    {
        super(x, y, ' 0 \n/|\\\n/ \\');
        this.game = game;
    }
    update()
    {
        
    }
}
export default Player;