class Enemy {
    constructor(x, y, length){
        this.x = x + 30;
        this.y = y;
        this.dy = 3;
        this.length = length;
        
        this.color = 'blue';
        this.healthPool = 1;
        this.currentHealth = this.healthPool;
        this.delete = false;
        

        this.draw = () =>{
            //draw the score
            c.beginPath();
            c.fillStyle = 'White';
            c.font="15px serif"; 
            c.fillText('Health: ' + this.currentHealth, this.x, this.y);
            c.closePath();

            //draw all the enemies in array
            c.fillStyle = this.color;
            c.beginPath();
            c.rect(this.x, this.y, this.length, this.length);
            c.closePath();
            c.strokeStyle = 'white';
            c.fill();
            c.stroke();
        };

        this.upgrade = () => {
            this.x = Math.floor((Math.random() * canvas.width-300) + 100);
            this.y = y;
            this.length = length;
            this.currentHealth = this.healthPool;
        }

        this.update = ()=>{
            this.y+= this.dy;
            this.draw();
            if(this.currentHealth <= 0){
                this.delete = true;
            }
            if(this.y + this.length > canvas.height){
                //delete the object

                // this.y = 0;
            }
        };

        this.checkCollision = (bulletArray) => {
            //players bullet hit enemy
            for(let i =0; i < bulletArray.length; i++){
                if(bulletArray[i].y < this.y + this.length &&
                    bulletArray[i].y > this.y &&
                    bulletArray[i].x + bulletArray[i].length > this.x &&
                    bulletArray[i].x - bulletArray[i].length < this.x + this.length){
                        //lose health
                        this.currentHealth -= bulletArray[i].damage;
                        return bulletArray[i];
                    }
            }
            return false;
        }
    }
}