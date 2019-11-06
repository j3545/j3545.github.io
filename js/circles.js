/* A function to return random number from min to max */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(){
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
        
    return "rgb(" + r + "," + g + "," + b + ")";        
}

class CircleCanvas {
    constructor(x, y, length){
        this.canvas;
        this.ctx;
        this.mouse = {
            x: 0,
            y: 0
        }
        this.circleArray = [];
    }
    setupCanvas(){
        // Set up circle canvas
        this.canvas = document.getElementById("circles");
        
        this.canvas.width = window.innerWidth/1.2;
        this.canvas.height = window.innerHeight/2;
        this.ctx = this.canvas.getContext("2d");
    }

    animate(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.circleArray.forEach((circle, i, circleArray) => {
            circle.update(this.canvas);
            circle.draw(this.ctx);
            if(circle.radius < 5){
                circleArray.splice(i,1);
                
            }
        });
        requestAnimationFrame(this.animate());
    }

    init(){
        this.setupCanvas();
        this.canvas.addEventListener('mousemove', (e)=>{

            // this.mouse.x = e.x - this.canvas.getBoundingClientRect().left;
            // this.mouse.y = e.y - this.canvas.getBoundingClientRect().top;
            
            // this.circleArray.push(new Circle(this.mouse.x, this.mouse.y));
        });
        this.canvas.addEventListener('touchmove', (e)=>{            
            
            // this.mouse.x = e.changedTouches[0].clientX - this.canvas.getBoundingClientRect().left;
	        // this.mouse.y = e.changedTouches[0].clientY - this.canvas.getBoundingClientRect().top;
            
            // this.circleArray.push(new Circle(this.mouse.x, this.mouse.y));
            
        });
        this.animate();
        setInterval(()=>{
            this.circleArray.push(new Circle(getRandomInt(0, this.canvas.width), getRandomInt(0, this.canvas.height)));
        }, 300);
    }
}

class Circle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.radius = 10;
        this.gravity = 0.8;
        this.color = randomColor();
        this.fillColor = randomColor();
        this.dx = getRandomInt(-10,10);
    }

    
    draw(ctx){
        ctx.beginPath();
        //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.fillColor;
        ctx.stroke();
        ctx.fill();
    }
    update(canvas){
        this.x += this.dx;
        this.y += this.dy;
        this.dy += this.gravity;
        if(this.y + this.radius + this.dy > canvas.height || this.y + this.radius + this.dy < 0){
            this.dy *= -0.8;
            this.radius--;
        }
        if(this.x + this.radius + this.dx > canvas.width || this.x + this.dx + this.radius < 0){
            this.dx *= -0.8
            this.radius--;
        }
        //generate random red, green and blue intensity
    }
}
