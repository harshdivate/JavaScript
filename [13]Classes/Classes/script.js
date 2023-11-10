class Rectangle {
    constructor(name,width,height){
        this.name = name;
        this.width = width;
        this.height = height;
    }

    area(){
        return this.height*this.width
    }

    perimeter(){
        return 2*(this.width+this.height);
    }

    isSquare(){
        return this.width===this.height;
    }
}

const s = new Rectangle('Square',21,20);
console.log(s.area());
console.log(s.perimeter());
console.log(s.isSquare());