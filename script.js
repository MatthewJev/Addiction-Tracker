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

    addictionInput.value = ""

    console.log(addictions)

}   
