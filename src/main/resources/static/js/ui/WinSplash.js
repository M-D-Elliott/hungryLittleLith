class WinSplash extends Splash {
    constructor(text, canvas, ctx, textColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize) {
        super(text, canvas, ctx, textColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize);
    }

    init(score){

        const winHint = new Hint([
            score
        ], HintType.DEFAULT);

        super.init(winHint);
    }
}