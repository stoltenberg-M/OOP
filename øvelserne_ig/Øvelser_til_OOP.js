let v1,v2,v3

 
function setup() {
  createCanvas(400, 400);
  v1 = new Vector(20,40)
  v2 = new Vector(60,80)
  v1.dotProdukt(v2)
  v3=v1.add(v2)
  console.log(v1.dotProdukt(v2))
}
 
function draw() {
  background(220);
  v1.show("red",v3.x-v1.x,v3.y-v1.y)
  v2.show("blue",v1.x+v2.x,v1.y+v2.y)
  v3.show("green",v1.x,v1.y)
}
 
class Vector{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  show(col,x0=0,y0=0){
    stroke(col)
    line(x0,y0,this.x,this.y)
  }
  add(v2){
    return new Vector(this.x+v2.x,this.y+v2.y)
  }
dotProdukt(v2){
  return this.x*v2.x+this.y*v2.y
}


  //['scalar(k)'] 
}
