class Vector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    show(col,x0=0,y0=0){
        fill(col)
        stroke(col)
        line(x0,y0,x0+this.x,y0+this.y)
        circle(x0+this.x,y0+this.y,10)
    }

    add(other){
        return new Vector(this.x+other.x,this.y+other.y)
    }
}

