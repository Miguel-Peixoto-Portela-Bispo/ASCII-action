class InputHandler{

    constructor()
    {
        this.activeKeys = [];
        this.swipes = [];
        this.treshHold = 80;
        document.addEventListener('keydown', (e)=>{
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
            if(this.activeKeys.indexOf(e.code)===-1)
            {
                this.activeKeys.push(e.code);
            }
        });
        document.addEventListener('keyup', (e)=>{
            this.activeKeys.splice(this.activeKeys.indexOf(e.code), 1);
        });
        document.addEventListener('touchstart', (e)=>{
            this.touchX = e.changedTouches[0].clientX;
            this.touchY = e.changedTouches[0].clientY;
            this.clicking= true;
        });
        document.addEventListener('touchmove', (e)=>{
            let swipeDistanceX = this.touchX-e.changedTouches[0].clientX;
            if(swipeDistanceX>this.treshHold&&this.swipes.indexOf('swipe left') === -1)
            {
                this.swipes.push('swipe left');
            }
            else if(swipeDistanceX<-this.treshHold&&this.swipes.indexOf('swipe right') === -1)
            {
                this.swipes.push('swipe right');
            }
            let swipeDistanceY = this.touchY-e.changedTouches[0].clientY;
            if(swipeDistanceY>this.treshHold&&this.swipes.indexOf('swipe up') === -1)
            {
                this.swipes.push('swipe up');
            }
            else if(swipeDistanceY<-this.treshHold&&this.swipes.indexOf('swipe down') === -1)
            {
                this.swipes.push('swipe down');
            }
        });
        document.addEventListener('touchend', (e)=>{
            this.swipes = [];
            this.clicking = false;
        });
        document.addEventListener('mousedown', (e)=>{
            this.touchX = e.clientX;
            this.touchY = e.clientY;
            this.clicking = true;
        });
        document.addEventListener('mouseup', (e)=>{
            this.clicking = false;
        });
    }
    isKeyActive(key)
    {
        return this.activeKeys.indexOf(key)!==-1;
    }
    isSwipeActive(swipe)
    {
        return this.swipes.indexOf(swipe)!==-1;
    }
    keyIsPressed()
    {
        return this.activeKeys.length>0;
    }
}
export default InputHandler;