/*Importatie*/
import { userExists } from '../ts/db.js';

/*Constantedeclaratie*/
const frmLogin = document.forms.namedItem('frmLogin');//Loginformulier

/*Synchrone functies*/
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

const button = document.getElementById("submit");
button.addEventListener("click",function (event) {
   validateLogin();
   event.preventDefault();
});