
let li = {};
let currentElement;

// The 3 main buttons
const saveBtn = document.getElementById("save-btn");
const restoreBtn = document.getElementById("restore-btn");
const deleteBtn = document.getElementById("delete-btn");

// Lista di tutte le sessioni
const sessionsUl = document.getElementById("sessions-ul");

function saveToLocalStorage(){
    localStorage.setItem("session-list", JSON.stringify(li));
}

function getFromLocalStorage(){
    const parsed = JSON.parse(localStorage.getItem("session-list"));
    if(parsed){
        console.log("Parsed: " + JSON.stringify(parsed));
        return parsed
    }else{
        return {}
    }
}



// Bottone save
saveBtn.addEventListener("click", () => {
    let name = prompt("Session name: ");
    if(name == ""){
        alert("Must enter a name!");
        return;
    }
    li[name] = []
    // Sistema array tabs perche ha lunghezza 0? JSON AAAAAAAAAAAAA
    browser.windows.getAll({populate: true}).then((windows) =>{
        for(let i = 0; i < windows.length; i++){
            let finestre = new Object();
            tabs = []
            windows[i].tabs.forEach(element =>{
                tabs.push(element.url);
            });
            finestre[i.toString()] = tabs;
            li[name].push(finestre);
        }
        styleUl();
        console.log(JSON.stringify(li));
        saveToLocalStorage();
    }, console.error);

});

// Button delete
deleteBtn.addEventListener("dblclick", () => {

    delete li[currentElement.textContent]
    currentElement.remove();
    saveToLocalStorage();
});

function styleUl(){
    sessionsUl.innerHTML = "";

    for(let i = 0; i < Object.keys(li).length; i++){
        let key1 = Object.keys(li)[i];

        const temp = document.createElement("li");
        temp.appendChild(document.createTextNode(key1));
        sessionsUl.appendChild(temp);

        temp.addEventListener("click", () =>{
            // Da implementare l'apritura delle pagine (possibilmente con funzione) nel bottone restore con current element
            if(currentElement != null && currentElement != temp){
                currentElement.style.backgroundColor = "";
                currentElement.style.border = "";
            }
            temp.style.backgroundColor = "#b5e1ff";
            temp.style.border = "1px solid #74c7ff";
            currentElement = temp;
        })
    }
}

// Codice init
li = getFromLocalStorage();
styleUl();

// NELL'ARRAY LI SI SALVANO NOME SESSIONE[WINDOW[TABS]]
// DAL NOME SESSIONE NEL RENDER SI CREA L'ELEMENTO LIST