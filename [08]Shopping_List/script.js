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

    if(isEditMode){
        
        //get the item that we are editing
        const items=itemList.querySelectorAll('li');
        let itemEdited;
        items.forEach(item => {
            if(item.classList.contains('edit-mode')){
                itemEdited=item;
            }
        });
        console.log(`item to edit is`+itemEdited.textContent);
        removeItemFromLocalStorage(itemEdited.textContent);
        itemEdited.classList.remove('edit-mode');
        itemEdited.remove();

        isEditMode=false;
    }
    
    if(checkIfItemExist(newItem)){
        alert('Item Already exist');
        checkUI();
        return;
    }
   
    

    

    addItemToDom(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value='';

    
}

function checkDuplicate(newItem){
    const items=getItemsfromStorage;

    items.forEach(item=>{
        if(item.toLowerCase()===newItem.toLowerCase()){
            return 1;
        }
    })
    return 0;
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

function checkIfItemExist(newItem){
    const items=getItemsfromStorage();
    let ans=false;
    items.forEach(item=>{
        console.log(item);
        if(item.toLowerCase()===newItem.toLowerCase()){
            console.log('item exist');
            ans= true;
            
        }
    })
    return ans;
}

function setItemToEdit(item){
    isEditMode=true;
    itemList.querySelectorAll('li').forEach((i)=>{
        i.classList.remove('edit-mode');
    })
   
    item.classList.add('edit-mode')
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
    itemInput.value='';
    const items=itemList.querySelectorAll('li');
    // console.log(items);
    if(items.length===0){
        clearAll.style.display='none';
        itemfilter.style.display='none';
    }else{
        clearAll.style.display='block';
        itemfilter.style.display='block';
    }
    butn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    butn.style.backgroundColor='#333';
    isEditMode=false;
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
