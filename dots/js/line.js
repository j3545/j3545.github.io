class Line{
    constructor(x, y, endX, endY, width){
        this.start = {
            x:x,
            y:y
        }

        this.end = {
            x:endX,
            y:endY
        }
        this.width = width
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 0;
    }
}