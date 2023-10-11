const interValid=setInterval(mycallback,3000);

function mycallback(){
    // document.style.backgroundcolor='red';
    console.log(Date.now());
}



function stopChange(){
    
    clearInterval(interValid);
}
button=document.querySelector('#clear');
button.addEventListener('click',stopChange);