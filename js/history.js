let searchedCompanies = [];

function fillIn(id, content) {
    document.getElementById(id).textContent = content;
}

function showCompanyInfo(company) {
    fillIn("companyName", company.name);
    fillIn("companyNumber", company.referencenumber);
    fillIn("companyAddress", company.address);
    fillIn("companyCity", company.city);
    fillIn("companyDate", company.depositeDate);
    fillIn("companyEquity", company.equity);
    fillIn("companyDebts", company.debts);
    fillIn("companyProfit", company.profit);
}

///////////////DEZE FUNCTIE NAAR ANDER HOME/COMPARE-SCRIPT brengen

//Bedrijf na het vergelijken toevoegen in de historiek.
function addToHistory(company) {
    const history = document.querySelector("#history ul");
    if (!(searchedCompanies.includes(company))) {
        searchedCompanies.push(company);
        history.insertAdjacentHTML("afterbegin", `<li onclick="showInfo(this.textContent)">${company.name}</li>`);
    }
}