class TextObject {
    constructor(
        text,
        canvas, 
        ctx, 
        x,
        y,
        primTextColor="#FFFFFF", 
        bgColor="#000000", 
        primFont=PRIMARY_FONT, 
        primFontSize="40", 
        lineSpacing=40, 
        secFont=SECONDARY_FONT, 
        secFontSize="20",
        alignment="center"){

        this.canvas = canvas;
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.primTextColor = primTextColor;
        this.bgColor = bgColor;
        this.primFont = primFont;
        this.primFontSize = primFontSize;
        this.lineSpacing = lineSpacing;
        this.secFont = secFont;
        this.secFontSize = secFontSize;
        this.alignment = alignment;

        this.text = text;
    }

    update(){

    }
    
    render() {
        this.drawText(this.text, this.x, this.y, this.primTextColor, this.primFont, this.primFontSize);
    }

    drawText(text, x, y, textColor, font, fontSize, alignment="center"){
        this.ctx.font = fontSize + "px " + font;
        this.ctx.fillStyle = textColor;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, x, y + fontSize / 4);
    }

    drawTextOutline(text, x, y, textColor, font, fontSize, alignment="center", lineWidth=1){
        this.ctx.font = fontSize + "px " + font;
        this.ctx.textAlign = alignment;
        this.ctx.strokeStyle = textColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeText(text, x, y + fontSize / 4);
    }
}