let canvas = document.getElementById("painting  ");
canvas.height = innerHeight/1.3;
canvas.width = innerWidth/1.2;
let c = canvas.getContext("2d");

let isDragging = false;
let mousePositions = [];

let amount = 5;
let circleArray = [];
let gravity = 1;
let whichArray = 1;
let colorArray1 = [
  '#EAD1CC',
  '#F0A7C2',
  '#D90866',
  '#43415F',
  '#4E3940'
];

let colorArray2 = [
  '#FF8A80',
  '#FF80AB',
  '#EA80FC',
  '#8C9EFF',
  '#FFFF8D'
];

let colorArray3 = [
  '#D50000',
  '#B71C1C',
  '#E53935',
  '#DD2C00',
  '#FF5722'
];

let colorArray = colorArray2;

let mouse = {
  x: 10,
  y: 10
}

let radius = Math.ceil(((Math.random() * 1)+15));  
let x = canvas.width/2;
let y = canvas.height/2;
let dx = (Math.random() - 0.5);
let dy = (Math.random() - 0.5);
let temp = new Circle(x, y, dx, dy, radius*3, 1);

window.addEventListener('resize', function(){
	reset();
});

canvas.addEventListener('mousedown', function(){
	isDragging = true;
});

//everytime the mouse is moving in the canvas
let test = 0;
canvas.addEventListener('mousemove', function(e){
  mouse.x = e.x - canvas.getBoundingClientRect().left;
  mouse.y = e.y - canvas.getBoundingClientRect().top;
	test = createCircle(true, mouse.x, mouse.y);	
  test.draw();
});

window.addEventListener('keydown', function(e){
  if(e.key == 'r'){
    amount = 5;
    reset();
  }
});

window.addEventListener('touchmove', function(e){
  mouse.x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
	mouse.y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;

	test = createCircle(true, mouse.x, mouse.y);	
  test.draw();
});

document.getElementById("reset").onclick = function(){
  amount = 5;
  reset();
}

document.getElementById("color_change").onclick = function(){
  if(colorArray == colorArray1){
    colorArray = colorArray2;
  }else if(colorArray == colorArray2){
    colorArray = colorArray3;
  }else{
    colorArray = colorArray1;
  }
}


function getRandomBetweenTwoValues(min, max){
  let random  = Math.random() * (max-min) + min;
  return random;
}

function getDistance(x1, y1, x2, y2){
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/*
index: this circle in the circleArray
*/
function Circle(x, y, dx, dy, radius, colorIndex, index){
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.radius = radius*5;
  this.color = colorIndex;
  this.mass = this.radius;
	this.index = index;
  
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = colorArray[this.color];
    c.fill();
	}
}

function createCircle(atMouse, mouseX, mouseY){
  let x, y, temp;
  let radius = getRandomBetweenTwoValues(1, 2);
  let dx = getRandomBetweenTwoValues(-4, 4);
  let dy = getRandomBetweenTwoValues(-4, 4);
  if(circleArray > 4){
		if(false && circleArray[circleArray.length-1].x < circleArray[circleArray.length-2].x){
			let avg = circleArray[circleArray.length-1].x + circleArray[circleArray.length-2].x/2;
			temp = new Circle(avg, y, dx, dy, radius, Math.floor(Math.random() * colorArray.length), circleArray.length);
	
			document.getElementById('count').value = circleArray.length;
			circleArray.push(temp);
		}		 
	}
  x = mouseX;
  y = mouseY;
  
  
	temp = new Circle(x, y, dx, dy, radius, Math.floor(Math.random() * colorArray.length), circleArray.length);
	
	document.getElementById('count').value = circleArray.length;
	circleArray.push(temp);
	return temp;
}

function reset(){
  circleArray = [];
  canvas.height = innerHeight/1.2;
  canvas.width = innerWidth/1.2;
  clearInterval(myInterval);
  init();
}

function animate(){
  //c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillStyle = "White";
  c.font = "bold 16px Arial";
  c.fillText('press r to clear', (canvas.width / 2) - 130, (canvas.height / 2) + 8);  
}

function init(){
  myInterval = setInterval(animate, 10);
  for(let i = 0; i < amount; i++){
    createCircle(false);
  }
}

init();