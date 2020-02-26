class Splash extends TextObject {
    constructor(text, canvas, ctx, textColor, bgColor, primFont, primFontSize, lineSpacing, secFont, secFontSize, alignment="center") {
        super(
            text,
            canvas, 
            ctx,
            (canvas.width / 2),
            (canvas.height / 2) - SPLASH_VERTICAL_OFFSET - DASH_MENU_HEIGHT,
            textColor, 
            bgColor, 
            primFont, 
            primFontSize, 
            lineSpacing, 
            secFont, 
            secFontSize,
            alignment);
        this.isFirstFrame = true;
        this.text = text;
        this.hints =
        [
            new Hint(
                [
                    'Empty'
                ]
            )
        ];
    }

    update(){

    }

    render(){
        this.drawText(this.text, this.x, this.y, this.primTextColor, this.primFont, this.primFontSize, this.alignment);
        let yShift = this.y + this.lineSpacing;
        this.hints.forEach(hint => {
            if(hint instanceof Hint){
                hint.lines.forEach(line => {
                    yShift += this.lineSpacing;
                    this.drawText(line, this.x, yShift, this.textColor, this.secFont, this.secFontSize, this.alignment);
                });
            }
        });
    }

    init(hint) {
        this.isFirstFrame = false;
        if (hint != null && hint != undefined) {
            this.setHint(hint);
        }
    }

    setHint(hint) {
        this.hints = [hint];
    }

    addHint(hint) {
        this.hints.push(hint);
    }
}