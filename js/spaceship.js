function getRandomBetweenTwoValues(min, max){
    var test = Math.random() * (max-min) + min;
    return test;
}

function randomColor(length){
    let x = Math.floor(256/length);
    let y = Math.floor(256/length);
    let z = Math.floor(256/length);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";     
    
    return bgColor;
}

function rainbowColor(){
    let x = getRandomBetweenTwoValues(0, 255);
    let y = getRandomBetweenTwoValues(0, 255);
    let z = getRandomBetweenTwoValues(0, 255);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";     
    
    return bgColor;
}

let canvas = document.getElementById("spaceship");


/*
    Setups functionality for game where enemies come down at random
    and attack the player
*/
function setupSpaceshipGame(canvas){
    
    let c = canvas.getContext("2d");
    let squareArray;
    let CLICKED = false;
    let player;
    let brick;    
    let mousecircle;
    let animateID;
    //add circle for mouse
    let mouse = {
        x: 0,
        y: 0
      }
    let parent = document.getElementsByClassName("canvas-container");
    let particleArray = [];
    let enemyArray = [];

    
    canvas.width = parent[0].offsetWidth;
    canvas.height = window.innerHeight/2;

    
    window.addEventListener('resize', function(){
        canvas.width = parent[0].offsetWidth;
        canvas.height = window.innerHeight/2;
		reset();
    });

    window.addEventListener('keydown', function(e){
        if(e.key == 'r'){
          reset();
        }
      });

    canvas.addEventListener('mousemove', function(e){
        mouse.x = e.x - canvas.getBoundingClientRect().left;
        mouse.y = e.y - canvas.getBoundingClientRect().top;
    });

    canvas.addEventListener('mousedown', function(e){
        if(stopGame == true){
            reset();
        }
    });

    
    canvas.addEventListener('touchmove', function(e){
        mouse.x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
        mouse.y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
        
    });

    
/*
  This is used to create particle explosions,
*/
    class Particle{
        constructor(x,y,dx,dy){
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.colors = [getRandomBetweenTwoValues(0, 255), getRandomBetweenTwoValues(0, 255), getRandomBetweenTwoValues(0, 255)];
        }
    
        draw(){
            //rotate to change in x and y
            let angle = Math.atan2(this.dy, this.dx);
            
            c.beginPath();
            //change this with an A
            //c.fillText("A", this.x, this.y);
            
            c.fillStyle = "white";
            c.save();
            c.translate(this.x,this.y);
            c.rotate(angle);
            c.rotate(.5 * Math.PI);
            
        
            // let rText = 'A';
            // c.font = "bold 20px Arial";
            
            // c.fillStyle = "rgb("+ this.colors[0]+","+this.colors[1]+","+this.colors[2]+")";
            // c.fillText(rText , 0, 0);
            // //c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // c.fill();
            c.fillStyle = "rgb("+ this.colors[0]+","+this.colors[1]+","+this.colors[2]+")";
            c.strokeStyle = 'white';
            c.beginPath();
            c.rect(0, 0, 10, 10);
            c.closePath();
            c.fill();

            c.restore();
        }
    
        update(){
            this.x += this.dx;
            this.y += this.dy;
            for(let i =0; i<this.colors.length; i++){
                this.colors[i]-=3;
            }
        }
    }
  

    class Enemy {
        constructor(x, y, length){
            this.x = x + 30;
            this.y = y;
            this.dy = 1;
            this.length = length;
            
            this.color = 'red';
            this.healthPool = 1;
            this.currentHealth = this.healthPool;
            

            this.draw = function(){
                //draw all the enemies in array

                c.fillStyle = randomColor(this.currentHealth);
                c.beginPath();
                c.rect(this.x, this.y, this.length, this.length);
                c.closePath();
								c.strokeStyle = 'white';
                c.fill();
								c.stroke();
                // c.beginPath();
                // c.fillStyle = 'black';
                // c.font="30px serif";
                // c.fillText(this.currentHealth, this.x+this.length/2, this.y+this.length/2);
                // c.closePath();
            };

            this.upgrade = function () {
                this.x = getRandomBetweenTwoValues(canvas.width/1.5, canvas.width/3);
                this.y = y;
                this.length = length;
                this.healthPool++;
                this.currentHealth = this.healthPool;
                this.dy *= 1.02;
            }

            this.update = function () {
                this.y+= this.dy;
                this.draw();
                //players bullet hit enemy
                for(let i =0; i < player.bulletArray.length; i++){
                    if(player.bulletArray[i].y < this.y+this.length && player.bulletArray[i].y > this.y && player.bulletArray[i].x + player.bulletArray[i].length > this.x && player.bulletArray[i].x - player.bulletArray[i].length < this.x+this.length){
                        //lose health
                        this.currentHealth -= player.bulletArray[i].damage;
                        player.hitEnemy(player.bulletArray[i]);                                     
                    }
                }                

                if(this.currentHealth <= 0){
                    player.score++;
                    explosion(this.x, this.y);
                    this.upgrade();
                }
                if(this.y+this.length > canvas.height){
                    gameOver();
                }
                
            };
        }
    }

    class Bullet{
        constructor(length, dx, dy, rotation) {                        
            this.x = player.x;
            this.y = player.y;
            this.length = length;
            this.damage = 1;            
            this.dx = dx;
            this.dy = dy;
            this.rotation = rotation;
        }
    }

    /*
        Player creates a player that moves with mouse or by touch on mobile
    */
    class Player {
        constructor(x, y, length) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.dx = 5;
            this.dy = 30;
            this.height = 20;
            this.width = 20;
            this.color = {
                a: '0',
                b: '0',
                c: '0'
            };
            this.style;
            this.yspeed = 1;
            this.opacity = 0.4;
            this.bulletSpeed = 1.1;            

            this.bulletCount = 0;
            this.bulletArray = [];
            this.fired = false;
            this.score = 0;

            //rotates and draws the player
            this.draw = function(){

                //draw the score
                c.beginPath();
                c.fillStyle = 'White';
                c.font="15px serif"; 
                c.fillText('Score: ' + this.score, canvas.width-100, 20);
                c.closePath();

                c.save();
                c.translate(this.x, this.y);
                c.rotate(45 * Math.PI / 180);
                c.fillStyle = "yellowgreen";
                c.beginPath();
                c.rect(0, 0, this.length, this.length);
                c.closePath();
                c.fill();
                c.restore();
                //draw every bullet
                
                for(let i =0; i < this.bulletArray.length; i++){
                    c.save();
                    c.translate(this.bulletArray[i].x, this.bulletArray[i].y);
                    let temp = this.bulletArray[i].rotation;
                    c.rotate(temp * (Math.PI / 180));
                    c.beginPath();
                    //c.rect(0,0, 10, this.length);
                    c.arc(0, 0, 6, 0, 2 * Math.PI);
                    c.fillStyle = "yellow";
                    c.strokeStyle = "white";
                    c.closePath();
                    c.fill();
                    c.stroke();
                    c.restore();
                    
                }
                
            };

            this.update = function () {
                this.x = mouse.x;
                this.y = mouse.y;
                this.draw();                
                            
                this.fire();
                //update bullet
                if(this.bulletArray.length > 0){
                    for(let i =0; i < this.bulletArray.length; i++){
                        this.bulletArray[i].x += this.bulletArray[i].dx;
                        this.bulletArray[i].y += this.bulletArray[i].dy;
                        if(this.bulletArray[i].y < 0){
                            this.bulletArray.splice(this.bulletArray[i], 1);
                        }
                    }
                }
            };

            this.hitEnemy = function(bullet){
                let index = this.bulletArray.indexOf(bullet);
                if (index > -1) {
                    this.bulletArray.splice(index, 1);
                }
            }
            
            this.fire = function() {
                this.bulletCount++;
                setTimeout(function(){
                    //length dx dy rotation
                    let bullet = new Bullet(10, -13, -13, 145);
                    player.bulletArray.push(bullet);

                    bullet = new Bullet(10, 13, -13, -145);
                    player.bulletArray.push(bullet);

                    bullet = new Bullet(10, 6, -13, -180);
                    player.bulletArray.push(bullet);

                    bullet = new Bullet(10, -6, -13, -180);
                    player.bulletArray.push(bullet);

                    bullet = new Bullet(10, 0, -13, 0);
                    player.bulletArray.push(bullet);
                }, 150);
                
            };
    
        }
    }

    
    function explosion(mouseX, mouseY){  
        let x,y,dx,dy;
        x = mouseX;
        y = mouseY;
        for(let i = 0; i < 50; i++){
            dx = getRandomBetweenTwoValues(-1, 1)*10;
            dy = getRandomBetweenTwoValues(-1, 1)*10;
            particleArray.push(new Particle(x, y, dx, dy));
        }
    }
  

    function animate(){
        c.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        enemy.update();
        if(stopGame == false){
            animateId = requestAnimationFrame(animate);
        }

        //update particles
        for(let i = 0; i< particleArray.length; i++){
            particleArray[i].update();
            if(particleArray[i].x>canvas.width||particleArray[i].x<0 || particleArray[i].y > canvas.height || particleArray[i].y < -200 || particleArray[i].colors[0]<0){
               particleArray.splice(i,1);
            }
        }
        //draw particles
        for(let i = 0; i< particleArray.length; i++){
            particleArray[i].draw();
        }
        
    }

    function gameOver(){
        cancelAnimationFrame(animateID);
        stopGame = true;
        c.beginPath();
        c.fillStyle = 'White';
        c.font="50px sans-serif";
        c.fillText('Game Over R to reset', canvas.width/4, canvas.height/2);
        c.closePath();
    }

    function reset(){
        let length = 20;
        cancelAnimationFrame(animateID);
        bulletArray = [];
        player = new Player(mouse.x, mouse.y, length);
        enemy = new Enemy(canvas.width/2, -50, 50);
        stopGame = false;
        animate();
        console.log(animateId);
        
    }

    function init(){
        let length = 20;
        mouse.x = canvas.width/2;
        mouse.y = canvas.height/1.2-length/2;
        player = new Player(mouse.x, mouse.y, length);
        enemy = new Enemy(canvas.width/2, -50, 50);
        stopGame = false;
        animate();
    };
    init();
}

setupSpaceshipGame(canvas);