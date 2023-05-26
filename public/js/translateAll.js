let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let para = document.querySelector("p");
let titleAbout = document.querySelector(".titleAbout");
let darkH = document.querySelector(".darkH");
let h2 = document.querySelector("h2");
let th = document.querySelectorAll("th");
let titleHome = document.querySelector(".titleHome");
let errorMelding = document.getElementById("errNoReferencenumber");
let compareButton = document.querySelector(".button__text");

var currentPage = window.location.pathname;
let data = {};
if (currentPage == "/about") {
data = {
  dutch: {
    talen: "NL",
    titleAbout: "Over ons",
    para: "Nexus is een toonaangevende specialist in het ontwerpen van innovatieve webapplicaties. Met ons toegewijde team van IT-professionals streven we naar uitmuntendheid en zijn we trots op onze hoogwaardige oplossingen en uitstekende klantenservice. We geloven in open communicatie, samenwerking en wederzijds respect, en kijken ernaar uit om met u samen te werken.",
    darkH: "Ontmoet het team",
  },
  english: {
    talen: "EN",
    titleAbout: "About us",
    para: "Nexus is a leading specialist in designing innovative web applications. With our dedicated team of IT professionals, we strive for excellence and pride ourselves on our high-quality solutions and excellent customer service. We believe in open communication, collaboration and mutual respect, and look forward to working with you.",
    darkH: "Meet the team",
  },
  french: {
    talen: "FR",
    titleAbout: "À propos de nous",
    para: "Nexus est un spécialiste de premier plan dans la conception d'applications Web innovantes. Avec notre équipe dévouée de professionnels de l'informatique, nous visons l'excellence et sommes fiers de nos solutions de haute qualité et de notre excellent service client. Nous croyons en la communication ouverte, la collaboration et le respect mutuel, et nous sommes impatients de travailler avec vous.",
    darkH: "Rencontrez l'équipe",
  },
};
} else if (currentPage == "/contact") {
data = {
  dutch: {
    talen: "NL",
    darkH: "Contacteer ons",
  },
  english: {
    talen: "EN",
    darkH: "Contact us",
  },
  french: {
    talen: "FR",
    darkH: "Contactez-nous",
  },
};
} else if (currentPage == "/home") {
data = {
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
} else if (currentPage == "/history") {
data = {
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
}



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
    if (currentPage == "/about") {
    talen.textContent = data[selectedLanguage].talen;
    titleAbout.textContent = data[selectedLanguage].titleAbout;
    para.textContent = data[selectedLanguage].para;
    darkH.textContent = data[selectedLanguage].darkH;
  }
  else if (currentPage == "/contact") {
    talen.textContent = data[selectedLanguage].talen;
    darkH.textContent = data[selectedLanguage].darkH;
  }
  else if (currentPage == "/home") {
    talen.textContent = data[selectedLanguage].talen;
    para.textContent = data[selectedLanguage].para;
    if (errorMelding)
    {
      errorMelding.textContent = data[selectedLanguage].errorMelding;
    }
    titleHome.textContent = data[selectedLanguage].titleHome;
    compareButton.textContent = data[selectedLanguage].compareButton;
    for (let i = 0; i < th.length; i++) {
      th[i].textContent = data[selectedLanguage].th[i];
    }
  }
  else if (currentPage == "/history") {
    talen.textContent = data[selectedLanguage].talen;
    h2.textContent = data[selectedLanguage].h2;
    for (let i = 0; i < th.length; i++) {
      th[i].textContent = data[selectedLanguage].th[i];
    }
  } 
}
}

window.addEventListener("pageshow", updateLanguage);
