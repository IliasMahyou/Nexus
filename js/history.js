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
    document.getElementById("section-companyInfo").style.display = "block";
}