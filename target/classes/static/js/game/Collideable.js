// constructed with help from this YT video:
// https://www.youtube.com/watch?v=XYzA_kPWyJ8
class Collideable{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    collide(other){

        const distance = this.getDistance(this.x, this.y, other.x, other.y);

        return distance <= this.radius + other.radius;

    }

    getDistance(x1, y1, x2, y2){
        const xDistance = x2 - x1;
        const yDistance = y2 - y1;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    getPointBetween(x1, y1, x2, y2, distanceToTravel){
        const distanceBetween = this.getDistance(x1, y1, x2, y2);
        const distancePercentage = (distanceToTravel / distanceBetween);
        return {
            x: (distancePercentage * (x2 - x1)),
            y: (distancePercentage * (y2 - y1))
        }
    }
}