class Celestial extends Mortal {
    constructor(imgId, x, y, speed, scale, size, screen) {
        super(x, y, (HALF_IMAGE_WIDTH * scale), screen.ctx, scale)
        this.speed = speed;
        this.length = length;
        this.sprite = document.querySelector(GAME_CANVAS_ID + '> #' + imgId);
        this.size = size;
        this.angle = 0;
        this.angularSpeed = 2;
        this.screenHeight = screen.canvas.height;

        this.currentRadius = this.radius + this.radiusAdj();
    }

    update() {
        super.update();
        this.x -= this.speed;
    }

    render() {
        this.ctx.save();
        super.render();
        let renderX = this.x - this.halfWidth;
        let renderY = this.y - this.halfHeight;
        this.drawRotationalImage(this.sprite, this.x, this.y, this.scale, this.handleAngle());
        this.ctx.restore();
    }

    outOfBounds() {
        return this.x < 0 || this.y < 0 || this.y > this.screenHeight;
    }

    // adjustRadius(){
    //     switch(this.size){
    //         case 1:
    //             this.radius -= 2;
    //             break;
    //         case 2:
    //             this.radius -= 7;
    //             break;
    //         case 3:
    //             this.radius -= 6;
    //             break;
    //         case 4:
    //             this.radius -= 5;
    //             break;
    //         case 5:
    //             this.radius -= 10;
    //             break;
    //         case 6:
    //             this.radius -= 30;
    //             break;
    //     }
    // }

    radiusAdj(){
        switch(this.size){
            case 1:
                return -10;
            case 2:
                return -7;
            case 3:
                return -6;
            case 4:
                return -5;
            case 5:
                return -10;
            case 6:
                return -30;
        }
    }

    drawRotationalImage(image, x, y, scale, rotation){
        this.ctx.setTransform(scale, 0, 0, scale, x, y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        // this.ctx.setTransform(1,0,0,1,0,0);
    }

    handleAngle() {
        this.angle += this.angularSpeed;
        if (this.angle >= 360) {
            this.angle = 0;
        }
        return this.angle * TO_RADIANS;
    }

    drawStandardImage(renderX, renderY){
        this.ctx.save();
        this.ctx.drawImage(this.sprite, renderX, renderY, this.imgHeight, this.imgWidth);
        this.ctx.restore();
    }
}