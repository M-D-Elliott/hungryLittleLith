class Clock {
    constructor(maxTick) {
        this.maxTick = maxTick // 1000 is best.
        this.ticks = 0;
    }

    tick() {
        this.ticks++;
        // console.log(this.ticks);
        return this.ticks %= this.maxTick;
    }

    reset(){
        this.ticks = 0;
    }
}