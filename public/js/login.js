function createMessageBox(messageText) {
 
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "9998";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  document.body.appendChild(overlay);


  const messageBox = document.createElement("div");
  messageBox.id = "messageBox";
  messageBox.style.position = "fixed";
  messageBox.style.zIndex = "9999";
  messageBox.style.top = "50%";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translate(-50%, -50%)";
  messageBox.style.backgroundColor = "white";
  messageBox.style.padding = "20px";
  messageBox.style.borderRadius = "10px";

  const message = document.createElement("p");
  message.textContent = messageText;
  messageBox.appendChild(message);

  const okButton = document.createElement("button");
  okButton.id = "okButton";
  okButton.textContent = "OK";
  okButton.addEventListener("click", function () {
    messageBox.remove();
    overlay.remove();
  });
  messageBox.appendChild(okButton);

  
  document.body.appendChild(messageBox);
}

document.addEventListener("DOMContentLoaded", function () {
  const loginSubmit = document.getElementById("submit");

  loginSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "test" && password === "test") {
      sessionStorage.setItem("isLoggedIn", "true");
      createMessageBox("Logged in successfully");
      setTimeout(() => {
        window.location.href = "./home";
      }, 1000);
    } else {
      createMessageBox("Fout wachtwoord of e-mailadres, probeer opnieuw.");
    }
  });
});