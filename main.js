"use strict"

const submitButton = document.querySelector('#submit');


function createCoffee(coffee) {
    const coffeeDiv = document.createElement("div");
    coffeeDiv.classList.add("coffee")
    coffeeDiv.innerHTML = `<h2>${coffee.name}</h2><p>${coffee.roast}</p> `
    document.querySelector(".coffee-display").appendChild(coffeeDiv)
}
function renderCoffees(coffees) {
    for (let i = 0; i < coffees.length; i++) {
        createCoffee(coffees[i])
    }
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    document.querySelector(".coffee-display").innerHTML = "";
    const selectedRoast = roastSelection.value;
    const filteredCoffees = [];
    coffees.forEach(coffee => {
        if (selectedRoast === "all"){
            filteredCoffees.push(coffee)
        }

        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
   renderCoffees(filteredCoffees);

   console.log(selectedRoast)

}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
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
renderCoffees(coffees)
// const tbody = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');

;

submitButton.addEventListener('click', (e) => {
    updateCoffees(e);
    // nameSelection.value = "";
})




/*  Testing */
document.addEventListener('keypress',(e)=>{

    console.log(e.currentTarget)
    if (e.key === "q"){

        document.querySelector(".coffee-display").innerHTML = "";
        alert("df")


    }
})