class CenteredImage extends Image {
    constructor(canvas, ctx, imgID, x, y, imgWidth=0, imgHeight=0, scale=1) {
        super(canvas, ctx, imgID);
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.imgWidth = imgWidth * scale;
        this.imgHeight = imgHeight * scale;
        this.halfImgWidth = this.imgWidth / 2;
        this.halfImgHeight = this.imgHeight / 2;
    }

    render(){
        super.render(this.img, this.x - this.halfImgWidth, this.y - this.halfImgHeight, this.imgWidth, this.imgHeight);
    }
}