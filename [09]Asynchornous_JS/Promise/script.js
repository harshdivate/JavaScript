// Promise Basic Syntax

const promise=new Promise((resolve,reject)=>{
    // Do Some async take
    setTimeout(function(){
        console.log('Async Task Complete');
        resolve();
    },1000)
});


promise.then(()=>{
    console.log('Promise Consumed');
})

console.log('Hello from global scope');