class Boid{
    constructor(x,y,radius,vx,vy,color){
        this.position = {
            x: x || randBetw(1,10),
            y: y || randBetw(1,10)
        }

        this.radius = radius || 5;

        this.velocity = {
            x: vx || randBetw(3,6)*randSign(),
            y: vy || randBetw(3,6)*randSign()
        }

        this.acceleration = {
            x:0,
            y:0
        }
        this.color = color;
    }
    

    //https://gamedevelopment.tutsplus.com/tutorials/3-simple-rules-of-flocking-behaviors-alignment-cohesion-and-separation--gamedev-3444
    /**
     * 
     * @param {array} flock array of boids
     * 
     * @returns {vector{x,y}} velocity vector
     */
    align(flock){
        let steer = {
            x:0,
            y:0
        }
        let neighborCount = 0;
        let perceptionRadius = 50;
        for (const other of flock) {
            if(other != this){
                if(distance(this.position, other.position) < perceptionRadius){
                    steer.x += other.velocity.x;
                    steer.y += other.velocity.y;
                    neighborCount++;
                }
            }
        }
        if(neighborCount == 0){
            return steer;
        }
        steer.x /= neighborCount;
        steer.y /= neighborCount;
        steer = normalize(steer, 1);
        return steer;
    }

    cohesion(){
        let steer = {
            x:0,
            y:0
        }
        let neighborCount = 0;
        let perceptionRadius = 100;
        for (const other of flock) {
            if(other != this){
                if(distance(this.position, other.position) < perceptionRadius){
                    steer.x += other.position.x;
                    steer.y += other.position.y;
                    neighborCount++;
                }
            }
        }
        if(neighborCount == 0){
            return steer;
        }
        steer.x /= neighborCount;
        steer.y /= neighborCount;
        let point = {
            x: (steer.x - this.position.x),
            y: (steer.y - this.position.y)
        }
        steer = point;
        steer = normalize(steer, 1);
        return steer;
    }

    separation(){
        let steer = {
            x:0,
            y:0
        }
        let neighborCount = 0;
        let perceptionRadius = 70;
        for (const other of flock) {
            if(other != this){
                if(distance(this.position, other.position) < perceptionRadius){
                    steer.x += other.position.x - this.position.x;
                    steer.y += other.position.y - this.position.y;
                    neighborCount++;
                }
            }
        }
        if(neighborCount == 0){
            return steer;
        }
        steer.x /= neighborCount;
        steer.y /= neighborCount;
        
        steer.x *= -1
        steer.y *= -1

        steer = normalize(steer, 1);
        return steer;
    }

    lookNear(flock, boidCtx){
        let perceptionRadius = 80;

        if(flock[1] == this){
            boidCtx.beginPath();
            boidCtx.fillStyle = "rgb(255, 255, 255, 0.1)"
            boidCtx.arc(this.position.x, this.position.y, perceptionRadius, 0, 2 * Math.PI);
            boidCtx.fill();
        }
        
        for(let other of flock){
            //get distance between this and other
            if(other != this && distance(this.position, other.position) < perceptionRadius){
                boidCtx.beginPath();
                boidCtx.strokeStyle = "white"
                boidCtx.moveTo(this.position.x, this.position.y);
                boidCtx.lineTo(other.position.x, other.position.y);
                boidCtx.stroke();
            }
        }
    }

    steer(force){
        this.acceleration.x += force.x,
        this.acceleration.y += force.y
    }

    edges(worldX, worldY){
        if(this.position.x > worldX){
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = worldX;
        }
        if(this.position.y > worldY){
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = worldY;
        }
    }

