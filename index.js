import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-data-80eef-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
addButtonEl.addEventListener("click",function(){    
    let inputtedItem = inputFieldEl.value
    push(shoppingListInDB, inputtedItem)
    clearInputField()
})
onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
    
        let updatedShoppingList = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < updatedShoppingList.length; i++){
            let currentItem = updatedShoppingList[i]
            addToShoppingList(currentItem)
        }
    }
    else {
      shoppingListEl.innerHTML = "No items here.... yet"  

    }
})
function clearInputField(){
    inputFieldEl.value = ""
}
function addToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = `${itemValue}`
    newEl.addEventListener("click",function(){
        let locationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(locationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}
