



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
    phone.innerHTML=`<span   class="font-bold">Phone: </span> ${dObject.cell}`
    document.querySelector('.space-y-3 p:nth-child(1)').textContent="love";
    console.log(dObject);
});

}


btn.addEventListener('click',getUser);