const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

function updateDarkMode(isDark) {
  if (isDark) {
    body.classList.add("dark");
    sunIcon.className = "bx bx-sun";
    moonIcon.className = "bx bxs-moon";
  } else {
    body.classList.remove("dark");
    sunIcon.className = "bx bxs-sun";
    moonIcon.className = "bx bx-moon";
  }
}

toggle.addEventListener("change", () => {
  const isDark = toggle.checked;
  localStorage.setItem("darkMode", isDark);
  updateDarkMode(isDark);
});

document.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  toggle.checked = isDark;
  updateDarkMode(isDark);
});