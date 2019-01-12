let canvas = document.getElementById("particles");
let c = canvas.getContext("2d");
let squareArray;
let CLICKED = false;
let player;
let brick;
let mouse = {
  x:0,
  y:0
};

let mousecircle;

canvas.width = window.innerWidth*0.8;

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth*0.8;
});

canvas.addEventListener("mousemove", function(e){  
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(e);
});

canvas.addEventListener("touchstart", function(e){
  console.log(e.touches[0], 'testing');
  
});


canvas.addEventListener('mousemove', function(e){
  console.log(e);
});


function distance(x1, y1, x2, y2){
  let xDistance = x2-x1;
  let yDistance = y2-y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}



/*
document.addEventListener("DOMContentLoaded", function(event) {
  resize();
  init();
});


document.addEventListener("touchmove", function(e){
  console.log(e.target.id);
  if(e.target.id == "left-arrow"){
    player.moveLeft();
  }
});

// touch end
document.addEventListener("touchend", function(e){
  player.stop();
});


// touch end


function Square(){
  this.x = 10;
  this.y = 10;
  this.width = 30;
  this.height = 30;
  this.dx = 0;
  this.dy = 0;
  this.hasJumped;

  this.draw = function(){
    c.fillStyle = "red";
    c.fillRect(this.x,this.y,this.width,this.height);
  }

  //update the objects location
  this.update = function(){
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    this.dy += 0.1

    // on ground
    if(this.y + this.dy + this.height > canvas.height){
      this.dy = 0;
      this.hasJumped = false;
    }
  }

  this.moveRight = function(){
    this.dx = 3;
  }
  this.moveLeft= function(){
    this.dx = -3
  }
  this.jump = function(){
    if(!player.hasJumped){
      this.dy = -3.8
    }
    player.hasJumped = true;
  }
  this.stop = function(){
    this.dx = 0;
  }
}

function Brick(){
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.width = 100;
  this.height = 10;
  this.draw = function(){
    c.fillStyle = "blue";
    c.fillRect(this.x,this.y,this.width,this.height);
  }
}
*/

function mouseCircle(x,y){
  this.x = x;
  this.y = y;
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, 10, 0, 2*Math.PI);
    c.strokeStyle = "red";
    c.stroke();
  }
  this.update = function(){
    this.x = mouse.x;
    this.y = mouse.y;
    this.draw();
  }
}

function Circle(x,y){
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.dx = getRandomBetweenTwoValues(-0.5,0.5);
  this.dy = getRandomBetweenTwoValues(-0.5,0.5);
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
    this.style = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + "," + this.opacity +")";

    if(this.x <= mousecircle.x+100 && this.x >= mousecircle.x-100 && this.y <= mousecircle.y+100 && this.y >= mousecircle.y-100 && this.color.a >= 0){

      this.color.a--;
      this.color.b--;
      this.color.c--;

      this.opacity += 0.01;
    }else{
      if(this.opacity > 0.4){
        this.opacity -= 0.01;
      }
      if(this.color.a <= 255){
        this.color.a += 1;
        this.color.b += 1;
        this.color.c += 1;
      }
    }
    if(this.x >= canvas.width){
      this.x = 0;
    }
    if(this.x < 0){
      this.x = canvas.width;
    }
    if(this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0){
      this.dy *= -1;
    }
    this.draw();
  }
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  mousecircle.update();
  for(let i = 0; i < squareArray.length; i++){
    squareArray[i].update();
  }
}

function init(){
  squareArray = [];
  let radius = 10;
  for(let i = 0; i < 100; i++){
    let x = getRandomBetweenTwoValues(radius, canvas.width-radius);
    let y = getRandomBetweenTwoValues(radius, canvas.height-radius);
    if(i !== 0){
      for(let j = 0; j < squareArray.length; j++){
        if(distance(x, y, squareArray[j].x, squareArray[j].y) - radius*2 < 0){
          x = getRandomBetweenTwoValues(radius, canvas.width-radius);
          y = getRandomBetweenTwoValues(radius, canvas.height-radius);
          j = -1
        }
      }
    }
    squareArray[i] = new Circle(x, y);
  }
  mousecircle = new mouseCircle(mouse.x,mouse.y);
  animate();
};
init();