    update(flock, mouse){

        let alignment = this.align(flock);
        let cohesion = this.cohesion(flock);
        let separation = this.separation(flock);

        this.velocity.x += alignment.x
        this.velocity.y += alignment.y

        this.velocity.x += cohesion.x
        this.velocity.y += cohesion.y

        this.velocity.x += separation.x
        this.velocity.y += separation.y

        this.velocity = normalize(this.velocity, 7);

        if(mouse.down && distance(this.position, mouse) < 100){
            this.velocity.x -= (mouse.x - this.position.x);
            this.velocity.y -= (mouse.y - this.position.y);
        }

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(boidCtx){
        var angle = Math.atan2(this.velocity.y, this.velocity.x);
        boidCtx.save();
        //rectMode(CENTER);
        boidCtx.translate(this.position.x, this.position.y);
        boidCtx.rotate(angle);
        
        boidCtx.beginPath();
        boidCtx.fillStyle = this.color;
        boidCtx.strokeStyle = this.color;
        //create a triangle
        boidCtx.moveTo(15, 0);
        boidCtx.lineTo(-10, 6);
        boidCtx.lineTo(-10, -6);
        boidCtx.fill();
        boidCtx.restore();
    }
}
//////////////////////////////////////////////////////////////////////////

//canvas stuff

let boidCanvas = document.getElementById('boids');
let parent = boidCanvas.parentElement;
let boidCtx = boidCanvas.getContext('2d');

//setup sizing for canvas
boidCanvas.width = parent.clientWidth
boidCanvas.height = parent.clientHeight*2

//world contraints
let worldX = boidCanvas.width;
let worldY = boidCanvas.height;

//flock array and count of flockSize
let flock = [];
let flockSize = 100;

let mouse = {
    x:100,
    y:100,
    down:false
}

//common functions
function randBetw(min,max){
    return (Math.random() * (max-min) + min);
}
function randSign(){
    return Math.random() < 0.5 ? 1 : -1;
}

/**
 * 
 * @param {x,y} point vector to scale
 * @param {int} scale scalar
 * 
 * https://stackoverflow.com/questions/3592040/javascript-function-that-works-like-actionscripts-normalize1
 */
function normalize(point, scale){
    let vector = { x:0, y:0 };
    let norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if (norm != 0) { // as3 return 0,0 for a point of zero length
        vector.x = scale * point.x / norm;
        vector.y = scale * point.y / norm;
    }
    return vector;
}

function getSign(val){
    let sign = 1;
    if(val < 0){
        sign = -1;
    }
    return sign;
}

//distance between two vectors
function distance(v1,v2){
    let a = v1.x - v2.x;
    let b = v1.y - v2.y;
    return Math.sqrt(a*a + b*b)
}



//setup the objects, called on load, calls animation to start
function setup(){
    for(let i = 0; i < flockSize; i++){
        let color;
        if(i % 3 == 0){
            color = "#3ad94e"
        }else if(i % 2 == 0){
            color = "#0000ff";
        }else{
            color = "#9a00ff";
        }
        let boid = new Boid(randBetw(0,worldX), randBetw(0,worldY), 10, 0, 0 , color);
        flock.push(boid);
    }
    requestAnimationFrame(animate);
}

//animate functions
function update(){
    for(const boid of flock){
        //check if past the edge
        boid.edges(worldX, worldY);
        boid.update(flock, mouse);
    }
}

function draw(){
    let i = 0;
    for (const boid of flock) {
        if(i % 3 == 0){            
            boid.draw(boidCtx, "#FFFFFF");
        }else if(i % 2 == 0){
            boid.draw(boidCtx, "#617bff");
        }else{
            boid.draw(boidCtx, "#9aceff");
        }
        i++;
    }
    for (const boid of flock) {
        //boid.lookNear(flock, boidCtx);
    }
}

function animate(){
    boidCtx.clearRect(0,0,worldX, worldY);
    update();
    draw();    
    requestAnimationFrame(animate);
}



boidCanvas.addEventListener('mousedown', (e)=>{
    mouse.down = true;
});

boidCanvas.addEventListener('mouseup', (e)=>{
    mouse.down = false;
});

boidCanvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


function touchHandler(e) {
    if(e.touches) {
        mouse.x = e.touches[0].pageX - boidCanvas.offsetLeft;
        mouse.y = e.touches[0].pageY - boidCanvas.offsetTop;
        e.preventDefault();
    }
}

document.addEventListener("touchstart", ()=>{
    mouse.down = true;
});

document.addEventListener("touchend", ()=>{
    mouse.down = false;
});

document.addEventListener("touchmove", touchHandler);

boidCanvas.addEventListener('touchstart', (e)=>{
    mouse.down = true;
});

boidCanvas.addEventListener('mouseup', (e)=>{
    mouse.down = false;
});

boidCanvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX - boidCanvas.offsetLeft;
    mouse.y = e.clientY - boidCanvas.offsetTop;
})

setup();
