this.Bullet = function(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.length = 10;
    this.damage = 1;            
    this.dx = dx;
    this.dy = dy;
    //this.rotation = rotation;                                              

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

this.Player = function (x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.score = 0;
    this.bulletArray = [];
    this.bulletCount = 0;

    this.draw = (c, color) => {
        //draw the score
        c.beginPath();
        c.fillStyle = 'White';
        c.font="15px serif"; 
        c.fillText('Is this Game Ready?: ' + this.score, 0, 20);
        c.closePath();

        //draw a light circle around player
        c.beginPath();
        //x,y,radius, startAngle, endAngle, counterClockwise        
        c.arc(this.x, this.y + this.len/2, 60, 0, 2 * Math.PI);
        c.strokeStyle = 'rgb(255,255,255,0.2)';
        c.stroke(); 
        c.closePath();

        c.fillStyle = color;
        c.save();
        c.translate(this.x, this.y);
        c.rotate(45 * Math.PI / 180);
        
        c.beginPath();
        c.rect(0, 0, this.len, this.len);
        c.closePath();
        c.strokeStyle = color;
        c.fill();
        c.restore();
        c.stroke();
        
    };

    this.update = (c, color) => {
        this.draw(c, color);
                                
        if(this.bulletArray.length > 0){
            for(let i =0; i < this.bulletArray.length; i++){
                this.bulletArray[i].x += this.bulletArray[i].dx;
                this.bulletArray[i].y += this.bulletArray[i].dy;
                this.bulletArray[i].update();

                if(this.bulletArray[i].y < 0 || this.bulletArray[i].x > canvas.width){
                    this.bulletArray.splice(this.bulletArray[i], 1);
                    this.bulletCount;
                }
            }
        }
        
    }

    this.addBullet = (bullet) =>{
        this.bulletArray.push(bullet);
        return this.bulletArray;
    }

    this.getBulletArray = () => {
        return this.bulletArray;
    }
    
    this.move = (x, y)=>{
        this.x = x;
        this.y = y;
    }

    this.fire = () => {
        this.bulletCount++;
        setInterval(()=>{
            //length dx dy rotation
            let bullet = new Bullet(this.x, this.y, 0, -10);
            this.addBullet(bullet);
        }, 100);
    };
    this.fire();
    

    
};
