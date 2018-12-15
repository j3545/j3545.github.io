let circleCanvas = document.getElementById("circles");
circleCanvas.width = window.innerWidth;
let circleCtx = circleCanvas.getContext("2d");

let circleArray = [];
let gravity = 1;
let colorArray = [
  '#EAD1CC',
  '#F0A7C2',
  '#D90866',
  '#43415F',
  '#4E3940'
];

window.addEventListener('resize', function(){
  circleCanvas.width = window.innerWidth;
  clearInterval(myInterval);
  clear();
  init();
});

window.addEventListener('mousedown', function(){
  createCircle();
});

window.addEventListener('mousemove', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('keydown', function(e){
  if(e.key == 'r'){
    clear();
  }
});

window.addEventListener('touchstart', function(e){
  createCircle();
});

function Circle(x, y, dx, dy, radius, color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function(){
    circleCtx.beginPath()
    circleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    circleCtx.fillStyle = this.color;
    circleCtx.fill();
  }

  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x + this.radius + this.dx > circleCanvas.width || this.x + this.dx - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius + this.dy > circleCanvas.height || (this.y + this.dy) - this.radius < 0){
      this.dy = -this.dy;
    }else{
      this.dy += .5;
    }
    this.draw();
  }
}

function createCircle(){
  let radius = Math.ceil(((Math.random() * 10)+10));
  let x = mouse.x;
  let y = mouse.y;
  let dx = (Math.random() - 0.5) * 20;
  let dy = (Math.random() - 0.5) * 20;
  circleArray.push(new Circle(x, y, dx, dy, radius, colorArray[Math.floor(Math.random() * colorArray.length)]));
}

function animate(){
  circleCtx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  circleCtx.fillStyle = "White";
  circleCtx.font = "bold 16px Arial";
  circleCtx.fillText('Click to create a circle, press r to clear', (circleCanvas.width / 2) - 130, (circleCanvas.height / 2) + 8);
}

function init(){
  circleArray = [];
  myInterval = setInterval(animate, 10);
  for(let i = 0; i<5; i++){
    createCircle();
  }
}

init();
