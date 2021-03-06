
let li = {};
let currentElement;

// The 3 main buttons
const saveBtn = document.getElementById("save-btn");
const saveWindowsBtn = document.getElementById("save-window-btn");
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

// Bottone save window
saveWindowsBtn.addEventListener("click", () => {
    let name = prompt("Session name: ");
    if(name == "" || name == null){
        alert("Must enter a name!");
        return;
    }
    console.log(name);
    li[name] = []
    // Sistema array tabs perche ha lunghezza 0? JSON AAAAAAAAAAAAA
    browser.windows.getCurrent({populate: true}).then((_window) =>{
        let finestre = new Object();
        tabs = []
        _window.tabs.forEach(element =>{
            tabs.push(element.url);
        });
        finestre["0"] = tabs;
        li[name].push(finestre);
        styleUl();
        saveToLocalStorage();
    }, console.error);
});


// Bottone save all
saveBtn.addEventListener("click", () => {
    let name = prompt("Session name: ");
    if(name == "" || name == null){
        alert("Must enter a name!");
        return;
    }
    console.log(name);
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

// Restore Button
restoreBtn.addEventListener("click", () =>{
    // Per ogni window dentro li
    // key2 ?? il nome (o id) della finestra
    li[currentElement.textContent].forEach(elem =>{
        let key2 = Object.keys(elem)[0];
        openWindow(elem[key2])
    });
});

function openWindow(URLS){
    let toRemove = []
    URLS.forEach(element =>{
        if(/^(about:).*/g.test(element)){
            toRemove.push(element);
        }
    })
    toRemove.forEach(elem =>{
        URLS.splice(URLS.indexOf(elem), 1);
    })
    console.log(URLS);
    browser.windows.create({url:URLS})
}

function styleUl(){
    sessionsUl.innerHTML = "";

    for(let i = 0; i < Object.keys(li).length; i++){
        let key1 = Object.keys(li)[i];

        const temp = document.createElement("li");
        temp.appendChild(document.createTextNode(key1));
        sessionsUl.appendChild(temp);

        temp.addEventListener("click", () =>{
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