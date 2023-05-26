let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let para = document.querySelector("p");
let titleHome = document.querySelector(".titleHome");
let errorMelding = document.getElementById("errNoReferencenumber");
let compareButton = document.querySelector(".compare-button");
let th = document.querySelectorAll("th");

link.forEach((el) => {
  el.addEventListener("click", () => {
    let attr = el.getAttribute("language");
    talen.textContent = data[attr].talen;
    para.textContent = data[attr].para;
    if (errorMelding)
    {
      errorMelding.textContent = data[attr].errorMelding;
    }
    titleHome.textContent = data[attr].titleHome;
    compareButton.textContent = data[attr].compareButton;
    for (let i = 0; i < th.length; i++) {
      th[i].textContent = data[attr].th[i];
    }
    translateHistory.textContent = data[attr].translateHistory;
    for (let i = 0; i < li.length; i++) {
      li[i].textContent = data[attr].li[i];
    }
  });
});

let data = {
  dutch: {
    talen: "NL",
    para: "Welkom bij Nexus, waar we ons richten op het leveren van innovatieve en nuttige tools om het leven van onze klanten gemakkelijker te maken. Onderaan de pagina vindt u een unieke vergelijkingstool waarmee de jaarrekeningen van twee bedrijven met elkaar vergeleken kunnen worden. Deze tool is ontwikkeld om u te helpen weloverwogen beslissingen te nemen bij het beoordelen van de financiële gezondheid van bedrijven. Onze vergelijkingstool is eenvoudig in gebruik en biedt u snel en nauwkeurig inzicht in de financiële prestaties van de bedrijven die u vergelijkt.",
    errorMelding: "Vul twee ondernemingsnummers in",
    titleHome: "Vergelijkingstool",
    compareButton: "Vergelijk",
    th: [
      "Naam:",
      "Adres:",
      "Datum neerlegging:",
      "Eigen vermogen:",
      "Schulden:",
      "BedrijfsWinst:",
      "Naam:",
      "Adres:",
      "Datum neerlegging:",
      "Eigen vermogen:",
      "Schulden:",
      "BedrijfsWinst:",
    ],
  },
  english: {
    talen: "EN",
    para: "Welcome to Nexus, where we focus on providing innovative and useful tools to make our customers' lives easier. At the bottom of the page you will find a unique comparison tool with which the annual accounts of two companies can be compared. This tool is designed to help you make informed decisions when assessing the financial health of companies. Our comparison tool is easy to use and gives you a quick and accurate insight into the financial performance of the companies you compare.",
    errorMelding: "Enter two company numbers",
    titleHome: "comparison tool",
    compareButton: "Compare",
    th: [
      "Name:",
      "Adres:",
      "Date of filing:",
      "Equity:",
      "Debts:",
      "Operating profit: ",
      "Name:",
      "Adres:",
      "Date of filing:",
      "Equity:",
      "Debts:",
      "Operating profit:",
    ],
  },
  french: {
    talen: "FR",
    para: "Bienvenue chez Nexus, où nous nous concentrons sur la fourniture d'outils innovants et utiles pour faciliter la vie de nos clients. En bas de page, vous trouverez un outil de comparaison unique avec lequel les comptes annuels de deux entreprises peuvent être comparés. Cet outil est conçu pour vous aider à prendre des décisions éclairées lors de l'évaluation de la santé financière des entreprises. Notre outil de comparaison est facile à utiliser et vous donne un aperçu rapide et précis de la performance financière des entreprises que vous comparez.",
    errorMelding: "Entrez deux numéros d'entreprise",
    titleHome: "Outil de comparaison",
    compareButton: "Comparer",
    th: [
      "Nom:",
      "Adresse:",
      "Date de dépôt:",
      "Capitaux propres:",
      "Dettes:",
      "Résultat d'exploitation:",
      "Nom:",
      "Adresse:",
      "Date de dépôt:",
      "Capitaux propres:",
      "Dettes:",
      "Résultat d'exploitation:",
    ],
  },
};
