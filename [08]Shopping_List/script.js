const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearAll=document.getElementById('clear');
const itemfilter=document.getElementById('filter')




function addItem(e){
    e.preventDefault();
    //validate input
    if(itemInput.value=== ""){
        alert("Please Add and Item");
        return
    }
    const newItem=itemInput.value;
    console.log(newItem);
    const newListItem=createNewList(newItem);
    itemList.appendChild(newListItem);
    checkUI();
    itemInput.value='';
    
}

function createNewList(itemName){
    const newItemList=document.createElement('li');
    const itemText=document.createTextNode(itemName);
    //now item text node is create
    //now first create a button
    const button=createButton();
    newItemList.appendChild(itemText);
    newItemList.appendChild(button);
    return newItemList;

}

function createButton(){
    const btn=document.createElement('button');
    btn.className="remove-item btn-link text-red";
    const i=document.createElement('i');
    i.className="fa-solid fa-xmark";
    btn.appendChild(i);
    return btn;
}


function removeItem(e){
    
    if(e.target.tagName==='I'){
        // const itemName=e.target.parentElement.parentElement.firstChild;
        if(confirm(`Are you sure?`)){
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
        else{
            return;
        }
        
    }
    // console.log(e.target.tagName)
}


//Clear all list
function removeAllItem(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function checkUI(){
    const items=itemList.querySelectorAll('li');
    console.log(items);
    if(items.length===0){
        clearAll.style.display='none';
        itemfilter.style.display='none';
    }else{
        clearAll.style.display='block';
        itemfilter.style.display='block';
    }
}

//Event listeneer
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);
clearAll.addEventListener('click',removeAllItem);

checkUI();




//functions
