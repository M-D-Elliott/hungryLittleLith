class FlashingScreenEvent extends ScreenEvent{
    constructor(renderable, flashInterval=60, expiration=100, count=0){
        super(renderable, expiration, count);

        this.flashInterval = flashInterval;
        this.visible = true;
    }

    update(){
        super.update();
    }

    render(ticks, args){
        if(ticks % this.flashInterval == 0){
            this.visible = !this.visible;
        }
        if(this.visible){
            super.render(args);
        }
    }
}