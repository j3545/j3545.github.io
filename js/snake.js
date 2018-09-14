// Set up canvas
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 800;
var c = canvas.getContext("2d");

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

/*
	Player Controls
*/
document.onkeydown = function(e){
  var key = e.which;
  console.log(key);
  if(key == 38){//up
    snake.dy = -snake.speed;
    snake.dx = 0;
  }else if(key == 40){//down
    snake.dy = snake.speed;
    snake.dx = 0;
  }else if(key == 39){//right
    snake.dx = snake.speed;
    snake.dy = 0;
  }else if(key == 37){//left
    snake.dx = -snake.speed;
    snake.dy = 0;
  }
};

// droplet object
function Snake(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 10;
  this.dx = this.speed;
  this.dy = 0;

  this.draw = function(){
    c.fillStyle = "#000";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  // changes to object over time
  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x > canvas.width){
      this.x = 0;
    }
    if(this.x + this.width < 0){
      this.x = canvas.width;
    }
    if(this.y > canvas.height){
      this.y = 0;
    }
    if(this.y < 0){
      this.y = canvas.height;
    }

  }

}

function animate(){
  c.clearRect(0, 0, innerWidth, innerHeight);
  snake.draw();
  snake.update();
  console.log('test');
}

function init(){
  snake = new Snake(0, 0, 10, 10);
  snake.draw();
  setInterval(animate, 100);//refreshes 10 times a second with 100
}

init();
