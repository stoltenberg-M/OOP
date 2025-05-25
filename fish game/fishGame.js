// Declare global variables
let saeImage; // Background image
let allFish = []; // Array to store all fish
let shark; // Shark object
let xS = 400, yS = 400; // Initial shark position
let sharkAngle = 0; // Direction the shark is moving
let sharkNoiseOffset = 1000; // Helps randomize shark movement
let sharkMode = "patrol"; // Shark behavior: patrol, chase, ignore
let sharkTimer = 0; // Tracks when shark switches modes
let Water_grass = []; // Array to store grass objects

function preload() {
    saeImage = loadImage("sae baed.png"); // Load background image
}

function setup() {
    createCanvas(1675, 800);
    background(saeImage); // Set background image

    allFish.push(new MyFish(100, 100)); // Create the player-controlled fish

    // Generate 5 AI fish at random positions
    for (let i = 0; i < 5; i++) {
        allFish.push(new AIFish(random(200, 1600), random(100, 700), i * 300));
    }

    shark = new Shark(xS, yS); // Create the shark

    // Create grass objects along the bottom
    for (let i = 0; i < width; i += 10) {
        Water_grass.push(new WaterWeed(i, 800));
    }
}

// Base fish class
class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show(col = "red") {
        fill(col);
        ellipse(this.x, this.y, 30, 30); // Body
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x - 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x, this.y + 6, 15, 5); // Mouth
    }

    move() {
        // This function will be overwritten in subclasses
    }
}

// Player-controlled fish class
class MyFish extends Fish {
    constructor(x, y) {
        super(x, y);
        this.angle = 0;
        this.noiseOffset = 0; // Helps randomize movement
    }

    move() {
        this.noiseOffset += 0.01;
        let angleChange = map(noise(this.noiseOffset), 0, 1, -0.1, 0.1); // Slightly adjusts direction
        this.angle += angleChange;

        // Move the fish in the current direction
        this.x += cos(this.angle) * 2.5;
        this.y += sin(this.angle) * 2.5;

        // Bounce off screen edges
        if (this.x < 15 || this.x > width - 15) this.angle = PI - this.angle;
        if (this.y < 15 || this.y > height - 15) this.angle = -this.angle;
    }

    show() {
        super.show("red"); // Display in red
    }
}

// AI-controlled fish with random movement
class AIFish extends Fish {
    constructor(x, y, noiseOffset) {
        super(x, y);
        this.noiseOffset = noiseOffset;
        this.angle = random(TWO_PI); // Start with a random direction
    }

    move() {
        this.noiseOffset += 0.01;
        let angleChange = map(noise(this.noiseOffset), 0, 1, -0.1, 0.1); // Randomly adjust direction
        this.angle += angleChange;

        // Move based on angle
        this.x += cos(this.angle) * 2;
        this.y += sin(this.angle) * 2;

        // Bounce off screen edges
        if (this.x < 15 || this.x > width - 15) this.angle = PI - this.angle;
        if (this.y < 15 || this.y > height - 15) this.angle = -this.angle;
    }

    show() {
        super.show("orange"); // Display in orange
    }
}

// Shark class with AI behavior
class Shark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill("blue");
        ellipse(this.x, this.y, 40, 40); // Shark body
        fill(0);
        ellipse(this.x + 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x - 10, this.y - 5, 5, 5); // Eye
        ellipse(this.x, this.y + 6, 15, 5); // Mouth
    }

    move(targetX, targetY) {
        let detectionRange = 150; // Distance at which shark will chase fish
        let now = millis(); // Get current time

        // Switch shark mode based on time and proximity to fish
        if (sharkMode === "patrol" && dist(targetX, targetY, this.x, this.y) < detectionRange) {
            sharkMode = "chase";
            sharkTimer = now;
        } else if (sharkMode === "chase" && now - sharkTimer > 5000) {
            sharkMode = "ignore"; // Stops chasing after 5 seconds
            sharkTimer = now;
        } else if (sharkMode === "ignore" && now - sharkTimer > 5000) {
            sharkMode = "patrol"; // Returns to normal patrol
        }

        // Shark movement logic
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
                this.x += (dx / distToTarget) * 3.5; // Move towards fish
                this.y += (dy / distToTarget) * 3.5;
            }
        }

        // Constrain shark position within canvas
        this.x = constrain(this.x, 15, width - 15);
        this.y = constrain(this.y, 15, height - 15);
    }
}

// Water grass class that reacts to fish and shark movement
class WaterWeed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.targetAngle = 0;
    }

    update(fishes, sharkX, sharkY) {
        let closestFish = null;
        let minDist = Infinity;

        // Find closest fish
        for (let fish of fishes) {
            let d = dist(this.x, this.y, fish.x, fish.y);
            if (d < minDist) {
                minDist = d;
                closestFish = fish;
            }
        }

        let sharkDist = dist(this.x, this.y, sharkX, sharkY);

        // Adjust grass bending based on proximity
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
        line(0, 0, 0, -40); // Grass blade
        pop();
    }
}

// Main draw loop
function draw() {
    background(saeImage);

    for (let fish of allFish) {
        fish.move();
        fish.show();
    }

    let targetFish = allFish[0]; // Controlled fish
    shark.move(targetFish.x, targetFish.y);
    shark.show();

    for (let weed of Water_grass) {
        weed.update(allFish, shark.x, shark.y);
        weed.show();
    }
}