//Bedrijfsinfovenster tevoorschijn laten komen bij het kiezen van een bedrijf uit de historiek.
function showInfo(element) {
    document.getElementById("company-info").style.display = "block";
}
//Bedrijfsinfovenster laten verdwijnen bij het klikken op de knop.
function hideInfo() {
    document.getElementById("company-info").style.display = "none";
}
//Bedrijf na het vergelijken toevoegen in de historiek.
function addToHistory(company) {
    const history = document.querySelector("#history ul");
    history.insertAdjacentHTML("afterbegin", `<li onclick="showInfo(this)">${company.name}</li>`);
}