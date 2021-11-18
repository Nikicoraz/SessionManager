
let li = [];
let currentElement;

// The 3 main buttons
const saveBtn = document.getElementById("save-btn");
const restoreBtn = document.getElementById("restore-btn");
const deleteBtn = document.getElementById("delete-btn");

// Lista di tutte le sessioni
const sessionsUl = document.getElementById("sessions-ul");

function saveToLocalStorage(){
    let toSave = []
    li.forEach(element =>{
        toSave.push(element.textContent);
    });

    localStorage.setItem("session-list", JSON.stringify(toSave));
}

function getFromLocalStorage(){
    const parsed = JSON.parse(localStorage.getItem("session-list"));
    let toReturn = []
    for(let i = 0; i < Object.keys(a).length; i++){
        let key1 = Object.keys(a)[i];

        const temp = document.createElement("li");
        temp.appendChild(document.createTextNode(key1));
        sessionsUl.appendChild(temp);

        a[key1].forEach(elem =>{
            let key2 = Object.keys(elem)[0]; 
            elem[key2].forEach(element =>{
                console.log(`${key1}: ${key2}: ${element}`);
            })
    });
}
    if(parsed){
        parsed.forEach(element => {
            const temp = document.createElement("li");
            temp.appendChild(document.createTextNode(element));
            sessionsUl.appendChild(temp);
            toReturn.push(temp);
        });
        li = toReturn;
        styleUl();
    } 
}



// Bottone save
saveBtn.addEventListener("click", () => {
    // let a = prompt("Session name: ");
    // const newLi = document.createElement("li");
    // newLi.appendChild(document.createTextNode(a));
    // sessionsUl.appendChild(newLi);
    // li.push(newLi);
    // styleUl();
    // saveToLocalStorage();
    browser.windows.getAll({populate: true}).then(saveTabs, console.error);
    
});

// Button delete
deleteBtn.addEventListener("dblclick", () => {
    li.splice(li.indexOf(currentElement), 1);
    currentElement.remove();
    saveToLocalStorage();
});

function styleUl(){
    li.forEach(element => {
        element.addEventListener("click", ()=>{
            if(currentElement != null && currentElement != element){
                currentElement.style.backgroundColor = "";
                currentElement.style.border = "";
            }
            element.style.backgroundColor = "#b5e1ff";
            element.style.border = "1px solid #74c7ff";
            currentElement = element;
        })
    });
}

// Codice init
getFromLocalStorage();

function saveTabs(windows) {
    // const newLi = document.createElement("li");
    // let a = "";
    // let i = 1;
    //
    // windows.forEach(element => {
    //     element.tabs.forEach(tab => {
    //         a += `${i}: ${tab.url}\n`;
    //     })
    //     i++;
    // });
    // newLi.appendChild(document.createTextNode(a));
    // sessionsUl.appendChild(newLi);
    // li.push(newLi);
    // styleUl();
}


// NELL'ARRAY LI SI SALVANO NOME SESSIONE[WINDOW[TABS]]
// DAL NOME SESSIONE NEL RENDER SI CREA L'ELEMENTO LIST