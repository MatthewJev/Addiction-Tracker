const addictionInput = document.getElementById("addictionInput")
const addAddictionBtn= document.getElementById("addAddictionBtn")
const addictionsContainer = document.getElementById("addictionsContainer")


let addictions = []

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
        addictionsContainer.append(button)
    })
}


