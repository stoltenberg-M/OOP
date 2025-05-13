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
let f1 = new Fish(100,100)
f1.show("red")
}