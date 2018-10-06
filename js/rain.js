/*
TODO add slider on the bottom to change background color and speed of rain
*/
let stopAnimation;
// Set up canvas
var canvas = document.getElementById("rain");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //clearInterval(myInterval);
  reset();
  init();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
}

// droplet object
function Drop(x, y, yspeed, length) {
  this.x = x;
  this.y = y;
  this.yspeed = yspeed;
  this.length = length;

  this.draw = function() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x, this.y + this.length);
    c.strokeStyle = "rgb(138, 43, 226)";
    c.lineWidth = 1;
    c.stroke();
    //c.endPath();

  }
  // changes to object over time
  this.update = function() {
    this.draw();
    this.y = this.y + this.yspeed;
    this.yspeed = this.yspeed + 0.1;

    if (this.y > innerHeight) {
      this.y = Math.random() * -1000;
      this.yspeed = (Math.random() * 6) + 4;
    }
  }
}

function reset(){
  stopAnimation = true;
}

function animate() {
  if(!stopAnimation){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < dropArray.length; i++) {
      dropArray[i].update();
    }
  }
}

function init() {
  stopAnimation = false;
  var audio = new Audio('Light-rain-and-thunder-sounds.mp3');
  //audio.play();
  // create droplets
  dropArray = [];
  for (var i = 0; i < innerWidth / 1.2; i++) {
    var x = (Math.random() * canvas.width);
    var y = Math.random() * -3000;
    var yspeed = (Math.random() * 2) + 4;
    var length = (Math.random() * 10) + 10;
    var z = Math.random * 20;
    dropArray.push(new Drop(x, y, yspeed, length));
  }
  animate();
  //myInterval = setInterval(animate, 20);
}

init();
