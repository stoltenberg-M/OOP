let  posVec, velVec, nemo

function setup() 
{
	createCanvas(600, 600);
    posVec = new Vector(300,100)
    velVec = new Vector(5,5)
    nemo = new Fish(posVec,velVec)
}

function draw()
{
    background("blue")
    nemo.show("red")
    nemo.update()
}
