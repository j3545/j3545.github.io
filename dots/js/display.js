
class Display {
    constructor(canvas) {
        this.canvas = canvas;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight/1.2;

        this.render = function (canvas, context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            
        }
    }
}
