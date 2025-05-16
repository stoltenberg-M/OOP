let fish_oil = [];
let t = 0; 
let run = true;

function setup(){
createCanvas(1675,800);
background(220);

}

class Fish{
    constructor(x,y){
        this.x=x || 0
        this.y=y || 0
    } 
    show(col){
        fill(col)
        ellipse(this.x, this.y, 20, 20)

    }
}

let currentFishPosition = {x: 0, y: 0};

function draw(){
    if(run){
        tid();
        if (fish_oil.length > 1) {
            currentFishPosition = fishLerp(fish_oil, t);
        }
        fishMan(fishLerpFind);
        
    }
}

function tid(){
    if(run === true){
        t += 0.005;
    }
}

function fishLerpFind() {
      if (mouseButton === LEFT) {
        if (fish_oil.length < 3) {
            fish_oil.push({x: random(1675), y: random(800)});
        } else {
            fish_oil[0] = fish_oil[2];  
            fish_oil[1] = {x: random(1675), y: random(800)}; 
            fish_oil.splice(2,1); 
        }
        t = 0;
        console.log(fish_oil);
    }
}
    
function fishLerp(fish_oil, t){
    if (fish_oil.length == 1) {
        return fish_oil[0];
    }
    let newFish = [];
    for (let i = 0; i < fish_oil.length - 1; i++) {
    let xFish = lerp(fish_oil[i].x, fish_oil[i + 1].x, t);
    let yFish = lerp(fish_oil[i].y, fish_oil[i + 1].y, t);
    newFish.push({xFish, yFish});
    }  
    return newFish[newFish.length - 1];

}
function fishMan(position) {
    if (position) {
    let f1 = new Fish(position.x, position.y)
    f1.show("red")
    }
    
}