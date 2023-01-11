// ****** SELECT ITEMS **********
const alert=document.querySelector(".alert");
const form=document.querySelector(".grocery-form");
const grocery=document.getElementById("grocery");
const submitBtn=document.querySelector(".submit-btn");
const container=document.querySelector(".grocery-container");
const list=document.querySelector(".grocery-list");
const clearBtn=document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag=false;
let editID="";
// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value=grocery.value;
    const id=new Date().getTime().toString();
    if(value && !editFlag){
        createListItem(id, value);
        displayAlert("item added to the list", "success");
        container.classList.add("show-container");
        addToLocalStorage(id, value);
        setBackToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML=value;
        displayAlert("value changed", "success");
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter value", "danger");
    }
}
//display alert
function displayAlert(text, action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);
    }, 1500)
}
//clear items
function clearItems(){
    // console.log("cleared items");
    const items=document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
}
//edit items
function editItem(e){
    // console.log("edit item");
    const element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id;
    submitBtn.textContent="edit";
}
//delete items
function deleteItem(e){
    // console.log("item deleted");
    const element=e.currentTarget.parentElement.parentElement;
    const id=element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    //remove from local storage
    removeFromLocalStorage(id);
}
//setting to default
function setBackToDefault(){
    grocery.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent="submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery={id:id, value:value};
    let items=getLocalStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(ID){
    let items=getLocalStorage();
    items=items.filter(function(item){
        if(item.id!==ID){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value){
    let items=getLocalStorage();
    items=items.map(function(item){
        if(item.id===id){
            item.value=value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
//local storage API
//setItem
//getItem
// removeItem
//save as strings
// localStorage.setItem("Avyukt", JSON.stringify(["Cricket", "Coding"]));

// ****** SETUP ITEMS **********

function setupItems(){
    let items=getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.id, item.value);
        })
        container.classList.add("show-container");
    }
}

function createListItem(id, value){
    const element=document.createElement("article");
    element.classList.add("grocery-item");
    const attr=document.createAttribute("data-id");
    attr.value=id;
    element.setAttributeNode(attr);
    element.innerHTML=`<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>`;

    const deleteBtn=element.querySelector(".delete-btn");
    const editBtn=element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
}