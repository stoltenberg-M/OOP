let x=100,y=100;
let F1,Sark1;
let xS=400,yS=400,speed,distance,d1,d2;
let Water_grass = [];

function setup(){
createCanvas(1675,800);
background(220);
F1 = new myFish(x, y)
Sark1 = new shark(xS, yS);

for (let i = 0; i < width; i += 10){
    Water_grass.push(new Water_weed(i, 800));
}
}

class myFish{
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

class Water_weed{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.targetAngle = 0;
    }
    update() {
        let fishDist = dist(this.x, this.y, F1.x, F1.y);
        let sharkDist = dist(this.x, this.y, Sark1.x, Sark1.y);

        if (fishDist < 60 || sharkDist < 80) {
            let closestX = (fishDist < sharkDist) ? x : xS;
            this.targetAngle = map(this.x - closestX, -50, 50, -PI / 4, PI / 4);
        } else {
            this.targetAngle = 0;
        }

    this.angle = lerp(this.angle, this.targetAngle, 0.1);

    }
    show() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        stroke("green");
        strokeWeight(5);
        line(0, 0, 0, -50);
        pop();
    }
}

function draw(){
    background(220);
    Fish_move();
    allFish_go();
   
    for (let i of Water_grass) {
        i.update();
        i.show();
    }
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
  speed = 5


  if (distance > 1) {
    xS += (d1/distance)*speed;
    yS += (d2/distance)*speed;
  }
}

function allFish_go() {
    F1.x = x; F1.y = y;
        F1.show("red")
    Sark1.x = xS; Sark1.y = yS;
        Sark1.show("blue")
}