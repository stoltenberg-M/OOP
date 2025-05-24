let x=100,y=100;
let F1,Sark1;
let xS=400,yS=400,speed,distance,d1,d2;

function setup(){
createCanvas(1675,800);
background(220);
F1 = new Fish(x, y)
Sark1 = new shark(xS, yS);
}

class Fish{
    constructor(x,y){
        this.x=x 
        this.y=y 
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
class shark{
    constructor(x,y){
        this.x=x 
        this.y=y 
    } 
    show(col){
        fill(col)
        ellipse(this.x, this.y, 40, 40)
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x - 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x, this.y + 6, 15, 5); // food hold
    }
}

function draw(){
    background(220);
    Fish_move();

    F1.x = x; F1.y = y;
        F1.show("red")
    Sark1.x = xS; Sark1.y = yS;
        Sark1.show("blue")
}

function Fish_move() {
  if (keyIsDown(65) && x > 15) {
    x -= 5;
  }

  if (x >= 1675) {
    x;
  }
  if (keyIsDown(68) && x < 1660) {
    x += 5;
  }
  
  if (keyIsDown(87) && y > 15) {
    y -= 5;
  }

  if (keyIsDown(83) && y < 785) {
    y += 5;
  }

//shark
  d1 = x - xS; d2 = y - yS;
  distance = dist(x,y,xS,yS);
  speed = 3


  if (distance > 1) {
    xS += (d1/distance)*speed;
    yS += (d2/distance)*speed;
  }
}

