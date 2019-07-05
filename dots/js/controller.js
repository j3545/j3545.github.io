
class Controller {
    constructor(canvas) {
        
        this.color  = "rgb(0,0,0)";
        this.colors = [0, 0, 0];
        this.shifts = [0, 0, 0];
        this.mouse  = {
            x: canvas.width/2,
            y: canvas.height/2
        }
        
        //randomizing color
        this.color = "rgb(" + this.colors[0] + "," + this.colors[1] + "," + this.colors[2] + ")";
      
    };
    
    changeMouse(x, y){
        this.mouse.x = x;
        this.mouse.y = y;
    }

    
}

