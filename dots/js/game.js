
class Game {
    constructor() {
        this.dotArray = [];
        this.lineArray = [];
        this.startingDot = null;
        this.player = 0;
        this.color = 'red';

        //add dots here in the constructor to only be called once
        for(let i = 0; i < canvas.width/95; i++){
            for(let j = 0; j<canvas.height/100; j++){
                this.dotArray.push(new Dot(((i*90)+20), j*95+20, 30));
            }
        }
    }

    update(ctx, mouse){
        this.draw(ctx, mouse);
        if(this.player != this.lineArray.length % 2){
            this.player = this.lineArray.length % 2;
            console.log('in this', this.player,);
            if(this.player == 1){
                this.color = 'blue';
            }else{
                this.color = 'red';
            }
        }
        
    }

    draw(ctx, mouse){
        //draw dots
        for(let i = 0; i< this.dotArray.length; i++){
            this.dotArray[i].strokeColor = this.color;
            this.dotArray[i].draw(ctx);
        }

        //draw lines
        for(let i = 0; i< this.lineArray.length; i++){
            this.lineArray[i].draw(ctx);
        }

        if(this.startingDot != null){
            this.drawPath(ctx, this.startingDot, mouse, 10);
        }
    }
    
    mouseDown(mouse){
        for(let i = 0; i< this.dotArray.length; i++){
            if(this.hitDot(mouse, this.dotArray[i])){
                    // so this dot was hit, change color and create line at dot position                    
                    this.startingDot = this.dotArray[i];
                    this.startingDot.fillColor = this.color;
                    
            }
        }
    }

    mouseUp(mouse){
        if(this.startingDot != null){
            let found = false;
            for(let i = 0; i< this.dotArray.length; i++){
                // so this dot was hit, change color and create line at dot position
                if(this.hitDot(mouse, this.dotArray[i])){
                    this.dotArray[i].fillColor = this.color;
                    this.lineArray.push(new Line(this.startingDot.x, this.startingDot.y, this.dotArray[i].x, this.dotArray[i].y, 10, this.color));
                    found = true;
                }
            }
            //lets check if a line already connects to it
            for(let i = 0; i< this.lineArray.length; i++){
                if(this.hitDot(this.lineArray[i].end, this.startingDot)){
                    found = true;
                }
            }
            if(found == false){
                this.startingDot.fillColor = 'white';
            }else{
                this.startingDot = null;
            }
            this.startingDot = null;
        }
    }

    hitDot(mouse, dot){
        if(mouse.x > dot.x - dot.radius &&
            mouse.x < dot.x + dot.radius &&
            mouse.y > dot.y - dot.radius &&
            mouse.y < dot.y + dot.radius)
        {
            return true;
        }else{
            return false;
        }
    }

    /**
     * Draw Path
     * takes in two x,y objects and a width and the context to draw it
     * 
     * TODO move drawing out of game.js
     */
    drawPath(ctx, start, end, width){
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 0;
    }
}

