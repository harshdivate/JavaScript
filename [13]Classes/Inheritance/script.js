class Shape{
    constructor(name) {
        this.name = name;
    }

    logName(){
        console.log('Shape Name : ' + this.name);
    }
}

class Rectangle extends Shape {
    constructor(name,width,height){
        super(name);
        this.height = height;
        this.width = width;
    }
}
class Circle extends Shape {
    constructor(name,radius){
        super(name);
        this.radius = radius
    }
    logName(){
        console.log(`Circle Name : ${this.name}`);
    }
}
const r = new Rectangle('Rect1', 20, 20 );
r.logName();
const cir = new Circle('Circle1', 10);
cir.logName();