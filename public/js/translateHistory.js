let talen = document.querySelector(".talen");
let h2 = document.querySelector("h2");
let th = document.querySelectorAll("th");
let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let para = document.querySelector("p");
let titleHome = document.querySelector(".titleHome");
let errorMelding = document.getElementById("errNoReferencenumber");
let compareButton = document.querySelector(".compare-button");

link.forEach((el) => {
    el.addEventListener("click", () => {
        let attr = el.getAttribute("language");
        talen.textContent = data[attr].talen;
        h2.textContent = data[attr].h2;
        for (let i = 0; i < th.length; i++) {
        th[i].textContent = data[attr].th[i];
        }
    });
    }
);

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
