class VerticallyScrollingImage extends Image {
    constructor(canvas, ctx, imgID, scrollSpeed=2) {
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
        // this.fgPos -= this.bgSpeed;
        // if(this.fgPos < this.imgHeight){
        //     this.fgPos = 0;
        // }
    }
    render() {
        for(let i=0; i <= this.canvas.width / this.imgWidth + 1; i++){
            super.render(this.img, 0, this.bgPos + i * this.imgHeight, this.imgWidth, this.imgHeight);
        }
    }
}
