const frmComparison = document.forms.namedItem("frmComparison");
const company1Number = parseInt(frmComparison["company1"].value);
const company2Number = parseInt(frmComparison["company2"].value);

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

if (company1Number === 485362) {
    document.getElementById("company1Name").textContent = company1Data.name;
    document.getElementById("company1Address").textContent = company1Data.address;
    document.getElementById("company1Date").textContent = company1Data.date;
    document.getElementById("company1Equity").textContent = company1Data.equity;
    document.getElementById("company1Debts").textContent = company1Data.debts;
    document.getElementById("company1Profit").textContent = company1Data.profit;
    showError(1, false);
} else {
    showError(1, true);
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