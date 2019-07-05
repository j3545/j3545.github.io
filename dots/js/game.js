
class Game {
    constructor() {
        
        this.color  = "rgb(0,0,0)";
        this.colors = [0, 0, 0];
        this.shifts = [0, 0, 0];
        this.dotArray = [];
        this.lineArray = [];
        this.drawingLine = false;
        this.startingDot;
        this.drawingColor = 'red';
        this.naming = false;
        this.nameStartLine = {
            x:0,
            y:0
        };
        this.nameEndLine = {
            x:0,
            y:0
        };

        //add dots here in the constructor to only be called once
        for(let i = 0; i < canvas.width/95; i++){
            for(let j = 0; j<canvas.height/100; j++){
                this.dotArray.push(new Dot(((i*90)+20), j*95+20, 10));
            }
        }
    }

    update(ctx, mouse){
        this.draw(ctx);

        if(this.drawingLine){
            this.drawPath(ctx, this.startingDot, mouse, 10);
        }

        if(this.naming){
            console.log('in this');
            
            this.drawPath(ctx, this.nameStartLine, mouse, 2);
        }

        //randomize color every frame
        for (let index = 0; index < 3; index ++) {
            let color = this.colors[index];
            let shift = this.shifts[index];        
            if (color + shift > 255 || color + shift <= 0) {
                shift = (shift < 0) ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * -5) - 1;
            }
            color += shift;        
            this.colors[index] = color;
            this.shifts[index] = shift;
            // change position
        }
        this.color = "rgb(" + this.colors[0] + "," + this.colors[1] + "," + this.colors[2] + ")";
    }

    draw(ctx){

        //draw dots
        for(let i = 0; i< this.dotArray.length; i++){
            this.dotArray[i].strokeColor = this.color;
            this.dotArray[i].draw(ctx);
        }

        //draw lines
        for(let i = 0; i< this.lineArray.length; i++){
            this.lineArray[i].draw(ctx);
        }
    }
    
    mouseDown(mouse){
        for(let i = 0; i< this.dotArray.length; i++){
            if(mouse.x > this.dotArray[i].x - this.dotArray[i].radius && mouse.x < this.dotArray[i].x + this.dotArray[i].radius &&
                mouse.y > this.dotArray[i].y - this.dotArray[i].radius && mouse.y < this.dotArray[i].y + this.dotArray[i].radius){
                    // so this dot was hit, change color and create line at dot position
                    this.dotArray[i].fillColor = 'red';
                    this.startingDot = this.dotArray[i];
                    this.drawingLine = true;
                    this.naming = false;
            }else{
                //clicking somewhere else
                this.naming = true;
                this.nameStartLine.x = mouse.x;
                this.nameStartLine.y = mouse.y;
            }
        }
    }

    mouseUp(mouse){
        for(let i = 0; i< this.dotArray.length; i++){
            if(mouse.x > this.dotArray[i].x - this.dotArray[i].radius && mouse.x < this.dotArray[i].x + this.dotArray[i].radius &&
                mouse.y > this.dotArray[i].y - this.dotArray[i].radius && mouse.y < this.dotArray[i].y + this.dotArray[i].radius){

                    // so this dot was hit, change color and create line at dot position
                    this.dotArray[i].fillColor = 'red';
                    this.drawingLine = false;
                    this.naming = false;

                    this.lineArray.push(new Line(this.startingDot.x, this.startingDot.y, this.dotArray[i].x, this.dotArray[i].y, 10));

            }else{
                this.nameEndLine.x = mouse.x;
                this.nameEndLine.y = mouse.y;
                this.lineArray.push(new Line(this.nameStartLine.x, this.nameStartLine.y, this.nameEndLine.x, this.nameEndLine.y, 2));
                this.naming = false;
            }
        }
    }

    drawPath(ctx, start, end, width){
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = width;
        ctx.strokeStyle = this.drawingColor;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 0;
    }
}

