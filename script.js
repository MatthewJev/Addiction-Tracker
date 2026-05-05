const addictionInput = document.getElementById("addictionInput")
const addAddictionBtn= document.getElementById("addAddictionBtn")
const addictionsContainer = document.getElementById("addictionsContainer")
const selectedAddictionContainer = document.getElementById("selectedAddictionContainer")


let addictions = []

let selectedAddictionId = null 

addAddictionBtn.addEventListener("click", handleAddAddiction)

function handleAddAddiction(){
    let addictionName = addictionInput.value.trim()

    if(!addictionName){
    return
    }

    const newAddiction = {
        name: addictionName, 
        id: Date.now(),
        entries: []
    }

    addictions.push(newAddiction)

    renderAddictions()

    addictionInput.value = ""

    console.log(addictions)

}  

function renderAddictions(){
    addictionsContainer.innerHTML = ""

    addictions.forEach((addiction) =>{
        let button = document.createElement("button")
        button.textContent = addiction.name

        button.addEventListener("click", ()=>handleSelectAddiction(addiction.id))
        addictionsContainer.append(button)
    })
}

function handleSelectAddiction(id){
    selectedAddictionId = id 

    let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId)

    renderSelectedAddiction()
}

function renderSelectedAddiction(){
    selectedAddictionContainer.innerHTML = ""
   let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId) 

   if(!selectedAddiction)return

   let addictionName = document.createElement("p")
   addictionName.textContent = selectedAddiction.name

   selectedAddictionContainer.append(addictionName)

}


