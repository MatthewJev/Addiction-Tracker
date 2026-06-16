const addictionInput = document.getElementById("addictionInput")
const addAddictionBtn= document.getElementById("addAddictionBtn")
const addictionsContainer = document.getElementById("addictionsContainer")
const selectedAddictionContainer = document.getElementById("selectedAddictionContainer")
const addictionsKey = "addictions"

//STATE

let addictions = []

let selectedAddictionId = null 

let streak = null 

addAddictionBtn.addEventListener("click", handleAddAddiction)

//HELPER FUNCTIONS 

function getTodayEntry(selectedAddiction){
    let currentDate = new Date().toISOString().split("T")[0]
    let entry = selectedAddiction.entries.find(
        e => e.date === currentDate
    )
    if (!entry) {
        entry = createEntry(currentDate)

        selectedAddiction.entries.push(entry)
    }
    return entry
}

function getSelectedAddiction(){
return addictions.find(addiction => addiction.id === selectedAddictionId) 
}


function streakCalculator(selectedAddiction){
let streak = 0 

for (let entry of selectedAddiction.entries){
    if(entry.relapse === false){
        streak++
    } else {
        streak = 0
    }       
}
return streak 
}


function setLocalStorage(){
localStorage.setItem(addictionsKey, JSON.stringify(addictions))
}


function getLocalStorage(){
    let rawData = localStorage.getItem(addictionsKey)

    if(rawData){
     let data = JSON.parse(rawData)
     addictions = data
    }

}

function createEntry(date){
    return {
        date: date, 
        relapse: null ,
        journal: "" 
    }
}




//User Actions 

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

    

    addictionInput.value = ""

    console.log(addictions)

    setLocalStorage()
    console.log(localStorage.getItem(addictionsKey))
    renderAddictions()
}  

// keeps track of what addiciton is currently selected 
function handleSelectAddiction(id){
    selectedAddictionId = id 

    let selectedAddiction = addictions.find(addiction => addiction.id === selectedAddictionId)

    renderSelectedAddiction()
}

// keeps track of whether the user has relapsed for the day 
function handleCheckin(answer){
   let selectedAddiction = getSelectedAddiction()

   if (!selectedAddiction)return

   let entry = getTodayEntry(selectedAddiction)

   entry.relapse = answer 

   renderSelectedAddiction()

   setLocalStorage()

}

// saves the users journal 
function handleJournalSave(journalInput){
   let selectedAddiction = getSelectedAddiction()

   if (!selectedAddiction)return

   let entry = getTodayEntry(selectedAddiction)

   entry.journal = journalInput.value

   console.log(addictions)

   setLocalStorage()



}





// RENDER FUNCTIONS

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


// render the contents of the selected addiciton to the page 
function renderSelectedAddiction(){


   let selectedAddiction = getSelectedAddiction()

   if(!selectedAddiction)return

   let currentDate = new Date().toISOString().split("T")[0]

   let todaysEntry = getTodayEntry(selectedAddiction)

   selectedAddictionContainer.innerHTML = "" 

   let ui = buildSelectedAddicitonUI(selectedAddiction, todaysEntry)

   selectedAddictionContainer.append(...ui)

   console.log("selected:", selectedAddiction.name)

console.log("entries:", selectedAddiction.entries)

   

}

function renderSelectedEntry(){
    
}





//BUILDER FUNCTIONS 

// builds the ui for the selected addiction 
function buildSelectedAddicitonUI(selectedAddiction, entry){
   let elements = []

   let addictionName = document.createElement("p")
   addictionName.textContent = selectedAddiction.name
   
   let streak = document.createElement("p")
   let question = document.createElement("p")
   let yesBtn = document.createElement("button")
   let noBtn = document.createElement("button")
   let journalInput = document.createElement("input")
   let saveBtn = document.createElement("button")

   streak.textContent = `streak: ${streakCalculator(selectedAddiction)}`
   question.textContent = "did you relapse today"
   yesBtn.textContent = "yes"
   noBtn.textContent = "no"  
   journalInput.placeholder = "journal"
   journalInput.value = entry?.journal || ""
   saveBtn.textContent = "save"

   if (entry?.relapse !== undefined) {
        yesBtn.classList.add("hidden")
        noBtn.classList.add("hidden")
        question.classList.add("hidden")
    }

    yesBtn.classList.add("button")
    noBtn.classList.add("button")
    saveBtn.classList.add("button")

   
   yesBtn.addEventListener("click", ()=> handleCheckin(true))
   noBtn.addEventListener("click", ()=> handleCheckin(false))  
   saveBtn.addEventListener("click", ()=>handleJournalSave(journalInput))

   let historyUi = buildHistoryUI(selectedAddiction)

 
    
    elements.push(streak, addictionName, question, yesBtn, noBtn, journalInput, saveBtn, historyUi)


    return elements
}



function buildHistoryUI(selectedAddiction){
    let element =[]

    let historyContainer = document.createElement("div")
    let title = document.createElement("p")
    title.textContent = "History"

    historyContainer.append(title)

   selectedAddiction.entries.forEach(entry =>{

    let button = document.createElement("button")
    button.textContent = entry.date

    button.addEventListener("click", ()=>{
        buildSelectedAddicitonUI(selectedAddiction, entry)
    })
    historyContainer.append(button)

   })

   return historyContainer
}

getLocalStorage()
renderAddictions()