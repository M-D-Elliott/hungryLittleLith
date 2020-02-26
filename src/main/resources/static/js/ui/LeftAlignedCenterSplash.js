class LeftAlignedCenterSplash extends Splash{
    constructor(text, canvas, ctx, textColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize, alignment="start"){
        super(text, canvas, ctx, textColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize, alignment);
        this.x = canvas.width / 4.2;
    }
}