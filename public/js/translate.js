/*Constanten*/
const langs = document.querySelectorAll('translator__ul--dropdown a');//Het talenmenu
const nav = document.getElementsByClassName('menu__li a');//De navigatielinken
const lang = document.getElementById('lang');//De huidige paginataal
const para = document.getElementsByTagName('p')[0];//De paragraaf in de huidige pagina
const h1 = document.getElementsByTagName('h1')[0];//De hoofdtitel van de huidige pagina
const currentPage = window.location.pathname;//Het huidig paginapad
//De Nederlandstalige navigatielinken
const navNL = [
  "Home",
  "Zoekgeschiedenis",
  "Over ons",
  "Contact"
];
//De Engelstalige navigatielinken
const navEN = [
  "Home",
  "Search History",
  "About us",
  "Contact"
];
//De Franstalige navigatielinken
const navFR = [
  "Home",
  "Historique des recherches",
  "À propos de nous",
  "Contact"
];

/*Variabelen*/
let data = {};//De vertaling van de huidige pagina
let comparisonErr;//De foutmelding van de vergelijkingstool
let btnCompare;//De vergelijkingsknop
let th;//Alle tabeltussentitels
let h2;//De subtitel in de huidige pagina
let btnSubmit;////De indienknop
let name;//Het naamveld in het contactformulier
let subject;//Het onderwerpveld in het contactformulier
let message;//Het berichtveld in het contactformulier
let search;//De zoekbalktekst

//Als de gebruiker zich bevindt op een van onderstaande pagina's, dan worden de vertalingen van die pagina opgehaald
switch (currentPage) {
    case '/home':
    comparisonErr = document.getElementById('home__comparison-error');
    btnCompare = document.getElementsByClassName('button__text')[0];
    th = document.getElementsByTagName('th');
    h2 = document.getElementsByTagName('h2')[0];
    data = {
      dutch: {
        lang: "nl",
        h1: "Vergelijkingstool",
        para: "Welkom bij Nexus, waar we ons richten op het leveren van innovatieve en nuttige tools om het leven van onze klanten gemakkelijker te maken. Onderaan de pagina vindt u een unieke vergelijkingstool waarmee de jaarrekeningen van twee bedrijven met elkaar vergeleken kunnen worden. Deze tool is ontwikkeld om u te helpen weloverwogen beslissingen te nemen bij het beoordelen van de financiële gezondheid van bedrijven. Onze vergelijkingstool is eenvoudig in gebruik en biedt u snel en nauwkeurig inzicht in de financiële prestaties van de bedrijven die u vergelijkt.",
        h2: "Vergelijkingstool",
        comparisonErr: "Vul twee ondernemingsnummers in",
        btnCompare: "Vergelijk",
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
          "BedrijfsWinst:"
        ]
      },
      english: {
        lang: "en",
        h1: "Comparison tool",
        para: "Welcome to Nexus, where we focus on providing innovative and useful tools to make our customers' lives easier. At the bottom of the page you will find a unique comparison tool with which the annual accounts of two companies can be compared. This tool is designed to help you make informed decisions when assessing the financial health of companies. Our comparison tool is easy to use and gives you a quick and accurate insight into the financial performance of the companies you compare.",
        h2: "Comparison tool",
        comparisonErr: "Enter two company numbers",
        btnCompare: "Compare",
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
          "Operating profit:"
        ]
      },
      french: {
        lang: "fr",
        h1: "Outil de comparaison",
        para: "Bienvenue chez Nexus, où nous nous concentrons sur la fourniture d'outils innovants et utiles pour faciliter la vie de nos clients. En bas de page, vous trouverez un outil de comparaison unique avec lequel les comptes annuels de deux entreprises peuvent être comparés. Cet outil est conçu pour vous aider à prendre des décisions éclairées lors de l'évaluation de la santé financière des entreprises. Notre outil de comparaison est facile à utiliser et vous donne un aperçu rapide et précis de la performance financière des entreprises que vous comparez.",
        comparisonErr: "Entrez deux numéros d'entreprise",
        h2: "Outil de comparaison",
        btnCompare: "Comparer",
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
          "Résultat d'exploitation:"
        ]
      }
    };
    break;
  case '/about':
    h2 = document.getElementsByTagName('h2')[0];
    data = {
      dutch: {
        lang: "nl",
        h1: "Over ons", 
        para: "Nexus is een toonaangevende specialist in het ontwerpen van innovatieve webapplicaties. Met ons toegewijde team van IT-professionals streven we naar uitmuntendheid en zijn we trots op onze hoogwaardige oplossingen en uitstekende klantenservice. We geloven in open communicatie, samenwerking en wederzijds respect, en kijken ernaar uit om met u samen te werken.",
        h2: "Ontmoet het team"
      },
      english: {
        lang: "en",
        h1: "About us",
        para: "Nexus is a leading specialist in designing innovative web applications. With our dedicated team of IT professionals, we strive for excellence and pride ourselves on our high-quality solutions and excellent customer service. We believe in open communication, collaboration and mutual respect, and look forward to working with you.",
        h2: "Meet the team"
      },
      french: {
        lang: "fr",
        h1: "À propos de nous",
        para: "Nexus est un spécialiste de premier plan dans la conception d'applications Web innovantes. Avec notre équipe dévouée de professionnels de l'informatique, nous visons l'excellence et sommes fiers de nos solutions de haute qualité et de notre excellent service client. Nous croyons en la communication ouverte, la collaboration et le respect mutuel, et nous sommes impatients de travailler avec vous.",
        h2: "Rencontrez l'équipe"
      }
    };
    break;
  case '/contact':
    btnSubmit = document.getElementsByClassName('submit__button')[0];
    name = document.getElementById('name');
    subject = document.getElementById('subject');
    message = document.getElementById('message');
    data = {
      dutch: {
        lang: "nl",
        h1: "Contacteer ons",
        name: "Naam",
        subject: "Onderwerp",
        message: "Bericht",
        btnSubmit: "Verzend"
      },
      english: {
        lang: "en",
        h1: "Contact us",
        name: "Name",
        subject: "Subject",
        message: "Message",
        btnSubmit: "Submit"
      },
      french: {
        lang: "fr",
        h1: "Contactez-nous",
        name: "Nom",
        subject: "Sujet",
        message: "Message",
        btnSubmit: "Envoyez"
      }
    };
    break;
  default:
    search = document.getElementById('search');
    th = document.getElementsByTagName('th');
    data = {
      dutch: {
        lang: "nl",
        h1: "Zoekgeschiedenis",
        search: "Zoeken",
        th: [
          "Ondernemingsnummer:",
          "Adres:",
          "Datum neerlegging:",
          "Eigen vermogen:",
          "Schulden:",
          "Winst:"
        ]
      },
      english: {
        lang: "en",
        h1: "Search history",
        search: "Search",
        th: [
          "Company number:",
          "Adres:",
          "Date of deposit:",
          "Equity:",
          "Debts:",
          "Profit:"
        ]
      },
      french: {
        lang: "fr",
        h1: "Historique de recherche",
        search: "Recherche",
        th: [
          "Numéro d'entreprise:",
          "Adresse:",
          "Date de dépôt:",
          "Capitaux propres:",
          "Dettes:",
          "Profit:"
        ]
      }
    };
    break;
}

