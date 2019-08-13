
class Game {
  constructor() {
      this.color  = "rgb(0,0,0)";
      this.colors = [0, 0, 0];
      this.shifts = [0, 0, 0];
      this.player = new Player(10,10,20);//x,y,length
      this.enemyArray = [];
  }

  createEnemies(n){
    for(let i = 0; i<n; i++){
      let length = 50;
      let x = Math.floor((Math.random() * (canvas.width-70-50+1) + 0));
      let y = Math.floor((Math.random() * -2000) + 0);
      this.enemyArray.push(new Enemy(x,y,length));
    }
  }

  update(ctx, mouse, canvas) {
    //update color and position
    this.player.update(ctx, this.color);
    this.player.move(mouse.x, mouse.y);

    let enemyHit = new Audio("explosion.mp3");
    let playerHit = new Audio("playerhit.mp3");

    if(this.enemyArray.length < 1){
      this.createEnemies(this.player.score/3+5);
    }
    for(let i = 0; i<this.enemyArray.length; i++){
      if(this.enemyArray[i].y > canvas.height || this.enemyArray[i].delete){
        this.enemyArray.splice(i, 1);
      }else if(this.enemyArray[i].update){
        this.enemyArray[i].update();
        //hit enemy if true
        let index = this.enemyArray[i].checkCollision(this.player.getBulletArray());
        if(index){
          //destroy bullet
          this.player.bulletArray.splice(this.player.bulletArray.indexOf(index), 1);
          this.player.score++;
          enemyHit.play();
        }
        index = this.player.checkCollision(this.enemyArray[i].getBulletArray());
        if(index){
          //destroy bullet
          this.enemyArray[i].bulletArray.splice(this.player.bulletArray.indexOf(index), 1);
          playerHit.play();
          
        }
      }
    }        
    for (let index = 0; index < 3; index ++) {
        let color = this.colors[index];
        let shift = this.shifts[index];        
        if (color + shift > 255 || color + shift <= 0) {
          shift = (shift < 0) ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * -5) - 1;
        }
        color += shift;        
        this.colors[index] = color;
        this.shifts[index] = shift;
        // change position
    }      
    this.color = "rgb(" + this.colors[0] + "," + this.colors[1] + "," + this.colors[2] + ")";      
  }
}


