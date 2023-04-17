let searchedCompanies = [];
//Bedrijfsinfovenster tevoorschijn laten komen bij het kiezen van een bedrijf uit de historiek.
function showInfo(companyName) {
    let company;
    for (let i = 0; i < searchedCompanies.length; i++) {
        if (searchedCompanies[i].name === companyName) {
            company = searchedCompanies[i];
        }
    }
    document.getElementById("company-info").style.display = "block";
    document.getElementById("companyName").textContent = company.name;
    document.getElementById("companyAddress").textContent = company.address;
    document.getElementById("companyDate").textContent = company.date;
    document.getElementById("companyEquity").textContent = company.equity;
    document.getElementById("companyDebts").textContent = company.debts;
    document.getElementById("companyProfit").textContent = company.profit;
}
//Bedrijfsinfovenster laten verdwijnen bij het klikken op de knop.
function hideInfo() {
    document.getElementById("company-info").style.display = "none";
}
//Bedrijf na het vergelijken toevoegen in de historiek.
function addToHistory(company) {
    const history = document.querySelector("#history ul");
    if (!(searchedCompanies.includes(company))) {
        searchedCompanies.push(company);
        history.insertAdjacentHTML("afterbegin", `<li onclick="showInfo(this.textContent)">${company.name}</li>`);
    }
}