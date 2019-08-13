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
        console.log(this.canvas.getBoundingClientRect());
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight/2;
        this.ctx = this.canvas.getContext("2d");
    }

    init(){
        this.setupCanvas();
        this.canvas.addEventListener('mousedown', (e)=>{
            console.log(e);

            this.mouse.x = e.x - this.canvas.getBoundingClientRect().left;
            this.mouse.y = e.y - this.canvas.getBoundingClientRect().top;
            
            this.circleArray.push(new Circle(this.mouse.x, this.mouse.y));
        });
        this.canvas.addEventListener('touchmove', (e)=>{            

            this.mouse.x = e.changedTouches[0].clientX - this.canvas.getBoundingClientRect().left;
	        this.mouse.y = e.changedTouches[0].clientY - this.canvas.getBoundingClientRect().top;
            
            this.circleArray.push(new Circle(this.mouse.x, this.mouse.y));
            console.log(this.mouse.x, this.mouse.y);
            
        });
        setInterval(()=>{
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.circleArray.forEach((circle, i, circleArray) => {
                circle.update(this.canvas);
                circle.draw(this.ctx);
                if(circle.radius < 5){
                    circleArray.splice(i,1);
                    console.log(this.circleArray, "deleted");
                    
                }
            });
        }, 1000/60);
    }
}

class Circle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.radius = 10;
        this.gravity = 0.8;
    }
    draw(ctx){
        ctx.beginPath();
        //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    update(canvas){
        this.y += this.dy;
        this.dy += this.gravity;
        if(this.y + this.radius + this.dy > canvas.height || this.y + this.radius + this.dy < 0){
            this.dy *= -0.8;
            this.radius--;
        }
    }
}
