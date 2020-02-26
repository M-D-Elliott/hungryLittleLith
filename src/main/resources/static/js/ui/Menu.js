class Menu{
    constructor(canvas, ctx, bgColor, x, y, width, height){
        this.canvas = canvas;
        this.ctx = ctx;
        this.bgColor = bgColor;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.renderable = [];
    }

    update(){
    }

    render(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.x + this.width, this.y +this.height);
        this.ctx.closePath();

        // the outline
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#666666';
        this.ctx.stroke();

        // the fill color
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fill();

        this.renderable.forEach(renderable => {
            renderable.update();
            renderable.render();
        });
    }

    register(renderable){

        if(this.renderable == null || this.renderable == undefined || this.renderable == []){
            this.renderable = [];
        }
        if(renderable instanceof Array){
            this.renderable.concat(renderable);
        } else {
            this.renderable.push(renderable);
        }
    }
}