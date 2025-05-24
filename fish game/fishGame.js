let x;
let y;

function setup(){
createCanvas(1675,800);
background(220);

}

class Fish{
    constructor(x,y){
        this.x=x || 100
        this.y=y || 100
    } 
    show(col){
        fill(col)
        ellipse(this.x, this.y, 30, 30)
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x - 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x, this.y + 6, 15, 5); // food hold
    }
}


function draw(){
    youFish_move();
    fishMan();
}

function youFish_move() {
    if (x <= 1) {
    x;
  }
  else if (keyIsDown(65)) {
    x -= 5;
  }

  if (x >= 510) {
    x;
  }
  else if (keyIsDown(68)) {
    x += 5;
  }
  
  if (y <= 1) {
    y;
  }
  else if (keyIsDown(87)) {
    y -= 5;
  }
  if (y >= 510) {
    y;
  }
  else if (keyIsDown(83)) {
    y += 5;
  }
}

function fishMan() {
    let f1 = new Fish(x, y)
    f1.show("red")
    console.log(x,y);
}