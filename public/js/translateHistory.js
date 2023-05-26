let talen = document.querySelector(".talen");
let h2 = document.querySelector("h2");
let th = document.querySelectorAll("th");
let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
  
let data = {
    dutch: {
        talen: "NL",
        h2: "Zoekgeschiedenis",
        th: [
            "Ondernemingsnummer:",
            "Adres:",
            "Datum neerlegging:",
            "Eigen vermogen:",
            "Schulden:",
            "Winst:",
        ],
    },
    english: {
        talen: "EN",
        h2: "Search history",
        th: [
            "Company number:",
            "Adres:",
            "Date of deposit:",
            "Equity:",
            "Debts:",
            "Profit:",
        ],
    },
    french: {
        talen: "FR",
        h2: "Historique de recherche",
        th: [
            "Numéro d'entreprise:",
            "Adresse:",
            "Date de dépôt:",
            "Capitaux propres:",
            "Dettes:",
            "Profit:",
        ],
    },
};

link.forEach((el) => {
    el.addEventListener("click", () => {
      let attr = el.getAttribute("language");
      localStorage.setItem("language", attr);
      updateLanguage();
    });
  });
  
function updateLanguage() {
let selectedLanguage = localStorage.getItem("language");
    if (selectedLanguage) {
        talen.textContent = data[selectedLanguage].talen;
        h2.textContent = data[selectedLanguage].h2;
    for (let i = 0; i < th.length; i++) {
        th[i].textContent = data[selectedLanguage].th[i];
    }
  }
}
  
  window.addEventListener("pageshow", updateLanguage); 