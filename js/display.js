
class Display {
    constructor(canvas) {
        this.canvas = canvas;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.render = function (canvas, context, color) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}
