let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let darkH = document.querySelector(".darkH");

link.forEach((el) => {
  el.addEventListener("click", () => {
    let attr = el.getAttribute("language");
    localStorage.setItem("language", attr);
    let selectedLanguage = localStorage.getItem("language");
    
    talen.textContent = data[selectedLanguage].talen;
    darkH.textContent = data[selectedLanguage].darkH;
  });
});

window.addEventListener("load", () => {
  let selectedLanguage = localStorage.getItem("language");
  if (selectedLanguage) {
    talen.textContent = data[selectedLanguage].talen;
    darkH.textContent = data[selectedLanguage].darkH;
  }
});
let data = {
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
}
