const div=document.querySelector('div');
console.log(`Hello`);


function doublen(number){
    if(isNaN(number)){
        throw new Error(number + ' is not a Number');
    }
    return number*2;
}
try{
    const y=doublen('hellow');
    div.innerHTML+=y;
}
catch(err){
    div.innerHTML+=err;
}