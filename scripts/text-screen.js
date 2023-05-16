class TextScreen{
    constructor(w, h)
    {
        this.width = w;
        this.height = h;
        this.chars = new Array(this.width*this.height);
        this.chars.fill('.');
    }
    clear()
    {
        this.chars.fill('.');
    }
    showIn(canvas)
    {
        canvas.textContent = '';
        for(let y = 0;y<this.height;y++)
        {
            for(let x = 0;x<this.width;x++)
            {
                canvas.textContent+=this.chars[x+y*this.width];
            }
            canvas.textContent+='\n';
        }
    }
}
export default TextScreen;