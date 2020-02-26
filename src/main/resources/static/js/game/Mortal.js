class Mortal extends Collideable {
    constructor(x, y, radius, ctx, scale) {
        super(x, y, radius);
        this.deathCounter = MAX_DEATH_COUNTER;
        this.dying = false;
        this.ctx = ctx;
        this.scale = scale;
        this.calculateScale();
    }

    update() {

    }

    render() {
        if (this.dying) {
            this.deathFade();
        }
        if(SHOW_HURT_BOX){
            this.showHitBox();
        }
    }

    dead() {
        return this.deathCounter == 0;
    }

    setDeathCounter(deathCounter) {
        this.deathCounter = deathCounter;
    }

    showHitBox() {
        this.ctx.strokeStyle = "#ff0000";
        this.ctx.beginPath();
        this.ctx.color
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    deathFade() {
        this.deathCounter--;
        this.ctx.globalAlpha = this.deathCounter / MAX_DEATH_COUNTER;
    }

    calculateScale(){
        this.imgWidth = GAME_SPRITE_WIDTH * this.scale;
        this.imgHeight = GAME_SPRITE_HEIGHT * this.scale;
        this.halfWidth = this.imgWidth / 2;
        this.halfHeight = this.imgHeight / 2;
    }

    setScale(scale){
        this.scale = scale;
        this.calculateScale();
    }
}