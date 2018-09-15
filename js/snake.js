// Set up canvas
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;
var c = canvas.getContext("2d");

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth/2;
  canvas.height = window.innerHeight/2;
});

document.getElementById("reset").addEventListener('click', function(){
  reset();
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
  }else if(key == 82){//left
    reset();
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
  //create 3 squares for start snake
  this.body = [];
  this.body.push([30, 10]);
  this.body.push([10, 10]);
  this.body.push([20, 10]);
  this.len = 3;

  //draw each square
  this.drawSection = function(posx, posy){
    c.strokeStyle = "#00ff00";
    c.strokeRect(posx, posy, this.width, this.height); // shortcat to stroke rectangular
    c.fillRect(posx, posy, this.width, this.height);
  }

  //draw the whole snek
  this.draw = function(){
    c.fillStyle = "#000";
    for(var i = 0; i < this.len; i++){
      this.drawSection(this.body[i][0], this.body[i][1]);
    }
  }

  this.endGame = function(){
    //check the head vs the other squares
    var x = this.body[this.body.length-1][0];
    var y = this.body[this.body.length-1][1];
    var part = '';
    for(var i = 0; i < this.body.length-1; i++){
      part = this.body[i];
      if(part[0] == x && part[1] == y){
        return true;
      }
    }
    return false;

  }

  this.grow = function(){
    var head = this.body.slice(this.body.length-1, this.body.length);
    this.body.push(head);
    this.len++;
  }

  // changes to object over time
  this.update = function(){
    var nextPosition = this.body[0].slice(); //copy head of snake
    nextPosition[0] += this.dx; //add to the x position
    nextPosition[1] += this.dy; //add to the x position

    //add the new position to the beginning of the array
    this.body.unshift(nextPosition);
    //and remove the last position
    this.body.pop();

    if(this.endGame()){
      clearInterval(myInterval);
      c.font="20px Georgia";
      c.fillText("Game Over, Score: " + this.body.length, 10, 50);
      c.fillText("Press R to restart or press the button", 10, 80);
      document.getElementById("reset").style.display = "inline";
    }

    if(this.body[0][0] > canvas.width){
      this.body[0][0] = 0;
    }
    if(this.body[0][0] + this.width < 0){
      var side = canvas.width;
      side = side/10;
      side = Math.floor(side);
      side = side*10;
      this.body[0][0] = side;
    }
    if(this.body[0][1] > canvas.height){
      this.body[0][1] = 0;
    }
    if(this.body[0][1] < 0){
      var top = canvas.height;
      top = top/10;
      top = Math.floor(top);
      top = top*10;
      this.body[0][1] = top;
    }
    //check if the food was eaten
    if(this.body[0][0] == food.x && this.body[0][1] == food.y){
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

//game start
function init(){
  //hide button
  document.getElementById("reset").style.display = "none";

  snake = new Snake(0, 0, 10, 10);
  snake.draw();
  console.log(snake.speed);

  food = new Food();
  food.getLocation();
  food.draw();
  myInterval = setInterval(animate, 50);//refreshes 10 times a second with 100
}

function reset(){
  clearInterval(myInterval);
  init();
}

init();
