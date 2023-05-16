export class Entity{

    constructor(x, y, text = '')
    {
        this.x = x;
        this.y = y;
        this.text = text;
    }
    update(){}
    render(scr)
    {
        scr.drawString(this.text, Math.floor(this.x), Math.floor(this.y));
    }
    isColliding(e)
    {
        let positions = []
        let pieces = e.text.split('\n');
        for(let y = 0;y<pieces.length;y++)
        {
            for(let x = 0;x<pieces[y].length;x++)
            {
                if(pieces[y].charAt(x)&&pieces[y].charAt(x)!==' ')
                {
                    positions.push({x: e.x+x, y: e.y+y});
                }
            }
        }
        let pieces2 = this.text.split('\n');
        let positions2 = [];
        for(let y = 0;y<pieces2.length;y++)
        {
            for(let x = 0;x<pieces2[y].length;x++)
            {
                if(pieces2[y].charAt(x)&&pieces2[y].charAt(x)!==' ')
                {
                    positions2.push({x: this.x+x, y: this.y+y});
                }
            }
        }
        for(let i = 0;i<positions.length;i++)
        {
            for(let j = 0;j<positions2.length;j++)
            {
                if(positions[i].x === positions2[j].x&&positions[i].y === positions2[j].y)
                {
                    return true;
                }
                else if(i>=positions.length-1&&j>=positions2.length-1)
                {
                    return false;
                }
            }
        }
    }
}