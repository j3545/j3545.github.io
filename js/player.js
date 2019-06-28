this.Player = function (x, y, len) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.score = 0;

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
        c.arc(this.x, this.y+this.len/2, 60, 0, 2 * Math.PI);
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

        //change position
        
        //this.x += ;
    }
    
    this.move = (x, y)=>{
        this.x = x;
        this.y = y;
    }
};
