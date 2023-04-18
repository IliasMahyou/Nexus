const formlogin = document.forms.namedItem("formlogin");


const validateLogin = () =>{
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
    if (email === "Nexus@gmail.com" && password === "NBB") {
     window.location.href = "./index.html";
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