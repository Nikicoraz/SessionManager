let a = {"ciao":[{"finestra1":["google", "youtube"]}, {"finestra2":["github", "stackoverflow"]}], 
"pizza":[{"finestra1":["ciao", "boom"]}]}

for(let i = 0; i < Object.keys(a).length; i++){
    let key1 = Object.keys(a)[i];
    a[key1].forEach(elem =>{
        let key2 = Object.keys(elem)[0]; 
        elem[key2].forEach(element =>{
            console.log(`${key1}: ${key2}: ${element}`);
        })
    });
}