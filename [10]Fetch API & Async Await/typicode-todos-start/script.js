const api='https://jsonplaceholder.typicode.com/todos';

const form=document.getElementById("todo-form");
const todolist=document.querySelector('#todo-list');
const itemInput=document.getElementById('title');
function getTodos(){
    fetch(api+'?_limit=10'
    )
    .then((data)=> data.json())
    .then(data=>addToDom(data))
  
}

function addToDom(data){

    data.forEach(element => {
        const div=document.createElement('div');
        div.textContent=element.title;
        console.log(element.completed);
        if(element.completed){
            div.classList+="done";
        }
        todolist.appendChild(div);

        console.log(element);
    });
}


function addElement(e){
    e.preventDefault();
    item=itemInput.value;
    if(item===''){
        alert("Enter a value");
    }else{

        fetch(api,{
            method:"POST",
            body:{
                title:item,
                completed:false,
            }
        });
        addToDom([{item,completed}])
        console.log('Post Done');
    }
    console.log(item);

}

document.addEventListener('DOMContentLoaded',getTodos)
form.addEventListener('submit',addElement);


