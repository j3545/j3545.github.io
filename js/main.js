let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;
let c = canvas.getContext("2d");

let display = new Display(canvas);
console.log(display);

display.render();