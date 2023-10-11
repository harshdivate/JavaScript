// what he will do is inside create post function he will call back the get post 

const arr=[{'name':'apple','title':'Tare zame paar'},{'name':'apple','title':'Tare zame paar'}]



function getPost(){
    setTimeout(function(){
        arr.forEach(a=>{
            const div=document.getElementById('div');
            const newItem=document.createElement('div');
            newItem.appendChild(document.createTextNode(`Name:${a.name}\tTitle:${a.title}`));
            div.appendChild(newItem);
            console.log(a);
        })
    },1000)
}


function creatPost(name){
    setTimeout(function(){
        arr.push({'name':name,'title':'rmase'});
        getPost();
    },2000);
}

creatPost('harsh')