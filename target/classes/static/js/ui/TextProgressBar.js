class TextProgressBar extends TextObject {
    constructor(text, canvas, ctx, x, y, primTextColor, bgColor) {
        super(text, canvas, ctx, x, y, primTextColor, bgColor);
        this.current = 1;
        this.max = 1;
        this.width = this.ctx.measureText(this.text).width;
        this.startX = this.x - (this.width * 2);
        this.lineWidth = 1;
    }

    update() {
    }

    render() {
        const progress = this.current / this.max;

        let textColor = this.primTextColor;
        if(progress != 1){
            super.drawTextOutline(this.text, this.x, this.y, textColor, this.primFont, this.primFontSize, this.alignment, this.lineWidth);
            textColor = this.ctx.createLinearGradient(this.startX, this.y, this.startX + (6 * this.width * progress), this.y);
            textColor.addColorStop(0, this.primTextColor);
            textColor.addColorStop(1, this.bgColor);
        }

        super.drawText(this.text, this.x, this.y, textColor, this.primFont, this.primFontSize);
    }

    setCurrent(current) {
        this.current = current;
    }

    setMax(max) {
        this.max = max;
    }

    setCurrentAndMax(current, max) {
        this.setCurrent(current);
        this.setMax(max);
    }

}