const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearAll=document.getElementById('clear');
const itemfilter=document.getElementById('filter');
const butn=itemForm.querySelector('button');
let isEditMode=false;



function addItem(e){
    e.preventDefault();
    //validate input
    if(itemInput.value=== ""){
        alert("Please Add and Item");
        return
    }
    const newItem=itemInput.value;
   

    addItemToDom(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value='';
    
}
function getItemsfromStorage(){
    let itemFromLocalStorage;
    
    if(localStorage.getItem('items')===null){
        //the array is empty
        itemFromLocalStorage=[];
    }else{
        itemFromLocalStorage=JSON.parse(localStorage.getItem('items'));
    }
    return itemFromLocalStorage;
}
function addItemToStorage(item){
    const itemFromLocalStorage=getItemsfromStorage();
    itemFromLocalStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemFromLocalStorage));
    
}

function addItemToDom(newItem){
    const newListItem=createNewList(newItem);
    itemList.appendChild(newListItem);

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


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else{
       setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode=true;
    item.style.color='#ccc';
    const text=item.textContent;
    butn.innerHTML='<i class="fa-solid fa-pen"></i>Update Item';
    butn.style.backgroundColor='#228B22';
    console.log(text);
    itemInput.value=text;
}

function removeItem(item){
    
    if(confirm('Are you sure?')){
        item.remove();
    }
    removeItemFromLocalStorage(item.textContent);
   
    
}

function removeItemFromLocalStorage(itemToRemove){
    let itemsfromlocalStorage=getItemsfromStorage();

    const newLocalStorage=removeItemFromStorageWithName(itemsfromlocalStorage,itemToRemove);
    localStorage.setItem('items',JSON.stringify(newLocalStorage));
    // localStorage.setItem('items',JSON.stringify(itemFromLocalStorage));
}

function removeItemFromStorageWithName(localStorage,itemName){
    let newLocalStorage=[];
    for(let i=0;i<localStorage.length;i++){
        if(localStorage[i]!==itemName){
            newLocalStorage.push(localStorage[i]);
        }
    }
    return newLocalStorage;
}


//Clear all list
function removeAllItem(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    //remove from localstorage
    localStorage.removeItem('items');
    checkUI();
}

function filterItem(e){
    const text=e.target.value.toLowerCase();
    const items=itemList.querySelectorAll('li');

    items.forEach(item => {
        const itemName=item.firstChild.textContent.toLowerCase();
        if(itemName.includes(text)){
            item.style.display='block';
        }else{
            item.style.display='none';
        }
    });
}

function checkUI(){
    const items=itemList.querySelectorAll('li');
    // console.log(items);
    if(items.length===0){
        clearAll.style.display='none';
        itemfilter.style.display='none';
    }else{
        clearAll.style.display='block';
        itemfilter.style.display='block';
    }
}

function displayItemsFromStorage(){
    const itemFromLocalStorage=getItemsfromStorage();
    itemFromLocalStorage.forEach(item =>{
        addItemToDom(item);
    })
    checkUI();
}   

//Event listeneer
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',onClickItem);
clearAll.addEventListener('click',removeAllItem);
itemfilter.addEventListener('input',filterItem);
document.addEventListener('DOMContentLoaded',displayItemsFromStorage)




//functions
