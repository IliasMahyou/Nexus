/*Constanten*/
const body = document.getElementsByTagName('body')[0];//De pagina
const toggle = document.getElementById('toggle');//De kleurmodusknop
const sunIcon = document.getElementsByClassName("bxs-sun")[0];//Het zon-icoontje
const moonIcon = document.getElementsByClassName("bx-moon")[0];//Het maan-icoontje
const savedMode = localStorage.getItem("mode");//De huidige kleurmodus

/*Functies*/
//Activeert donkere modus en bewaart deze keuze
function enableDarkMode() {
  body.classList.add("body--dark");
  sunIcon.className = "bx bx-sun";
  moonIcon.className = "bx bxs-moon";
  localStorage.setItem("mode", "dark");
}
//Deactiveert donkere modus en bewaart deze keuze
function disableDarkMode() {
  body.classList.remove("body--dark");
  sunIcon.className = "bx bx-sun";
  moonIcon.className = "bx bxs-moon";
  localStorage.setItem("mode", "light");
}


//Als de huidige kleurmodus 'donker' is, dan wordt de donkere modus ingeschakeld
if (savedMode === "dark") {
  enableDarkMode();
}
//Kleurmodus wijzigen bij het togglen van de kleurmodusknop
toggle.addEventListener("change", () => {
  //Als de huidige webpagina in donkere modus stond, dan wordt de webpagina in lichte modus gezet, anders omgekeerd 
  if (body.classList.contains("body--dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});