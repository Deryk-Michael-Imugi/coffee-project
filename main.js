"use strict"

const roastSelection = document.querySelector('#roast-selection');
const nameSelection = document.querySelector('#name-selection');
const submitButton = document.querySelector('#submit');
const addRoastButton = document.querySelector('#add-submit');
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

loadCoffees()

function createCoffee(coffee) {
    const coffeeDiv = document.createElement("div");
    coffeeDiv.classList.add("coffee")
    coffeeDiv.innerHTML = `<h2>${firstLetterUpperCase(coffee.name)}</h2><p>${firstLetterUpperCase(coffee.roast)}</p> `
    document.querySelector(".coffee-display").appendChild(coffeeDiv)
}

function renderCoffees(coffees) {
    for (let i = 0; i < coffees.length; i++) {
        createCoffee(coffees[i])
    }
}

function updateCoffees(e) {
    e.preventDefault();// don't submit the form, we just want to update the data
    document.querySelector(".coffee-display").innerHTML = "";
    const selectedRoast = roastSelection.value.toLowerCase();
    const coffeeNameFilter = nameSelection.value.toLowerCase();
    const filteredCoffees = [];

    coffees.forEach((coffee) => {
        if (selectedRoast === 'all' || coffee.roast === selectedRoast) {
            if (coffee.name.toLowerCase().includes(coffeeNameFilter)) {
                filteredCoffees.push(coffee);
            }
        }
    });

    renderCoffees(filteredCoffees);
}

function addCoffee(e) {
    e.preventDefault();
    const name = document.querySelector("#add-name").value.toLowerCase().trim();
    const roast = document.querySelector("#add-roast").value.toLowerCase();
    const newCoffee = {}
    if (name.length > 0) {
        newCoffee.id = calculateId();
        newCoffee.name = name;
        newCoffee.roast = roast;
        coffees.push(newCoffee);
        localStorage.setItem("savedCoffees", JSON.stringify(coffees))
    }
    if (name.length === 0) {
        alert("Name can not be empty")
    }

    updateCoffees(e);

    function calculateId() {
        let highestID = 0;
        for (let coffee of coffees) {
            if (coffee.id > highestID) {
                highestID = coffee.id
            }
        }
        return highestID + 1
    }
}


renderCoffees(coffees)

/*---------Event Listeners---------*/


//adding nameSelection Listener
nameSelection.addEventListener('input', (e) => {
    updateCoffees(e);
});

//adding eventListener for add-roast submit button
addRoastButton.addEventListener('click', (e) => {
    addCoffee(e);

});
roastSelection.addEventListener("change", (e) => {
    updateCoffees(e)
});


// Capitalize first letter
function firstLetterUpperCase(str) {
       return str.replace(/\w\S*/g, function(txt){
           return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
       });
}

// Retrieve save coffees array and loads if save is found
function loadCoffees() {
    let load = JSON.parse(localStorage.getItem('savedCoffees'))
    if (load !== null) {
        coffees = load;
    }
}

/*Clear local storage*/
let position = 0;
document.addEventListener("keyup", e => {
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "a", "b", "b"]
    console.log(e.key)
    if (konamiCode[position] === e.key) {
        position++
    } else {
        position = 0
    }
    if (position === konamiCode.length) {
        position = 0
        localStorage.removeItem("savedCoffees");
        location.reload()
    }
})