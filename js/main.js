let canvas = document.getElementById("particles");
console.log(canvas);

canvas = document.getElementsByClassName("particles");
console.log(canvas);

for(let i =0; i < canvas.length; i++){

    let c = canvas[i].getContext("2d");
    let squareArray;
    let CLICKED = false;
    let player;
    let brick;
    let mouse = {
    x:0,
    y:0
    };
    let mousecircle;

    let parent = document.getElementsByClassName("canvas");
    console.log(parent);
    
    canvas[i].width = parent[0].offsetWidth;
    canvas[i].height = parent[0].offsetHeight;




    function Circle(x,y){
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.dx = 5;
    this.dy = 3;
    this.height = 20;
    this.width = 20;
    this.color = {
        a: '0',
        b: '0',
        c: '0'
    }
    this.style;
    this.yspeed = 1;
    this.opacity = 0.4;

    this.draw = function(){
        c.beginPath();

        c.rect(this.x, this.y, 20,20);
        c.strokeStyle = "green";
        c.stroke();
    }

    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.x + this.width >= canvas[i].width || this.x < 0){
        this.dx *= -1;
        }
        if(this.y + this.height + this.dy > canvas[i].height || this.y < 0){
        this.dy *= -1;
        }
        this.draw();
    }
    }



    function animate(){
    c.clearRect(0, 0, canvas[i].width, canvas[i].height);
    for(let i = 0; i < squareArray.length; i++){
        squareArray[i].update();
    }
    }

    function init(){
    squareArray = [];
    let radius = 10;
    for(let i = 0; i < 3; i++){
        let x = 0;
        let y = 0;
        squareArray[i] = new Circle(x, y);
    }
    setInterval(animate, 100);
    };

    init();


}
