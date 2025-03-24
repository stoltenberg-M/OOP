<<<<<<< HEAD
let v1
 
function setup() {
  createCanvas(400, 400);
  v1 = new Vector(100,100,20,50)
}
 
function draw() {
  background(220);
  v1.show()
}
 
class Vector{
  constructor(a,b,x0,y0){
    this.a=a
    this.b=b
    this.x0=x0
    this.y0=y0
    this.x1=this.x0+this.a
    this.y1=this.y0+this.b
  }
  show(){
    line(this.x0,this.y0,this.x1,this.y1)
    circle(this.x1,this.y1,10)
  }
}
=======


function setup(){
createCanvas(400, 400);
background(180,200,180); 
/*
A1 = new kage()
A1.O
*/

A1 = new A()

B1 = new B()



}
/*
class kage{
    constructor(){
        this.x=100
        this.y=300
        this.O=rect(50,50,10,10)
    }
}
*/

class A{
    constructor(){
        this.b
    }
    setB(b){
        this.b=b
    }
}

class B{
    constructor(){
        this.a
    }
    setA(a){
        this.a=a
    }
}

function draw(){

}


//kage
>>>>>>> 47504a173881d768e6a7f62488f9d6740cd88685
