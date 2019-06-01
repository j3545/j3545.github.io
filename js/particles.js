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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

function Circle(x,y){
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.dx = 5;
  this.dy = 3;
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
    if(this.x + this.width >= canvas.width || this.x < 0){
      this.dx *= -1;
    }
    if(this.y + this.height + this.dy > canvas.height || this.y < 0){
      this.dy *= -1;
    }
    this.draw();
  }
}



function animate(){
  
  c.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < squareArray.length; i++){
    squareArray[i].update();
  }
}

function init(){
  squareArray = [];
  let radius = 10;
  for(let i = 0; i < 3; i++){
    let x = 0;
    let y = 0;
    squareArray[i] = new Circle(x, y);
  }
  setInterval(animate, 100);
};
init();
