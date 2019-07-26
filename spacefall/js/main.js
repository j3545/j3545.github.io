let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;
let c = canvas.getContext("2d");


let display = new Display(canvas);
let game = new Game();
let controller = new Controller(canvas);

document.getElementById('start_button').addEventListener('click', ()=>{
    //hide start and show canvas
    document.getElementById('start_screen').style.display = "none";
    canvas.style.display = "block";
    //start game
    init();
});

canvas.addEventListener('mousemove', (evt)=>{
    controller.move(evt.x, evt.y);
});

canvas.addEventListener('touchmove', function(e){
    let x,y;
    x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;    
    controller.move(x, y);
});

canvas.addEventListener('touchstart', function(e){
    let x,y;
    x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
    controller.move(x, y);
});

canvas.addEventListener('click', ()=>{
    console.log(game.enemyArray);
    
});

function init(){
    let interval = setInterval(function(){
    
        display.render(canvas, c, game.color);
        //game objects need to be after display to not be overwritten by background
    
        //idk if i should have a bullet class or put bullet in the game class, maybe subclass?
        game.update(c, controller.mouse, canvas);
    
    
    },1000/60);
}
