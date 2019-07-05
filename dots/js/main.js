let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");


let display = new Display(canvas);
let game = new Game();
let controller = new Controller(canvas);



canvas.addEventListener('mousemove', (e)=>{
    controller.changeMouse(e.x, e.y);
});

canvas.addEventListener('touchmove', function(e){
    let x,y;
    x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;    
    controller.changeMouse(x, y);
});

canvas.addEventListener('touchstart', function(e){
    let x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    let y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
    controller.changeMouse(x, y);
    game.mouseDown(controller.mouse);
});

canvas.addEventListener('touchend', function(e){
    let x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
    let y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
    controller.changeMouse(x, y);
    game.mouseUp(controller.mouse);
});

window.addEventListener('resize', (e)=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.reset();
});

window.addEventListener('mousedown', (e)=>{
    controller.changeMouse(e.x, e.y);
    //check if hit a dot
    game.mouseDown(controller.mouse);
});

window.addEventListener('mouseup', (e)=>{
    controller.changeMouse(e.x, e.y);
    //check if hit a dot
    game.mouseUp(controller.mouse);
});

document.getElementById('type').addEventListener('click', (e)=>{
    
    
    //if its already naming
    if(document.getElementById('type').innerHTML == 'Naming'){
        game.naming = false;
        document.getElementById('type').innerHTML = 'Playing';
    }else{
        game.naming = true;
        document.getElementById('type').innerHTML = 'Naming';
    }
    
});


/**
 * Setup game loop
 */
let interval = setInterval(function(){
    
    display.render(canvas, c, game.color);
    //game objects need to be after display to not be overwritten by background

    game.update(c, controller.mouse);


},1000/60);

