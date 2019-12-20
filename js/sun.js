class Sun{
    constructor(){
        this.canvas = document.getElementById('sun');
        this.ctx = this.canvas.getContext('2d');
        this.parent = this.canvas.parentElement;
        this.canvas.width = this.parent.clientWidth
        this.canvas.height = this.parent.clientHeight*2

        this.circleArray = [];
        this.sweatArray = [];
    }

    draw(){
        for (let i = 0; i < this.circleArray.length; i++) {
            const radius = this.circleArray[i];
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(" + this.circleArray[i].color[0] + ", " + this.circleArray[i].color[1] + ", " + this.circleArray[i].color[2] + ", " + this.circleArray[i].color[3] + ")";
            this.ctx.arc(100,100, this.circleArray[i].radius, 0, Math.PI*2);
            this.ctx.fill();
        }
    }

    update(){
        for (let i = 0; i < this.circleArray.length; i++) {            
            this.circleArray[i].radius += 1;
            if(this.circleArray[i].color[3] < 0){
                this.circleArray.splice(i,1);
            }
            this.circleArray[i].color[1] -= 1;
            this.circleArray[i].color[2] -= 2;
            this.circleArray[i].color[3] -= 0.003;
        }

        if(this.circleArray.length == 0 || this.circleArray[this.circleArray.length-1].radius > 80){
            let circle = {
                radius: 50,
                color: [255, 255, 255, 1]
            }

            this.circleArray.push(circle);
        }        
    }

    animate(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
        this.update();
        this.draw();
        requestAnimationFrame(()=>{
            this.animate();
        });
    }

    play(){
        this.animate();
    }
}

let sunGame = new Sun();

sunGame.play();