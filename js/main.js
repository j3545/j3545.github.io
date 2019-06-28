let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;
let c = canvas.getContext("2d");


let display = new Display(canvas);

let player = new Player(10,10,20);//x,y,length
let game = new Game();
let controller = new Controller(canvas);

canvas.addEventListener('mousemove', (evt)=>{
    controller.move(evt.x, evt.y);
});

canvas.addEventListener('touchmove', function(e){
    let x,y;
    x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
    controller.mouseMove(x, y);
});



let interval = setInterval(function(){
    
    display.render(canvas, c, game.color);
    //game objects need to be after display to not be overwritten by background
    game.update(player, c, controller.mouse);


},1000/60);

