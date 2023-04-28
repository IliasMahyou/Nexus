let searchedCompanies = [];

function fillIn(el, content) {
    document.getElementById(el).textContent = content;
}

///////////////DEZE FUNCTIE NAAR ANDER HOME-SCRIPT brengen

//Bedrijf na het vergelijken toevoegen in de historiek.
function addToHistory(company) {
    const history = document.querySelector("#history ul");
    if (!(searchedCompanies.includes(company))) {
        searchedCompanies.push(company);
        history.insertAdjacentHTML("afterbegin", `<li onclick="showInfo(this.textContent)">${company.name}</li>`);
    }
}