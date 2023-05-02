/*Constantedeclaraties*/
const frmComparison = document.forms.namedItem("frmComparison");
/*Synchrone functies*/
document.getElementById("btnCompare").addEventListener("click", function(event){
    event.preventDefault()
});
function compare() {
    const company1Number = frmComparison["company1"].value;
    const company2Number = frmComparison["company2"].value;
    let counter = 0;

    /*if (company1Number = "") {
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
    }*/
    if (counter == 2) {
        deleteErr();
        markDifferences(equities, debts, profits);
    }
}
function markDifferences(company1, company2) {
    if (company1.equities > company2.equities) {
        document.getElementById("company1Equity").style.color = "green";
        document.getElementById("company2Equity").style.color = "red";
    } else {
        document.getElementById("company1Equity").style.color = "red";
        document.getElementById("company2Equity").style.color = "green";
    }
    if (company1.debts < company2.debts) {
        document.getElementById("company1Debts").style.color = "green";
        document.getElementById("company2Debts").style.color = "red";
    } else {
        document.getElementById("company1Debts").style.color = "red";
        document.getElementById("company2Debts").style.color = "green";
    }
    if (company1.profits > company2.profits) {
        document.getElementById("company1Profit").style.color = "green";
        document.getElementById("company2Profit").style.color = "red";
    } else {
        document.getElementById("company1Profit").style.color = "red";
        document.getElementById("company2Profit").style.color = "green";
    }

    //Nog kleur maken voor even aantal
}
function showErr(number) {
    const number = number == 1 ? "Eerste" : "Tweede";
    frmComparison.insertAdjacentHTML("afterend", `<span class="errMessage">${number} ondernemingsnummer is niet gevonden.</span>`)
}
function deleteErr() {
    const errMessages = document.getElementsByClassName("errMessage");
    for (let i= 0; i < errMessages.length; i++) {
       errMessages[i].textContent = "";
    }
}