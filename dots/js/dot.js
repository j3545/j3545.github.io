class Dot{
    constructor(x,y,radius){   
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strokeColor = 'white';
        this.fillColor = 'white'
        //console.log(x,y,radius)
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 0;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}