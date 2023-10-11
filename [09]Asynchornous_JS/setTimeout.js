// Here the setTimeInterval is calling function callback which display the current 
// time,this function is called every one second.

// The setTimeout function will get exectued after 5 seconds from the execution 
// of program.

function changeColor(){
    var d=new Date();
    console.log(d.toLocaleTimeString());
    document.body.style.background  ='red';
}


const item=setTimeout(changeColor,5000);



function callback(){
    var d=new Date();
    console.log(d.toLocaleTimeString());
}

const timer=setInterval(callback,1000);