//Bedrijfsinfovenster tevoorschijn laten komen bij het kiezen van een bedrijf uit de historiek.
function showInfo(element) {
    document.getElementById("company-info").style.display = "block";
    document.addEventListener("click", (event) => {
        if (document.getElementById("company-info").contains(event.target)) {
            document.getElementById("company-info").style.display = "none";
        };
    })
}