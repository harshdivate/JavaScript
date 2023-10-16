fetch('https://api.github.com/users/harshdivate')
.then((response)=>response.json())
.then((data)=>{
    console.log(data);
    document.querySelector('div').innerHTML=data.id;
}
    )