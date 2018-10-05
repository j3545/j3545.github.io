var canvas = document.getElementById("particles");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight/1.3;
var c = canvas.getContext("2d");

function distance(x1, y1, x2, y2){
  let xDistance = x2-x1;
  let yDistance = y2-y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function getRandomBetweenTwoValues(min, max){
  console.log('in this');
  var test = Math.random() * (max-min) + min;
  console.log(test);
  return test;
}
/*
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

document.addEventListener("keyup", function(e){
  mySquare.stop();
});//end key up
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

function Circle(x,y){
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.dx = 1;
  this.dy = 1;

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    c.strokeStyle = "#fff";
    c.stroke();
  }

  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x + this.radius + this.dx >= canvas.width || this.x - this.radius < 0){
      this.dx *= -1;
    }
    if(this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0){
      this.dy *= -1;
    }

    this.draw();
  }

}

let circleArray = [];

let circle = new Circle();

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circleArray.forEach(function(circle){
    circle.update();
  });
}

function init(){
  //let x = Math.random() * canvas.width;
  //let y = Math.random() * canvas.height;
  let radius = 10;
  for(let i = 0; i < 10; i++){
    console.log('x');
    let x = getRandomBetweenTwoValues(radius, canvas.width-radius);
    console.log('y');
    let y = getRandomBetweenTwoValues(radius, canvas.height-radius);
    if(i !== 0){
      for(let j = 0; j < circleArray.length; j++){
        if(distance(x, y, circleArray[j].x, circleArray[j].y) - radius*2 < 0){
          x = getRandomBetweenTwoValues(radius, canvas.width-radius);
          y = getRandomBetweenTwoValues(radius, canvas.height-radius);
          j = -1
        }
      }
    }

    circleArray[i] = new Circle(x, y);
  }
  animate();
};


init();
