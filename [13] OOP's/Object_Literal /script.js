const rectanglePrototypes = {
    area: function (){
        return this.width* this.height
    },
    perimeter : function (){
        return 2*(this.height+this.width)
    },
    isSquare : function(){
        return this.height===this.width;
    }
}

function createRectangle(height,width){
    return Object.create(rectanglePrototypes,{
        height :{
            value : height
        },
        width :{
            value: width
        }
    })
}
const rect = createRectangle(10,20);
console.log(rect);