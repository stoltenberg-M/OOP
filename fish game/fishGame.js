let saeImage;
let allFish = [];
let shark;
let xS = 400, yS = 400;
let sharkAngle = 0;
let sharkNoiseOffset = 1000;
let sharkMode = "patrol";
let sharkTimer = 0;

let Water_grass = [];

function preload() {
    saeImage = loadImage("sae baed.png"); 
}

function setup() {
    createCanvas(1675, 800);
    background(saeImage);

    allFish.push(new MyFish(100, 100)); // styret fisk

    for (let i = 0; i < 5; i++) {
        allFish.push(new AIFish(random(200, 1600), random(100, 700), i * 300));
    }

    shark = new Shark(xS, yS);

    for (let i = 0; i < width; i += 10){
        Water_grass.push(new WaterWeed(i, 800));
    }
}

class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show(col = "red") {
        fill(col);
        ellipse(this.x, this.y, 30, 30);
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5);
        ellipse(this.x - 10, this.y - 5, 5, 5);
        ellipse(this.x, this.y + 6, 15, 5);
    }

    move() {
        // Skal overskrives af subklasser
    }
}

class MyFish extends Fish {
    constructor(x, y) {
        super(x, y);
        this.angle = 0;
        this.noiseOffset = 0;
    }

    move() {
        this.noiseOffset += 0.01;
        let angleChange = map(noise(this.noiseOffset), 0, 1, -0.1, 0.1);
        this.angle += angleChange;

        this.x += cos(this.angle) * 2.5;
        this.y += sin(this.angle) * 2.5;

        if (this.x < 15 || this.x > width - 15) this.angle = PI - this.angle;
        if (this.y < 15 || this.y > height - 15) this.angle = -this.angle;
    }

    show() {
        super.show("red");
    }
}

class AIFish extends Fish {
    constructor(x, y, noiseOffset) {
        super(x, y);
        this.noiseOffset = noiseOffset;
        this.angle = random(TWO_PI);
    }

    move() {
        this.noiseOffset += 0.01;
        let angleChange = map(noise(this.noiseOffset), 0, 1, -0.1, 0.1);
        this.angle += angleChange;

        this.x += cos(this.angle) * 2;
        this.y += sin(this.angle) * 2;

        if (this.x < 15 || this.x > width - 15) this.angle = PI - this.angle;
        if (this.y < 15 || this.y > height - 15) this.angle = -this.angle;
    }

    show() {
        super.show("orange");
    }
}

class Shark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill("blue");
        ellipse(this.x, this.y, 40, 40);
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5);
        ellipse(this.x - 10, this.y - 5, 5, 5);
        ellipse(this.x, this.y + 6, 15, 5);
    }

    move(targetX, targetY) {
        let detectionRange = 150;
        let now = millis();

        if (sharkMode === "patrol" && dist(targetX, targetY, this.x, this.y) < detectionRange) {
            sharkMode = "chase";
            sharkTimer = now;
        } else if (sharkMode === "chase" && now - sharkTimer > 5000) {
            sharkMode = "ignore";
            sharkTimer = now;
        } else if (sharkMode === "ignore" && now - sharkTimer > 5000) {
            sharkMode = "patrol";
        }

        if (sharkMode === "patrol") {
            sharkNoiseOffset += 0.008;
            let angleChange = map(noise(sharkNoiseOffset), 0, 1, -0.05, 0.05);
            sharkAngle += angleChange;

            this.x += cos(sharkAngle) * 2;
            this.y += sin(sharkAngle) * 2;
        } else if (sharkMode === "chase") {
            let dx = targetX - this.x;
            let dy = targetY - this.y;
            let distToTarget = dist(targetX, targetY, this.x, this.y);
            if (distToTarget > 1) {
                this.x += (dx / distToTarget) * 3.5;
                this.y += (dy / distToTarget) * 3.5;
            }
        }
    }
}

class WaterWeed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.targetAngle = 0;
    }

    update(fishes, sharkX, sharkY) {
        // Find den nærmeste fisk
        let closestFish = null;
        let minDist = Infinity;
        for (let fish of fishes) {
            let d = dist(this.x, this.y, fish.x, fish.y);
            if (d < minDist) {
                minDist = d;
                closestFish = fish;
            }
        }

        // Find afstand til haj
        let sharkDist = dist(this.x, this.y, sharkX, sharkY);

        // Hvis nærmeste fisk eller haj er tæt på, beregn targetAngle
        if ((closestFish && minDist < 60) || sharkDist < 80) {
            let closestX = (minDist < sharkDist) ? closestFish.x : sharkX;
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

function draw() {
    background(saeImage);

    for (let fish of allFish) {
        fish.move();
        fish.show();
    }

    let targetFish = allFish[0]; // MyFish
    shark.move(targetFish.x, targetFish.y);
    shark.show();

    for (let weed of Water_grass) {
        weed.update(allFish, shark.x, shark.y);  // sender alle fisk til update
        weed.show();
    }
}