/*Functies*/
//Vertaalt de huidige pagina
function updateLanguage(selectedLanguage) {
  let langPackage;//De opgevraagde vertalingen voor de huidige webpagina
  //Afhankelijk van de gekozen taalkeuze wordt de taalkeuze opgeslagen navigatie toepasselijk vertaald
  switch (selectedLanguage) {
    case 'nl':
      langPackage = data.dutch;
      //Voor elke navigatielink wordt deze vertaalt in het Nederlands
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navNL[i];
      }
      break;
    case 'en':
      langPackage = data.english;
      //Voor elke navigatielink wordt deze vertaalt in het Engels
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navEN[i];
      }
      break;
    case 'fr':
      langPackage = data.french;
      //Voor elke navigatielink wordt deze vertaalt in het Frans
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navFR[i];
      }
      break;
  }
  lang.textContent = langPackage.lang;
  //Afhankelijk van de actieve pagina wordt die pagina toepasselijk vertaald
  switch (currentPage) {
    case '/home':
      h1.textContent = langPackage.h1;
      para.textContent = langPackage.para;
      //Als er een foutmelding is, dan wordt deze ook vertaald
      if (comparisonErr != null) {
        comparisonErr.textContent = langPackage.comparisonErr;
      }
      h2.textContent = langPackage.h2;
      btnCompare.textContent = langPackage.btnCompare;
      //Voor elke tabeltussentitel wordt deze vertaalt
      for (let i = 0; i < th.length; i++) {
        th[i].textContent = langPackage.th[i];
      }
      break;
    case '/about':
      h1.textContent = langPackage.h1;
      para.textContent = langPackage.para;
      h2.textContent = langPackage.h2;
      break;
    case '/contact':
      h1.textContent = langPackage.h1;
      name.setAttribute('placeholder', langPackage.name);
      subject.setAttribute('placeholder', langPackage.subject);
      message.setAttribute('placeholder', langPackage.message);
      btnSubmit.setAttribute('value', langPackage.btnSubmit);
      break;
    default:
      h1.textContent = langPackage.h1;
      search.setAttribute('placeholder', langPackage.search);
      //Voor elke tabeltussentitel wordt deze vertaalt
      for (let i = 0; i < th.length; i++) {
        th[i].textContent = langPackage.th[i];
      }
      break;
  }
}