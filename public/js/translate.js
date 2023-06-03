/*Constanten*/
const langs = document.querySelectorAll('translator__ul--dropdown a');//Het talenmenu
const nav = document.querySelectorAll('.menu__li a');//De navigatielinken
const lang = document.getElementById('lang');//De huidige paginataal
const para = document.getElementsByTagName('p')[0];//De paragraaf in de huidige pagina
const h1 = document.getElementsByTagName('h1')[0];//De hoofdtitel van de huidige pagina
const footer = document.getElementById('sourcelink');//De voetlink
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
const footerNL = "Bronvermeldingen";//De Nederlandstalige voetlink
const footerEN = "Source references";//De Engelstalige voetlink
const footerFR = "Sources d'informations";//De Franstalige voetlink

/*Variabelen*/
let data = {};//De vertaling van de huidige pagina
let comparisonErr;//De foutmelding van de vergelijkingstool
let btnCompare;//De vergelijkingsknop
let th;//Alle tabeltussentitels
let h2;//De ondertitel in de huidige pagina
let address;//Het adres van Nexus
let name;//Het naamveld in het contactformulier
let mailaddress;//Het e-mailadresveld in het contactformulier
let subject;//Het onderwerpveld in het contactformulier
let message;//Het berichtveld in het contactformulier
let search;//De zoekbalktekst
let btnSubmit;//De indienknop

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
        h1: "Nexus",
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
        h1: "Nexus",
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
        h1: "Nexus",
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
    address = document.getElementById('address');
    name = document.getElementById('name');
    mailaddress = document.getElementById('email');
    subject = document.getElementById('subject');
    message = document.getElementById('message');
    btnSubmit = document.getElementsByClassName('submit__button')[0];
    data = {
      dutch: {
        lang: "nl",
        h1: "Contacteer ons",
        address: "Ellermanstraat 33, 2060 Antwerpen",
        name: "Naam",
        mailaddress: "E-mailadres",
        subject: "Onderwerp",
        message: "Bericht",
        btnSubmit: "Verzend"
      },
      english: {
        lang: "en",
        h1: "Contact us",
        address: "Ellermanstraat 33, 2060 Antwerp",
        name: "Name",
        mailaddress: "Email address",
        subject: "Subject",
        message: "Message",
        btnSubmit: "Submit"
      },
      french: {
        lang: "fr",
        h1: "Contactez-nous",
        address: "Ellermanstraat 33, 2060 Anviers",
        name: "Nom",
        mailaddress: "Adresse e-mail",
        subject: "Sujet",
        message: "Message",
        btnSubmit: "Envoyez"
      }
    };
    break;
    case '/sources':
      h2 = document.getElementsByTagName('h2');
      data = {
        dutch: {
          h1: "Bronvermeldingen",
          h2: [
            "Gebruikte libraries:",
            "Gebruikte open source code:"
          ]
        },
        english: {
          h1: "Source references",
          h2: [
            "Used libraries:",
            "Used open source code:"
          ]
        },
        french: {
          h1: "Sources d'informations",
          h2: [
            "Libraries utilisées:",
            "Logiciel libre utilisées:"
          ]
        }
      }
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
  //De taalkeuze in lokale opslag opslaan
  localStorage.setItem("language", selectedLanguage);
  //Afhankelijk van de gekozen taalkeuze wordt de taalkeuze opgeslagen navigatie en voet toepasselijk vertaald
  switch (selectedLanguage) {
    case 'nl':
      langPackage = data.dutch;
      //Voor elke navigatielink wordt deze vertaalt in het Nederlands
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navNL[i];
      }
      footer.textContent = footerNL;
      break;
    case 'en':
      langPackage = data.english;
      //Voor elke navigatielink wordt deze vertaalt in het Engels
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navEN[i];
      }
      footer.textContent = footerEN;
      break;
    case 'fr':
      langPackage = data.french;
      //Voor elke navigatielink wordt deze vertaalt in het Frans
      for (let i = 0; i < nav.length; i++) {
        nav[i].textContent = navFR[i];
      }
      footer.textContent = footerFR;
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
        if(comparisonErr.textContent == "Vul twee ondernemingsnummers in"){
          if(langPackage.lang == "nl"){
            comparisonErr.textContent = "Vul twee ondernemingsnummers in";
          }else if(langPackage.lang == "en"){
            comparisonErr.textContent = "Fill in two company numbers";
          }else if(langPackage.lang == "fr"){
            comparisonErr.textContent = "Remplissez deux numéros d'entreprise";
          }
        }else if(comparisonErr.textContent == "Vul twee verschillende ondernemingsnummers in"){
          if(langPackage.lang == "nl"){
            comparisonErr.textContent = "Vul twee verschillende ondernemingsnummers in";
          }else if(langPackage.lang == "en"){
            comparisonErr.textContent = "Fill in two different company numbers";
          }else if(langPackage.lang == "fr"){
            comparisonErr.textContent = "Remplissez deux numéros d'entreprise différents";
          }
        }else if(comparisonErr.textContent == "Vul twee geldige ondernemingsnummers in"){
          if(langPackage.lang == "nl"){
            comparisonErr.textContent = "Vul twee geldige ondernemingsnummers in";
          }else if(langPackage.lang == "en"){
            comparisonErr.textContent = "Fill in two valid company numbers";
          }else if(langPackage.lang == "fr"){
            comparisonErr.textContent = "Remplissez deux numéros d'entreprise valides";
          }
        }
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
      address.textContent = langPackage.address;
      name.setAttribute('placeholder', langPackage.name);
      mailaddress.setAttribute('placeholder', langPackage.mailaddress);
      subject.setAttribute('placeholder', langPackage.subject);
      message.setAttribute('placeholder', langPackage.message);
      btnSubmit.setAttribute('value', langPackage.btnSubmit);
      break;
    case '/sources':
      h1.textContent = langPackage.h1;
      //Voor elke ondertitel wordt deze vertaalt
      for (let i = 0; i < h2.length; i++) {
        h2[i].textContent = langPackage.h2[i];
      }
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


//De pagina vertalen met de taalkeuze
updateLanguage(localStorage.getItem("language"))