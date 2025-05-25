let x = 100, y = 100;
let F1, Sark1;
let xS = 400, yS = 400;
let Water_grass = [];
let saeImage;

let fishAngle = 0;
let fishNoiseOffset = 0;

let sharkAngle = 0;
let sharkNoiseOffset = 1000;
let sharkMode = "patrol";
let sharkTimer = 0;

function preload() {
    saeImage = loadImage("sae baed.png"); 
}

function setup(){
    createCanvas(1675, 800);
    background(saeImage);
    F1 = new myFish(x, y);
    Sark1 = new shark(xS, yS);

    for (let i = 0; i < width; i += 10){
        Water_grass.push(new Water_weed(i, 800));
    }
}

class myFish {
    constructor(x, y){
        this.x = x;
        this.y = y;
    } 
    show(col){
        fill(col);
        ellipse(this.x, this.y, 30, 30);
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5);
        ellipse(this.x - 10, this.y - 5, 5, 5);
        ellipse(this.x, this.y + 6, 15, 5);
    }
}

class shark {
    constructor(x, y){
        this.x = x;
        this.y = y;
    } 
    show(col){
        fill(col);
        ellipse(this.x, this.y, 40, 40);
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5);
        ellipse(this.x - 10, this.y - 5, 5, 5);
        ellipse(this.x, this.y + 6, 15, 5);
    }
}

class Water_weed {
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
            let closestX = (fishDist < sharkDist) ? F1.x : Sark1.x;
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
        strokeWeight(3);
        line(0, 0, 0, -40);
        pop();
    }
}

function draw(){
    background(saeImage); 
    Fish_move();
    Shark_move();
    allFish_go();

    for (let i of Water_grass) {
        i.update();
        i.show();
    }
}

function Fish_move() {
    fishNoiseOffset += 0.01;
    let angleChange = map(noise(fishNoiseOffset), 0, 1, -0.1, 0.1);
    fishAngle += angleChange;

    let stepSize = 2.5;
    x += cos(fishAngle) * stepSize;
    y += sin(fishAngle) * stepSize;

    if (x < 15 || x > width - 15) {
        fishAngle = PI - fishAngle;
    }
    if (y < 15 || y > height - 15) {
        fishAngle = -fishAngle;
    }
}

function Shark_move() {
    let detectionRange = 150;
    let now = millis();

    // Handle state transitions
    if (sharkMode === "patrol" && dist(x, y, xS, yS) < detectionRange) {
        sharkMode = "chase";
        sharkTimer = now;
    } else if (sharkMode === "chase" && now - sharkTimer > 5000) {
        sharkMode = "ignore";
        sharkTimer = now;
    } else if (sharkMode === "ignore" && now - sharkTimer > 5000) {
        sharkMode = "patrol";
    }

    if (sharkMode === "patrol") {
        // Natural patrol movement
        sharkNoiseOffset += 0.008;
        let angleChange = map(noise(sharkNoiseOffset), 0, 1, -0.05, 0.05);
        sharkAngle += angleChange;

        let stepSize = 2;
        xS += cos(sharkAngle) * stepSize;
        yS += sin(sharkAngle) * stepSize;

        if (xS < 15 || xS > width - 15) {
            sharkAngle = PI - sharkAngle;
        }
        if (yS < 15 || yS > height - 15) {
            sharkAngle = -sharkAngle;
        }
    }

    if (sharkMode === "chase") {
        let d1 = x - xS;
        let d2 = y - yS;
        let distance = dist(x, y, xS, yS);
        let speed = 3.5;

        if (distance > 1) {
            xS += (d1 / distance) * speed;
            yS += (d2 / distance) * speed;
        }
    }
}

function allFish_go() {
    F1.x = x;
    F1.y = y;
    F1.show("red");

    Sark1.x = xS;
    Sark1.y = yS;
    Sark1.show("blue");
}
