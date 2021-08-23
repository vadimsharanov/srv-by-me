let zmones = [];

async function getPeople() {
    try {
        const response = await fetch("/json/zmogus");
            if (response.ok) {
                zmones = await response.json();
            }
            showPeople();
    }
    catch (err) {
        console.log(err);
    }
}

function showPeople() {
    const app = document.getElementById("app");
    cleanElement(app);
    const table = document.createElement("table");
    for (const zmogus of zmones) {
        let td, tr; 
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.appendChild(document.createTextNode(`${zmogus.vardas} || ${zmogus.pavarde} || ${zmogus.alga}`));
        tr.appendChild(td);
        td = document.createElement("td");
        const button = document.createElement("button");
        button.appendChild(document.createTextNode("Delete"));
        button.zmogusId = zmogus.id
        button.onclick = deletePeople;
        td.appendChild(button)
        tr.appendChild(td)
        table.appendChild(tr);
    } 
    app.appendChild(table);        
    }
async function deletePeople(event) {
    if (event && event.target && event.target.zmogusId && isFinite(event.target.zmogusId)) {
        const index = zmones.findIndex(z => z.id === event.target.zmogusId);
        const zmogus = zmones[index]
        try {
            const response = await fetch("/json/zmogus/" + zmogus.id, {
                method: "DELETE"
            });
            if (response.ok) {
                zmones.splice(index,1)
                showPeople();
            }
            else {
                console.log(response.status, response.statusText);
                alert("Klaida trinant: " + response.statusText);
            }
        }
        catch (err) {
        }
            console.log(err);
        }

}


 function addPeople() {
    const app = document.getElementById("app");
    cleanElement(app);
    let input;
    app.appendChild(document.createTextNode("Vardas"));
    input = document.createElement("input");
    input.id = "newName";
    app.appendChild(input);
    app.appendChild(document.createElement("br"))
    
    app.appendChild(document.createTextNode("Pavarde"));
    input = document.createElement("input");
    input.id = "newLastName";
    app.appendChild(input);
    app.appendChild(document.createElement("br"))
    
    app.appendChild(document.createTextNode("Alga"));
    input = document.createElement("input");
    input.id = "newSalary";
    app.appendChild(input);
    app.appendChild(document.createElement("br"))
    
    let button;
    button = document.createElement("button");
    button.appendChild(document.createTextNode("Save"));
    app.appendChild(button);
    button.onclick = savePeople;
   
    button = document.createElement("button");
    button.appendChild(document.createTextNode("back"));
    button.onclick = getPeople;
    app.appendChild(button);
}

async function savePeople () {
    let newName = document.getElementById("newName").value
    let newLastName = document.getElementById("newLastName").value
    let newSalary =  parseFloat(document.getElementById("newSalary").value)
    const zmogus = {
        newName,
        newLastName,
        newSalary
    };
    let response =  await fetch("/json/zmogus", {
        method:"POST",
        headers: { "Content-Type": "application/json"
    },
    body: JSON.stringify(zmogus)
    })
    if (!response.ok) {
        console.log("Save failed with status" + response.status);
    }
    getPeople()

}

function cleanElement(el) {
    if (el instanceof Element) {
        while (el.firstChild) {
            el.firstChild.remove()
        }
    }
}