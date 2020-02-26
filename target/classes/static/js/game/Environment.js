class Environment extends Image {
    constructor(canvas, ctx, imgID, scrollSpeed) {
        super(canvas, ctx, imgID, canvas.width, canvas.height);
        this.bgPos = 0;
        this.fgPos = 0;
        this.bgSpeed = scrollSpeed;
    }
    update() {
        this.bgPos -= this.bgSpeed;
        if(this.bgPos < -this.imgWidth){
            this.bgPos = 0;
        }
    }
    render() {
        for(let i=0; i <= this.canvas.width / this.imgWidth + 1; i++){
            super.render(this.img, this.bgPos + i * this.imgWidth, this.fgPos, this.imgWidth, this.imgHeight);
        }
    }

    setBgSpeed(bgSpeed){
        this.bgsPeed = bgSpeed;
    }
}
