this.Bullet = function(x, y, dx, dy, rotation){
    this.x = x;
    this.y = y;
    this.length = 10;
    this.damage = 1;            
    this.dx = dx;
    this.dy = dy;
    this.rotation = rotation;                                              

    this.draw = () => {
        //draw the score
        c.beginPath();
        c.rect(this.x, this.y, this.length, this.length);
        c.closePath();
        c.strokeStyle = 'white';
        c.fill();
        c.stroke();
        
        
    };

    this.update = () => {
        this.draw();
    };
}

class Enemy {
    constructor(x, y, length){
        this.x = x + 30;
        this.y = y;
        this.dy = 5;
        this.length = length;
        
        this.color = 'blue';
        this.healthPool = 1;
        this.currentHealth = this.healthPool;
        this.delete = false;
        this.bulletArray = [];
        

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
            if(this.bulletArray.length > 0){
                for(let i =0; i < this.bulletArray.length; i++){
                    this.bulletArray[i].x += this.bulletArray[i].dx;
                    this.bulletArray[i].y += this.bulletArray[i].dy;
                    this.bulletArray[i].update();
    
                    if(this.bulletArray[i].y > canvas.height || this.bulletArray[i].x > canvas.width){
                        this.bulletArray.splice(this.bulletArray[i], 1);
                        
                        this.bulletCount;
                    }
                }
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

        this.addBullet = (bullet) =>{
            this.bulletArray.push(bullet);
            return this.bulletArray;
        }
    
        this.getBulletArray = () => {
            return this.bulletArray;
        }

        this.fire = () => {
            this.bulletCount++;
            setInterval(()=>{
                //length dx dy rotation
                let bullet = new Bullet(this.x, this.y, 0, this.dy+5, -180);
                this.addBullet(bullet);
                // if(this.score > 10){
                //     bullet = new Bullet(this.x, this.y, 5, 10, -180);
                //     this.addBullet(bullet);
                // }
                // if(this.score > 20){
                //     bullet = new Bullet(this.x, this.y, -5, 10, -180);
                //     this.addBullet(bullet);
                // }
                
            }, 1000);
        };
        this.fire();
    }
}