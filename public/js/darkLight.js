const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

const savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
  enableDarkMode();
}

toggle.addEventListener("change", () => {
  if (body.classList.contains("dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  body.classList.add("dark");
  sunIcon.className = "bx bx-sun";
  moonIcon.className = "bx bxs-moon";
  localStorage.setItem("mode", "dark");
}

function disableDarkMode() {
  body.classList.remove("dark");
  sunIcon.className = "bx bxs-sun";
  moonIcon.className = "bx bx-moon";
  localStorage.setItem("mode", "light");
}
