/*
TODO add slider on the bottom to change background color and speed of rain
*/
let stopAnimation;
let myAnimation;
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
    c.strokeStyle = "rgb(255, 255, 225)";
    c.lineWidth = 1;
    c.stroke();
    //c.endPath();

  }
  // changes to object over time
  this.update = function() {
    this.draw();
    this.y += this.yspeed;
    if(this.yspeed < 10){
      //console.log('yes');
      this.yspeed += 0.1;
    }


    if (this.y > innerHeight) {
      this.y = getRandomBetweenTwoValues(-100,-1000);
      this.yspeed = getRandomBetweenTwoValues(0.1,1);
    }
  }
}

function reset(){
  stopAnimation = true;
  cancelAnimationFrame(myAnimation);
}


function animate() {
  myAnimation = requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < dropArray.length; i++){
    dropArray[i].update();
  }
}

function init() {
  stopAnimation = false;
  var audio = new Audio('Light-rain-and-thunder-sounds.mp3');
  //audio.play();
  // create droplets
  dropArray = [];
  console.log(dropArray.length);
  for (let i = 0; i < canvas.width/1.2; i++) {
    let length = (Math.random() * 10) + 10;
    let x = (Math.random() * canvas.width);
    let y = Math.random() * -3000 + -length;
    let yspeed = getRandomBetweenTwoValues(0.1,1);
    let z = Math.random * 20;
    dropArray.push(new Drop(x, y, yspeed, length));
  }
  animate();
  //myInterval = setInterval(animate, 20);
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});
