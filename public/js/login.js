const formlogin = document.forms.namedItem("frmLogin");
const CryptoJS = require("crypto-js");
const validateLogin = () =>{
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
    if (email === "Nexus@gmail.com" && password === "NBB") {
     window.location.href = "home";
    } else {
      alert("Fout wachtwoord of email address probeer opnieuw!");
      window.location.reload();
    } 
}

const button = document.getElementById("submit-button");
button.addEventListener("click",function (event) {
   validateLogin();
   event.preventDefault();
});

const hash = CryptoJS.SHA256("NBB").toString();
console.log(hash);