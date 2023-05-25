export class Layer{

    constructor(x, y, w, h, z, isVisible, name)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.chars = new Array(w*h);
        this.z = z;
        this.isVisible = isVisible
        this.name = name;
    }
    clear()
    {
        for(let y = 0;y<this.height;y++)
        {
            for(let x = 0;x<this.width;x++)
            {
                this.chars[x+y*this.width] = ' ';
            }
        }
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
export class Renderer{
    constructor(w, h, layers)
    {
        this.width = w;
        this.height = h;
        this.chars = new Array(this.width*this.height);
        this.chars.fill(' ');
        this.layers = layers;

    }
    //shows all the chars
    display(canvas = new HTMLElement())
    {
        this._clearChars();
        this._orderLayers();
        for(let i = 0;i<this.layers.length;i++)
        {
            if(this.layers[i].isVisible)
            this._drawLayer(this.layers[i]);
        }
        let str = '';
        for(let y = 0;y<this.height;y++)
        {
            for(let x = 0;x<this.width;x++)
            {
                str+=this.chars[x+y*this.width];
            }
            str+='\n';
        }
        canvas.textContent = str;
    }
    addLayer(layer)
    {
        for(let i = 0;i<this.layers.length;i++)
        {
            if(layer.name === this.layers[i].name)
            {
                return;
            }
        }
        this.layers.push(layer);
    }
    removeLayer(name)
    {
        for(let i = 0;i<this.layers.length;i++)
        {
            if(this.layers[i].name === name)
            {
                this.layers.splice(i, 1);
            }
        }
    }
    removeAllLayers()
    {
        this.layers = [];
    }
    _orderLayers()
    {
        this.layers.sort((a, b)=>a.z-b.z)
    }
    _drawLayer(layer)
    {
        for(let yy = 0;yy<layer.height;yy++)
        {
            for(let xx = 0;xx<layer.width;xx++)
            {
                let xp = xx+layer.x;
                let yp = yy+layer.y;
                if(xp<0||yp<0||xp>=this.width||yp>=this.height)
                    continue;
                if(layer.chars[xx+yy*layer.width]!==' ')
                    this.chars[xp+yp*this.width] = layer.chars[xx+yy*layer.width];
            }
        }
    }
    _clearChars()
    {
        for(let y = 0;y<this.height;y++)
        {
            for(let x = 0;x<this.width;x++)
            {
                this.chars[x+y*this.width] = ' ';
            }
        }
    }
}