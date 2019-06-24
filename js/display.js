
class Display {
    constructor(canvas, player) {
        this.canvas = canvas;

        this.animate = function(){
            c.clearRect(0, 0, innerWidth, innerHeight);
            c.fillStyle = 'red';
            c.beginPath();
            c.rect(player.x, player.y, player.length, player.length);
            c.closePath();
            c.strokeStyle = 'white';
            c.fill();
            c.stroke();
        }        

        this.render = function () {
            interval = setInterval(this.animate, 20);
        }
    }
}
