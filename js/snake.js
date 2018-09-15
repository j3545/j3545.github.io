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

// snake object
function Snake(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 10;
  this.dx = this.speed;
  this.dy = 0;
  this.body = [];
  this.len = 1;
  this.body.push(c.fillRect(this.x, this.y, this.width, this.height));
  console.log(this.body);

  this.draw = function(){
    c.fillStyle = "#000";
    for(var i = 0; i < this.len; i++){
    }
  }

  this.grow = function(){
    this.len++;
    this.body.push();
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
    //check if the food was eaten
    if(this.x == food.x && this.y == food.y){
      //make new food
      this.grow();
      food.getLocation();
    }
  }
}

function Food(){
  this.x;
  this.y;
  this.width = 10;
  this.height = 10;

  this.getLocation = function(){
    this.x = Math.random() * (canvas.width - 20) + 10;
    this.y = Math.random() * (canvas.height - 20) + 10;

    this.x = this.x/10;
    this.x = Math.floor(this.x);
    this.x = this.x*10;

    this.y = this.y/10;
    this.y = Math.floor(this.y);
    this.y = this.y*10;
  }

  this.draw = function(){
    if(this.x >= canvas.width-10){
      alert('refresh page, food outside canvas');
    }
    c.fillStyle = "#ff0000";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
}

function animate(){
  c.clearRect(0, 0, innerWidth, innerHeight);
  snake.draw();
  snake.update();
  food.draw();
}

function init(){
  snake = new Snake(0, 0, 10, 10);
  snake.draw();

  food = new Food();
  food.getLocation();
  food.draw();

  setInterval(animate, 50);//refreshes 10 times a second with 100
}

init();
