class SubLith extends Mortal {
    constructor(x, y, sprite, ctx, scale) {
        super(x, y, HALF_IMAGE_WIDTH, ctx, scale);
        this.sprite = sprite;
    }

    init(){

    }

    render(){
        const renderX = this.x - this.halfWidth;
        const renderY = this.y - this.halfHeight;

        this.ctx.drawImage(this.sprite, renderX, renderY, this.imgHeight, this.imgWidth);
    }

    update(cx, cy, radius, angle){
        this.setNewPosition(cx, cy, radius, this.angle + angle);
    }

    setNewPosition(cx, cy, radius, angle){
        this.angle = angle;
        this.x = cx + radius;
        this.y = cy + radius;
        const newPos = this.rotate(cx, cy, this.x, this.y, angle, ANTI_CLOCKWISE);
        this.x = newPos.x;
        this.y = newPos.y;
    }

    // solution for revolution found at:
    // https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
    /*
    CX @ Origin X  
    CY @ Origin Y
    X  @ Point X to be rotated
    Y  @ Point Y to be rotated  
    anticlock_wise @ to rotate point in clockwise direction or anticlockwise , default clockwise 
    return @ {x,y}  
    */
    rotate(cx, cy, x, y, angle, anticlock_wise = false) {
        if (angle == 0) {
            return { x: parseInt(x), y: parseInt(y) };
        } if (anticlock_wise) {
            var radians = (TO_RADIANS) * angle;
        } else {
            var radians = (-TO_RADIANS) * angle;
        }

        const centerX = x - cx;
        const centerY = y - cy;

        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var nx = (cos * (centerX)) + (sin * (centerY)) + cx;
        var ny = (cos * (centerY)) - (sin * (centerX)) + cy;
        return { x: nx, y: ny };
    }
}