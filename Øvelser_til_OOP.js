let v1,v2

 
function setup() {
  createCanvas(400, 400);
  v1 = new Vector(100,100,20,50)
  v2 = new Vector(200,200,20,50)
  v1.dotProdukt(v2)
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
dotProdukt(v2){
  return (thisx*v2x+thisy*v2y)
}


  //['scalar(k)'] 
}