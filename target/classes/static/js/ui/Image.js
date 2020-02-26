class Image{
    constructor(canvas, ctx, imgID, imgWidth, imgHeight){
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = document.getElementById(imgID);
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
    }

    update(){

    }

    render(img, x, y, imgWidth, imgHeight){
        this.ctx.drawImage(img, x, y, imgWidth, imgHeight);
    }
}