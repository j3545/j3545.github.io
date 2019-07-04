class Enemy {
    constructor(x, y, length){
        this.x = x + 30;
        this.y = y;
        this.dy = 1;
        this.length = length;
        
        this.color = 'red';
        this.healthPool = 1;
        this.currentHealth = this.healthPool;
        

        this.draw = () =>{
            //draw all the enemies in array
            c.fillStyle = 'red';
            c.beginPath();
            c.rect(this.x, this.y, this.length, this.length);
            c.closePath();
            c.strokeStyle = 'white';
            c.fill();
            c.stroke();            
        };

        this.upgrade = () => {
            this.x = getRandomBetweenTwoValues(canvas.width/1.5, canvas.width/3);
            this.y = y;
            this.length = length;
            this.healthPool++;
            this.currentHealth = this.healthPool;
            this.dy *= 1.05;

            //add an extra enemy
        }

        this.update = ()=>{
            this.y+= this.dy;
            this.draw();
            if(this.currentHealth <= 0){
                player.score++;
                this.upgrade();
            }
            if(this.y + this.length > canvas.height){
                //gameOver();
                console.log('gameover');
                this.y = 0;
                
            }
        };

        this.checkCollision = (bulletArray) => {
            //players bullet hit enemy
            for(let i =0; i < bulletArray.length; i++){
                if(bulletArray[i].y < this.y + this.length &&
                    bulletArray[i].y > this.y &&
                    bulletArray[i].x + bulletArray[i].length > this.x &&
                    bulletArray[i].x - bulletArray[i].length < this.x + this.length)
                    {
                        //lose health
                        this.currentHealth -= bulletArray[i].damage;
                        console.log('hit');
                    }
            }
        }
    }
}