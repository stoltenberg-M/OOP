let fish_oil = [];
let t = 0; 
let run = true;

function setup(){
createCanvas(1675,800);
background(220);

}

class Fish{
    constructor(x,y){
        this.x=x
        this.y=y
    } 
    show(col){
        fill(col)
        ellipse(this.x, this.y, 20, 20)

    }
}



function draw(){
    if(run){
        tid();

    }
let f1 = new Fish(random(100, 200), random(100, 200))
f1.show("red")
}

function tid(){
    if(run === true){
        t += 0.005;
    }
}