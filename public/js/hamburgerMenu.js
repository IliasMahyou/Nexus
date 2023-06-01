//BRON: https://dev.to/ljcdev/easy-hamburger-menu-with-js-2do0
/*Constanten*/
const menu = document.querySelector(".nav__menu");//Het navigatiemenu
const menuItems = document.querySelectorAll(".menu__li");//De navigatielinken
const hamburger = document.querySelector(".menu__button--mobile");//Het hamburgermenu
const closeIcon = document.querySelector(".icon--close");//Het open-icoon van het hamburgermenu
const menuIcon = document.querySelector(".icon--open");//Het gesloten icoon van het hamburgermenu

/*Functies*/
//Opent en sluit het hamburgermenu
function toggleMenu() {
  //Als het hamburgermenu getoond wordt, dan wordt deze uitgezet, anders wordt deze aangezet
  if (menu.classList.contains("nav__menu--show")) {
    menu.classList.remove("nav__menu--show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("nav__menu--show");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}