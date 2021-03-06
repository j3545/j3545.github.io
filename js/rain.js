// Set up canvas
let canvas = document.getElementById("rain");
canvas.width = window.innerWidth/1.2;
canvas.height = window.innerHeight/2;
let c = canvas.getContext("2d");
let rainSound = document.getElementById('rainSound');

let mouse = {
  x: 0,
  y: 0
}

let soundOn = false;

canvas.addEventListener('mousemove', function(e){
  // mouse.x = e.x - canvas.getBoundingClientRect().left;
  // mouse.y = e.y - canvas.getBoundingClientRect().top;
  // mouse.ax = mouse.x;
  // mouse.ay = mouse.y;
  // mouse.x -= canvas.width/2;
  // mouse.x = mouse.x/80;
  // soundOn = true;
});

canvas.addEventListener('touchmove', function(e){
  // mouse.x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
	// mouse.y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
  // mouse.ax = mouse.x;
  // mouse.ay = mouse.y;
  // mouse.x -= canvas.width/2;
  // mouse.x = mouse.x/80;
  // soundOn = true;
});

window.addEventListener('load', function(){
  reset();
});


window.addEventListener('resize', function(){
  canvas.width = window.innerWidth/1.2;
  canvas.height = window.innerHeight/2;
});

function reset(){

  init();

}

// droplet object
function Drop(x, y, yspeed, length, direction, color){
  this.x = x;
  this.y = y;
  this.width = 3;
  this.yspeed = yspeed;
  this.xspeed = 0;
  this.length = length;
  this.direction = direction;
  this.color  = "rgb(0,0,0)";
  this.colors = [0, 0, color];
  this.shift = 1;
  
  this.draw = function(){
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x + mouse.x, this.y + this.length);
    c.strokeStyle = this.color;
    c.lineWidth = this.width;
    c.stroke();
  }
  // changes to object over time
  this.update = function(){
    this.draw();
    this.y += this.yspeed;
    //increment color
    this.colors[2] += this.shift;
    if(this.colors[2] >  255 || this.colors[2] < 20){
      this.shift *= -1;
    }
      
  
    this.color = "rgb(" + this.colors[0] + "," + this.colors[1] + "," + this.colors[2] + ")";      
    
    this.yspeed = this.yspeed + 0.1;
    this.yspeed += (mouse.y/500);
    
    if(this.x < canvas.width && this.x > 0){
      this.x += mouse.x;
    }
    
    //okay so we need to have things explode when the tip of the drop hits the ground, which should be this conditional
    if(this.y + this.length + this.yspeed > canvas.height){
      //this.color = "rgb(0, 43, 226)";
    }
    
    //if the drop is past the ground reset
    if(this.y > canvas.height){
      //reset color
      //this.color = "rgb(138, 43, 226)";
      this.y = Math.random() * -1000;
      this.yspeed = (Math.random() * 6) + 4;
      this.x = (Math.random() * canvas.width);
      this.xspeed = 0;      
    }
    
  }
}

function createCircleForMouse(mouse){
  c.beginPath();
  c.arc(mouse.ax, mouse.ay, 30, 0, 2 * Math.PI);
  c.strokeStyle = "rgb(255,255,255)";
  c.lineWidth = 1;
  c.stroke();
}

function perc2color(perc) {
	let r = 255;
  let g = 255;
  let b = 255;    
	r = Math.round(r * perc);
  g = Math.round(g * perc);
  b = Math.round(b * perc*2);
  if(b > 255){
    b = 255;
  }  
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function animate(){  
  c.clearRect(0, 0, innerWidth, innerHeight);
  let random = (Math.random() * 16777215);
  let temp = Math.floor((mouse.y/canvas.height)*100);
  //console.log("temp", temp);
  let color = '#' + Math.floor(random).toString(16);
  //console.log("perc2color", perc2color(temp));

  
  document.getElementById("rain").style.backgroundColor = perc2color(temp/400);
  for (var i = 0; i < dropArray.length; i++) {
    dropArray[i].update();
  }
  //createCircleForMouse(mouse);
  requestAnimationFrame(animate);
}

function init(){
  // create droplets
  dropArray = [];
  for(var i =0; i < innerWidth/1.2; i++){ 
    var x = (Math.random() * canvas.width) - mouse.x;
    var y = Math.random() * -3000;
    var yspeed = (Math.random() * 2) + 4;
    var length = (Math.random() * 10) + 30;
    var z = Math.random * 20;  
    let rand =  (Math.random() * 255) + 20;
    
    var direction = dropArray.push(new Drop(x, y, yspeed, length, direction, rand));
    
  }
  //interval = setInterval(animate, 20);
  requestAnimationFrame(animate);
}

init();


