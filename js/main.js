var canvas = document.getElementById("box_jump");
var c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

document.addEventListener("keydown", function(e){
  if(e.keyCode == 37){
    mySquare.moveLeft();
  }
  if(e.keyCode == 39){
    mySquare.moveRight();
  }
  if(e.keyCode == 38){
    mySquare.jump();
  }
});

document.addEventListener("touchstart", function(e){
  var key = e.which;
  switch(key){
    case 38:// up arrow
      if(!mySquare.hasJumped){
        mySquare.jump();
      }
      mySquare.hasJumped = true;
      break;

    case 39:// right arrow
      mySquare.moveRight();
      break;

    case 37:// left arrow
      mySquare.moveLeft();
      break;

    default:
      break;
  }
});
document.addEventListener("touchmove", function(e){
  console.log(e.target.id);
  if(e.target.id == "left-arrow"){
    mySquare.moveLeft();
  }
});
// touch end
document.addEventListener("touchend", function(e){
  mySquare.stop();
});

document.addEventListener('contextmenu', function(e){
  e.preventDefault();
});

document.addEventListener("keyup", function(e){
  mySquare.stop();
});//end key up

// button click events
/*
$(".arrows #up-arrow").mousedown(function(e){
  console.log("test");
  mySquare.jump();
});
$(".arrows #right-arrow").mousedown(function(e){
  mySquare.moveRight();
});
$(".arrows #left-arrow").mousedown(function(e){
  mySquare.moveLeft();
});
$(".arrows").mouseup(function(e){
  mySquare.stop();
});
*/


function Square(){
  this.x = 10;
  this.y = 10;
  this.width = 30;
  this.height = 30;
  this.dx = 0;
  this.dy = 0;
  this.hasJumped;

  this.draw = function(){
    c.beginPath();
    c.rect(this.x,this.y,this.width, this.height);
  }

  //update the objects location
  this.update = function(){
    this.x += this.dx
    this.draw();
    this.y += this.dy;
    this.dy += 0.1

    // on ground
    if(this.y + this.dy + this.height > canvas.height){
      this.dy = 0;
      this.hasJumped = false;
    }
  }//end update

  this.moveRight = function(){
    this.dx = 3;
  }
  this.moveLeft= function(){
    this.dx = -3
  }
  this.jump = function(){
    if(!mySquare.hasJumped){
      this.dy = -3.8
    }
    mySquare.hasJumped = true;
  }
  this.stop = function(){
    this.dx = 0;
  }
}

function Platform(){
  this.x = canvas.width-100;
  ;
  this.y = canvas.height - 40;
  this.width = 50;
  this.height = 10;
  this.draw = function(){
    c.rect(this.x,this.y,this.width, this.height);
  }
}

var mySquare = new Square();
var platform1 = new Platform();

function start(){
  requestAnimationFrame(start);
  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "white";
  c.strokeStyle = "black";

  c.lineWidth = 1;
  mySquare.update();
  //platform1.draw();
  c.fill();
  c.stroke();
}

start();
