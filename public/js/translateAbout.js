let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let para = document.querySelector("p");
let titleAbout = document.querySelector(".titleAbout");
let darkH = document.querySelector(".darkH");

let data = {
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
    titleAbout.textContent = data[selectedLanguage].titleAbout;
    para.textContent = data[selectedLanguage].para;
    darkH.textContent = data[selectedLanguage].darkH;
  }
}

window.addEventListener("pageshow", updateLanguage);
