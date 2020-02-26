class Button extends TextObject {
    constructor(text, canvas, ctx, x, y, width, height, primTextColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize) {
        super(
            text,
            canvas, 
            ctx,
            x,
            y,
            primTextColor, 
            bgColor, 
            primFont, 
            primFontSize, 
            lineSpacing, 
            secFont, 
            secFontSize);

        this.width = width;
        this.height = height;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.action = function(){ return null; };
        this.hoverSet = false;
        this.hoverTextColor = "#000000";
        this.hoverBgColor = "#FFFFFF";

        this.colorChangeTicks = 0;

        this.mouseIsOver = false;

        this.hoverSound = null;
        this.playOnce = false;
    }

    update(clicks, allowSound) {
        if(this.inArea(clicks.x, clicks.y)){
            this.mouseIsOver = true;
            if(clicks.recentClick && clicks.isClicking){
                this.action();
            }
            if(this.playOnce && allowSound){
                this.playOnce = false;
                this.hoverSound.cloneNode().play();
            }
        } else {
            this.mouseIsOver = false;
            this.playOnce = true;
        }

    }

    render(mousePosX, mousePosY) {
        // the rectangle
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();

        // the outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#666666';
        this.ctx.stroke();

        let textColor = this.primTextColor;
        this.ctx.fillStyle = this.bgColor;

        if(this.hoverSet){
            if(this.mouseIsOver){
                this.ctx.fillStyle = this.hoverBgColor;
                textColor = this.hoverTextColor;
            } else {
                textColor = this.primTextColor;
                this.ctx.fillStyle = this.bgColor;
            }
        }


        this.ctx.fill();

        this.drawText(this.text, this.x + this.halfWidth, this.y + this.halfHeight, textColor, this.secFont, this.secFontSize);
    }

    inArea(posX, posY){
        if((this.x < posX) && (posX < this.x + this.width) && (this.y < posY) && (posY < this.y + this.height)){
            return true;
        }
        return false;
    }

    setAction(func){
        this.action = func;
    }

    setHover(hoverTextColor, hoverBgColor, sound=null){
        this.hoverSet = true;
        this.hoverTextColor = hoverTextColor;
        this.hoverBgColor = hoverBgColor;
        if(sound != null){
            this.hoverSound = sound.cloneNode(true);
            this.playOnce = true;
        }
    }
}