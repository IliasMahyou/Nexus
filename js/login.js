const formlogin = document.getElementById(".form-body");


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

const button = document.getElementById("submit");
button.addEventListener("click",function (event) {
   validateLogin();
   event.preventDefault();
});