const frmComparison = document.forms.namedItem("frmComparison");
const company1Number = parseInt(frmComparison["company1"].value);
const company2Number = parseInt(frmComparison["company2"].value);
let equities, debts, profits; 

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
    debts: 8.000,
    profit: 2.000
}

function fetchCompanyData() {
    if (company1Number === 485362) {
        document.getElementById("company1Name").textContent = company1Data.name;
        document.getElementById("company1Address").textContent = company1Data.address;
        document.getElementById("company1Date").textContent = company1Data.date;
        document.getElementById("company1Equity").textContent = company1Data.equity;
        document.getElementById("company1Debts").textContent = company1Data.debts;
        document.getElementById("company1Profit").textContent = company1Data.profit;
        showError(1, false);
        equities[0] = company1Data.equity;
        debts[0] = company1Data.debts;
        profits[0] = company1Data.debts;
    } else {
        showError(1, true);
    }
    if (company2Number === 569082) {
        document.getElementById("company2Name").textContent = company2Data.name;
        document.getElementById("company2Address").textContent = company2Data.address;
        document.getElementById("company2Date").textContent = company2Data.date;
        document.getElementById("company2Equity").textContent = company2Data.equity;
        document.getElementById("company2Debts").textContent = company2Data.debts;
        document.getElementById("company2Profit").textContent = company2Data.profit;
        showError(2, false);
        equities[1] = company2Data.equity;
        debts[1] = company2Data.debts;
        profits[1] = company2Data.debts;
    } else {
        showError(2, true);
    }
}
  
function showError(company, state) {
    if (state) {
        document.getElementById(`company${company}-input`).insertAdjacentHTML("afterend", '<span class="errMessage"> Onbekend ondernemingsnummer. Probeer opnieuw');
    }
    else {
        document.getElementsByClassName("errMessage");
        for (const errMessage in errMessage) {
            document.removeChild(errMessage);
        }
    }
}

function markDifferences(equities, debts, profits) {
    if (equities[0] > equities[1]) {
        document.getElementById("company1Equity").style.color = "green";
        document.getElementById("company2Equity").style.color = "red";
    } else {
        document.getElementById("company1Equity").style.color = "red";
        document.getElementById("company2Equity").style.color = "green";
    }
    if (debts[0] < debts[1]) {
        document.getElementById("company1Debts").style.color = "green";
        document.getElementById("company2Debts").style.color = "red";
    } else {
        document.getElementById("company1Debts").style.color = "red";
        document.getElementById("company2Debts").style.color = "green";
    }
    if (profits[0] > profits[1]) {
        document.getElementById("company1Profit").style.color = "green";
        document.getElementById("company2Profit").style.color = "red";
    } else {
        document.getElementById("company1Profit").style.color = "red";
        document.getElementById("company2Profit").style.color = "green";
    }
}

function compare() {
    fetchCompanyData();
    markDifferences();
}