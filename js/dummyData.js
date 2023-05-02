const frmComparison = document.forms.namedItem("frmComparison");
let equities = [], debts = [], profits = []; 

const company1Data = {
    name: "CauSup",
    address: "koekelstraat 5",
    date: '15/12/2022',
    equity: 9.000,
    debts: 8.000,
    profit: 1.000
}
const company2Data = {
    name: "SupCau",
    address: "koekelstraat 3",
    date: '12/12/2022',
    equity: 10.000,
    debts: 9.000,
    profit: 2.000
}

function fetchCompanyData(company) {
        if (company == 1) {
            document.getElementById("company1Name").textContent = company1Data.name;
            document.getElementById("company1Address").textContent = company1Data.address;
            document.getElementById("company1Date").textContent = company1Data.date;
            document.getElementById("company1Equity").textContent = '€' + company1Data.equity + '.000,00';
            document.getElementById("company1Debts").textContent = '€' + company1Data.debts + '.000,00';
            document.getElementById("company1Profit").textContent = '€' + company1Data.profit + '.000,00';
            equities[0] = company1Data.equity;
            debts[0] = company1Data.debts;
            profits[0] = company1Data.debts;
        }
        if (company == 2) {
            document.getElementById("company2Name").textContent = company2Data.name;
            document.getElementById("company2Address").textContent = company2Data.address;
            document.getElementById("company2Date").textContent = company2Data.date;
            document.getElementById("company2Equity").textContent = '€' + company2Data.equity + '.000,00';
            document.getElementById("company2Debts").textContent = '€' + company2Data.debts + '.000,00';
            document.getElementById("company2Profit").textContent = '€' + company2Data.profit + '.000,00';
            equities[1] = company2Data.equity;
            debts[1] = company2Data.debts;
            profits[1] = company2Data.profits;
        }
    
}



document.getElementById("btnCompare").addEventListener("click", function(event){
    event.preventDefault()
});

function deleteErr() {
    const errMessages = document.getElementsByClassName("errMessage");
    for (let i= 0; i < errMessages.length; i++) {
       errMessages[i].textContent = "";
    }
}

function compare() {
    const company1Number = frmComparison["company1"].value;
    const company2Number = frmComparison["company2"].value;
    let counter = 0;
    if (company1Number == 485362) {
        fetchCompanyData(1);
        addToHistory(company1Data)
        counter++;
    } else {
        frmComparison.insertAdjacentHTML("afterend", '<span class="errMessage"> Eerste ondernemingsnummer is niet gevonden.</span>');
    }
    if (company2Number == 569082) {
        fetchCompanyData(2);
        addToHistory(company2Data)
        counter++;
    } else {
        frmComparison.insertAdjacentHTML("afterend", '<span class="errMessage"> Tweede ondernemingsnummer is niet gevonden.</span>');
    }
    if (counter == 2) {
        deleteErr();
        markDifferences(equities, debts, profits);
    }
    //Hier ook markdifferences() laten oproepen met een return counter van fetchData
    //Hetzelfde voor historiek aanvulling
    //Misschien dan nog later, een foutmelding laten verschijnen wanneer de gebruiker wil vergelijken maar nog geen ondernemingsnummers heeft ingegeven
}
