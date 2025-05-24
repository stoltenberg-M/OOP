let x,y,xk,yk,speed,distance,d1,d2,tR;

function setup() {
    createCanvas(512, 512);
    x = random(512); y = random(512)
    xk = random(512); yk = random(512)
    tR = color(299,20,180);
}
function draw() {
  background(tR)
  ellipse(x, y, 10,20)
  ellipse(xk, yk, 20,10)
  //move mus
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

  //move kat
  d1 = x - xk; d2 = y - yk;
  distance = dist(x,y,xk,yk);
  speed = 3


  if (distance > 1) {
    xk += (d1/distance)*speed;
    yk += (d2/distance)*speed;
  }

  //død
  if (dist(x,y,xk,yk)<10) {
    tR = color(random(255), random(255), random(255));
  }
}
/*AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*/
let x1, y1;
let xS1, yS1;
let tR1;


function setup() {
  createCanvas(750, 500);
  x1 = 20;
  y1 = 250;
  xS1 = 6.5;
  yS1 = 0.5 * xS1;
  tR = color(255, 100, 50);
}

function draw() {
  background(tR1);
  y1 += yS1;
  x1 += xS1;

  fill(255, 0, 0);
  circle(x1, y1, 30);
  if (y1 > height-15 || y1 < 15) {
    yS1 = -yS1;
  }
  if (x1 > width-15 || x1 < 15) {
    xS1 = -xS1;
}
}
