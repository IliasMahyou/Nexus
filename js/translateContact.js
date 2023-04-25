let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let darkH = document.querySelector(".darkH");

link.forEach((el) => {
  el.addEventListener("click", () => {
    let attr = el.getAttribute("language");
    talen.textContent = data[attr].talen;
    darkH.textContent = data[attr].darkH;
  });
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
