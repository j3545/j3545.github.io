function getRandomBetweenTwoValues(min, max){
    var test = Math.random() * (max-min) + min;
    return test;
}

let canvas = document.getElementById("particles");


canvas = document.getElementsByClassName("particles");



for(let i =0; i < canvas.length; i++){

    let c = canvas[i].getContext("2d");
    let squareArray;
    let CLICKED = false;
    let brick;
    let mouse = {
    x:0,
    y:0
    };
    let mousecircle;
    let player;
    let enemy;

    let parent = document.getElementsByClassName("canvas");
    
    
    canvas[i].width = parent[0].offsetWidth;
    canvas[i].height = parent[0].offsetHeight;

    
  window.addEventListener('resize', function(){
    canvas[i].width = parent[0].offsetWidth;
    canvas[i].height = parent[0].offsetHeight;
  });




    function Circle(x,y){
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.dx = 5;
    this.dy = 30;
    this.height = 20;
    this.width = 20;
    this.color = {
        a: '0',
        b: '0',
        c: '0'
    }
    this.style;
    this.yspeed = 1;
    this.opacity = 0.4;

    this.draw = function(){
        c.beginPath();

        c.rect(this.x, this.y, 20,20);
        c.strokeStyle = "green";
        c.stroke();
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.x + this.width >= canvas[i].width || this.x < 0){
        this.dx *= -1;
        }
        if(this.y + this.height + this.dy > canvas[i].height || this.y < 0){
        this.dy *= -1;
        }
        this.draw();
    }
    }



    function animate(){
        c.clearRect(0, 0, canvas[i].width, canvas[i].height);
        for(let i = 0; i < squareArray.length; i++){
            squareArray[i].update();
        }
        requestAnimationFrame(animate);
    }

    function init(){
        squareArray = [];
        let radius = 10;
        for(let i = 0; i < 3; i++){
            let x = 0;
            let y = 0;
            squareArray[i] = new Circle(x, y);
        }
        var animateID = requestAnimationFrame(animate);
    };
    //init();
}

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
    let parent = document.getElementsByClassName("canvas");
    canvas.width = parent[0].offsetWidth;
    canvas.height = parent[0].offsetHeight;

    
    window.addEventListener('resize', function(){
        canvas.width = parent[0].offsetWidth;
        canvas.height = parent[0].offsetHeight;
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
    
    canvas.addEventListener('touchmove', function(e){
        mouse.x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
        mouse.y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
    });

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
                c.fillStyle = this.color;
                c.beginPath();
                c.rect(this.x, this.y, this.length, this.length);
                c.closePath();
                c.fill();
                c.beginPath();
                c.fillStyle = 'black';
                c.font="30px serif";
                c.fillText(this.currentHealth, this.x+this.length/2, this.y+this.length/2);
                c.closePath();
            };

            this.upgrade = function () {
                this.x = getRandomBetweenTwoValues(canvas.width/1.5, canvas.width/3);
                this.y = y;
                this.length = length;
                this.color = 'red';
                this.healthPool++;
                this.currentHealth = this.healthPool;
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
                    this.upgrade();
                }
                if(this.y+this.length > canvas.height){
                    gameOver();
                }
                
            };
        }
    }

    /*
        Player creates a player that moves with mouse or by touch on mobile
    */
    class Player {
        constructor(x, y, length) {

            class Bullet{
                constructor(x, y, length) {
                    
                    
                    this.x = x;
                    this.y = y;
                    this.length = length;
                    this.damage = 1;
                                        
                    
                }
            }
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

            //rotates and draws the player
            this.draw = function () {
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
                    this.bulletArray[i].y -= 5;
                    c.beginPath();
                    c.rect(this.bulletArray[i].x - this.bulletArray[i].length/2, this.bulletArray[i].y, this.bulletArray[i].length, this.length);
                    c.fillStyle = "white";
                    c.closePath();
                    c.fill();
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

                        //if bullet is past wall
                        if(this.bulletArray[i].y < 0){
                            this.bulletArray[i].x = this.x;
                            this.bulletArray[i].y = this.y;
                            this.fire();
                            
                        }else{
                            this.bulletArray[i].y -= 13;
                        }                                                                                                
                    }
                }
                
                
            };

            this.hitEnemy = function(bullet){
                bullet.x = this.x;
                bullet.y = this.y;
                this.fire();
            }
            
            this.fire = function() {
                let bullet = new Bullet(this.x, this.y, 10);
                
                if(this.bulletCount < 2){
                    console.log('fire',this.bulletArray);
                    setTimeout(function(){

                        player.bulletArray.push(bullet);

                    }, 300+200*this.bulletCount);
                    this.bulletCount++;
                    
                }
                
                
                                                                
            };
    
        }
    }



    function animate(){
        c.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        enemy.update();
        if(stopGame == false){
            animateId = requestAnimationFrame(animate);
        }
        
    }

    function gameOver(){
        cancelAnimationFrame(animateID);
        stopGame = true;
        c.beginPath();
        c.fillStyle = 'White';
        c.font="50px serif";
        c.fillText('Game Over R to reset', canvas.width/2.5, canvas.height/2);
        c.closePath();
    }

    function reset(){
        let length = 20;
        cancelAnimationFrame(animateID);
        player = new Player(mouse.x, mouse.y, length);
        enemy = new Enemy(canvas.width/2, -50, 50);
        enemy.dy = 5;
        animateId = requestAnimationFrame(animate);
        stopGame = false;
    }

    function init(){
        let length = 20;
        mouse.x = canvas.width/2;
        mouse.y = canvas.height/1.2-length/2;
        player = new Player(mouse.x, mouse.y, length);
        //create enemy
        enemy = new Enemy(canvas.width/2, -50, 50);
        animateId = requestAnimationFrame(animate);
        stopGame = false;
        console.log('init');
    };
    init();
}

setupSpaceshipGame(canvas[0]);