
class Game {
    constructor() {
        
        this.color  = "rgb(0,0,0)";
        this.colors = [0, 0, 0];
        this.shifts = [0, 0, 0];
                              
        this.update = function(player, ctx, mouse) {
          
          //update color and position
          player.update(ctx, this.color);
          player.move(mouse.x, mouse.y);
      
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
      
        };                
    }
}

