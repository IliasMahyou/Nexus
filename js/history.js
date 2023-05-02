/*Importatie*/
import * as db from './db.js';
/*Synchrone functies*/
function fillIn(id, content) {
    document.getElementById(id).textContent = content;
}
function showCompanyInfo(company) {
    fillIn("companyName", company.name);
    fillIn("companyNumber", company.referencenumber);
    fillIn("companyAddress", company.address);
    fillIn("companyDate", company.depositeDate);
    fillIn("companyEquity", company.equity);
    fillIn("companyDebts", company.debts);
    fillIn("companyProfit", company.profit);
    document.getElementById("section-companyInfo").style.display = "block";
}
/*Asynchrone functies*/
async function showHistory(username){
    const companiesList = db.fetchHistory(username);
    for (const company of companiesList) {
        document.getElementById("section-history").insertAdjacentHTML("afterbegin",`<div class="company" onclick="showCompanyInfo(${company})"><h3>${company.name}</h3><br><span>${company.referencenumber}</span></div>`);
    }
}