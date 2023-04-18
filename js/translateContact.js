let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let darkH = document.querySelector(".darkH");

link.forEach(el=>{
     el.addEventListener("click", ()=>{
          langs.querySelector(".active").classList.remove("active");
          el.classList.add("active");

          let attr = el.getAttribute("language")
          talen.textContent = data[attr].talen
          darkH.textContent = data[attr].darkH
     })
})

let data = {
     dutch: {
          talen: "Nederlands",
        darkH: "Contacteer ons",

   },
     english: {
            talen: "English",
        darkH: "Contact us",

     },
     french: {
          talen: "Français",
        darkH: "Contactez-nous",

   }
}