



const btn=document.getElementById('generate');
//Frame items
const img=document.querySelector('img');
const name=document.getElementById('name');
const email=document.getElementById('email');
const phone=document.getElementById('phone');
const loc=document.getElementById('lo');

const age=document.getElementById('age');

function getUser(){
    fetch('https://randomuser.me/api/')
.then(res=>res.json())
.then(data=>{
    const dObject=data.results[0];
    img.src=`${dObject.picture.large}`;
    document.querySelector('.space-y-3 p:nth-child(1)').innerHTML=`<span   class="font-bold"><strong>Name</strong>: </span> ${dObject.name.first} ${dObject.name.last}`;

    document.querySelector('.space-y-3 p:nth-child(2)').innerHTML=`<span   class="font-bold"><strong>Email:</strong> </span> ${dObject.email}`;

    document.querySelector('.space-y-3 p:nth-child(3)').innerHTML=`<span   class="font-bold"><strong>Phone</strong>: </span> ${dObject.cell}`;

    document.querySelector('.space-y-3 p:nth-child(4)').innerHTML=`<span   class="font-bold"><strong>Location</strong>: </span> ${dObject.location.state}`;

    document.querySelector('.space-y-3 p:nth-child(5)').innerHTML=`<span   class="font-bold"><strong>Age</strong>: </span> ${dObject.dob.age}`;


    console.log(dObject);
});

}


btn.addEventListener('click',getUser);