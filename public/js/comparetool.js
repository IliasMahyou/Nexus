
/*Constantedeclaraties*/
const frmComparison = document.forms.namedItem("frmComparison");
/*Synchrone functies*/
document.getElementById("btnCompare").addEventListener("click", function(event){
    event.preventDefault()
});
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
    number == 1 ? "Eerste" : "Tweede";
    frmComparison.insertAdjacentHTML("afterend", `<span class="errMessage">${number} ondernemingsnummer is niet gevonden.</span>`)
}
function deleteErr() {
    const errMessages = document.getElementsByClassName("errMessage");
    for (let i= 0; i < errMessages.length; i++) {
       errMessages[i].textContent = "";
    }
}
function createCompany(companyData) {
    const name = companyData.EnterpriseName;
    const referencenumber = companyData.ReferenceNumber;
    const address = companyData.Address.Street + " " + companyData.Address.Number;
    let equities, debts, profit;
    for (let i = 0; i < companyData.Rubrics.length; i++) {
        if (companyData.Rubrics[i].Code == "10/15" && companyData.Rubrics[i].Period == "N") {
            equities = companyData.Rubrics[i].Value;
        }
        if (companyData.Rubrics[i].Code == "17/49" && companyData.Rubrics[i].Period == "N") {
            debts = companyData.Rubrics[i].Value;
        }
        if (companyData.Rubrics[i].Code == "9905" && companyData.Rubrics[i].Period == "N") {
            profit = companyData.Rubrics[i].Value;
        }
    }
    return company = {
        name: name,
        referencenumber: referencenumber,
        address: address,
        equities: equities,
        debts: debts,
        profit: profit
    }
}
function showCompany(company, number) {
    fillIn(`company${number}Name`, company.name);
    fillIn(`company${number}Address`, company.address);
    //fillIn(`company${number}Date`, company.date);
    fillIn(`company${number}Equity`, company.equities);
    fillIn(`company${number}Debts`, company.debts);
    fillIn(`company${number}Profit`, company.profit);
}
/*Asynchrone functies*/
async function compare() {
    //VOORLOPIG NOG HARDCODED USER
    const user = {name:"nexusAdmin"}
    db.addUser(user.name);//DEZE VOORLOPIG HARDCODED NOG TOEVOEGING IN COLLECTIE USERS
    //NOG FOUTAFHANDELING VOOR ONDERNEMINGSNUMMER DIE DE API NIET KAN VINDEN
    const company1Number = frmComparison["company1"].value;
    const company2Number = frmComparison["company2"].value;
    let counter = 0;
    let company1, company2;
    if (company1Number != null && company1Number != "") {
        if (companyExist(company1Number)) {
            company1 = fetchCompany(company1Number);
        } else {
            const company1Data = firstApiCall(company1Number, secondApiCall());
            company1 =  createCompany(company1Data);    
        }
        await addCompany(company1);
        await showCompany(company1, 1);
        await addToHistory(user.name, company1.referencenumber)
        counter++;
    } else {
        showErr(1);
    }
    if (company2Number != null && company2Number != "") {
        if (companyExist(company1Number)) {
            company2 = fetchCompany(company1Number);
        } else {
            const company2Data = firstApiCall(company2Number, secondApiCall());
            company2 =  createCompany(company2Data);
        }
        await addCompany(company2);
        await showCompany(company2, 2);
        await addToHistory(user.name, company2.referencenumber)
        counter++;
    } else {
        showErr(2);
    }
    if (counter == 2) {
        deleteErr();
        markDifferences(company1, company2);
    }
}