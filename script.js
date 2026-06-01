const addictionInput = document.getElementById("addictionInput")
const addAddictionBtn= document.getElementById("addAddictionBtn")
const addictionsContainer = document.getElementById("addictionsContainer")
const selectedAddictionContainer = document.getElementById("selectedAddictionContainer")


let addictions = []

let selectedAddictionId = null 

addAddictionBtn.addEventListener("click", handleAddAddiction)


// takes users new addicition and adds it to the addicition array 
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

// takes the addictions from addicitions array and renders them as buttons to the page 
function renderAddictions(){
    addictionsContainer.innerHTML = ""

    addictions.forEach((addiction) =>{
        let button = document.createElement("button")
        button.textContent = addiction.name

        button.addEventListener("click", ()=>handleSelectAddiction(addiction.id))
        addictionsContainer.append(button)
    })
}

// keeps track of what addiciton is currently selected 
function handleSelectAddiction(id){
    selectedAddictionId = id 

    let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId)

    renderSelectedAddiction()
}

// render the contents of the selected addiciton to the page 
function renderSelectedAddiction(){
    selectedAddictionContainer.innerHTML = ""
   let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId) 

   if(!selectedAddiction)return

   let addictionName = document.createElement("p")
   addictionName.textContent = selectedAddiction.name

   
   let question = document.createElement("p")
   let yesBtn = document.createElement("button")
   let noBtn = document.createElement("button")

  


   question.textContent = "did you relapse today"
   yesBtn.textContent = "yes"
   noBtn.textContent = "no" 
   
   let entries = selectedAddiction.entries 
   let currentDate = new Date().toISOString().split("T")[0]

  let todaysEntry = entries.find(entry=> entry.date === currentDate)



   yesBtn.addEventListener("click", ()=> handleCheckin(true))
   noBtn.addEventListener("click", ()=> handleCheckin(false))  

if (todaysEntry?.relapse !== undefined && todaysEntry !== undefined) {

    yesBtn.classList.add("hidden")

    noBtn.classList.add("hidden")

}

   selectedAddictionContainer.append(addictionName, question, yesBtn, noBtn)

}

// keeps track of whether the user has relapsed for the day 
function handleCheckin(answer){
   let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId) 

   if (!selectedAddiction)return

   if(selectedAddiction.entries.relapse)return 

   selectedAddiction.entries.push({
    date : new Date().toISOString().split("T")[0], 
    relapse : answer, 
   })

   renderSelectedAddiction()
console.log(addictions)
}


