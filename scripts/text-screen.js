class TextScreen{
    constructor(w, h)
    {
        this.width = w;
        this.height = h;
        this.chars = new Array(this.width*this.height);
        this.chars.fill(' ');
    }
    clear()
    {
        this.chars.fill(' ');
    }
    //shows all the chars
    showIn(canvas)
    {
        let str = '';
        for(let y = 0;y<this.height;y++)
        {
            for(let x = 0;x<this.width;x++)
            {
                str+=this.chars[x+y*this.width];
            }
            str+='\n';
        }
        canvas.innerText= str;
    }
    drawString(str, x, y)
    {
        let pieces = str.split('\n');
        for(let yy = 0;yy<pieces.length;yy++)
        {
            for(let xx =0;xx<pieces[yy].length;xx++)
            {
                let xp = Math.floor(xx+x);
                let yp = Math.floor(yy+y);
                if(xp<0||yp<0||xp>=this.width||yp>=this.height)
                    continue;
                if(pieces[yy].charAt(xx)!== ' ')
                    this.chars[xp+yp*this.width] = pieces[yy].charAt(xx);
            }
        }
    }
    fillRect(symbol, x, y, w, h)
    {
        for(let yy = 0;yy<h;yy++)
        {
            for(let xx = 0;xx<w;xx++)
            {
                let xp = xx+x;
                let yp = yy+y;
                if(xp<0||yp<0||xp>=this.width||yp>=this.height)
                    continue;
                this.chars[xp+yp*this.width] = symbol;
            }
        }
    }
}
export default TextScreen;