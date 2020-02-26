class StaticImage extends Image {
    constructor(canvas, ctx, imgID, x, y, imgWidth=0, imgHeight=0) {
        super(canvas, ctx, imgID);
        this.x = x;
        this.y = y;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
    }

    render(){
        super.render(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
    }
}