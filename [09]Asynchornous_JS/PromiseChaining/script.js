console.log('Hi');
const promise=new Promise((resolve,reject)=>{
    let error=false;
    setTimeout(()=>{
        if(!error){
            resolve({name:"Harsh",age:21})
        }else{
            reject('Something went wrong');
        }
    },1000)
    
});

promise
.then((data)=>{
    console.log(data);
    return data.name;
}).then((name)=>{
    console.log(name);
    return name.length;
}).then((len)=>{
    console.log(len);
}).catch((error)=>{
    console.log(error);
})