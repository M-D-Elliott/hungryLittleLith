class ScreenEvent{
    constructor(renderable, expiration=100, count=0){
        this.register(renderable, expiration, count);

        this.baseExpiration = expiration;
        this.baseCount = count;
    }

    update(){
        this.count++;
        if(this.count >= this.expiration){
            this.renderable = [];
        }
    }

    render(args){
        this.renderable.forEach(renderable => {
            renderable.update(args);
            renderable.render(args);
        });
    }

    register(renderable, expiration=this.baseExpiration, count=this.baseCount){

        this.expiration = expiration;
        this.count = count;

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