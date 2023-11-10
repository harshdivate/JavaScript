function Shape(name){
    this.name = name;
}
Shape.prototype.logName =  function (){
    console.log(`Shape name :${this.name}`);
}

function Rectangle(name,height,width){
    this.width=width;
    this.height=height;
    Shape.call(this,name)
}
// Inherits Shape Prototype 
Rectangle.prototype = Object.create(Shape.prototype)
function Circle(name,radius){
    this.radius=radius;
    Shape.call(this,name)
}

const rect = new Rectangle('Rect1',10,20);
const c = new Circle('Circle1',20)
console.log(rect,c);
rect.logName();
