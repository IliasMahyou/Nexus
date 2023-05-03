function isDarkModeEnabled() {
    return localStorage.getItem("darkMode") === "true";
  }
  
  function showMessage(title, message) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "9998";
    overlay.style.backgroundColor = isDarkModeEnabled() ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)";
    document.body.appendChild(overlay);
  
    const messageBox = document.createElement("div");
    messageBox.style.position = "fixed";
    messageBox.style.zIndex = "9999";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = isDarkModeEnabled() ? "#333" : "white";
    messageBox.style.color = isDarkModeEnabled() ? "#fff" : "black";
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "10px";
  
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    messageBox.appendChild(titleElement);
  
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageBox.appendChild(messageElement);
  
    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.backgroundColor = "#007BFF";
    okButton.style.color = "white";
    okButton.style.border = "none";
    okButton.style.padding = "8px 16px";
    okButton.style.borderRadius = "4px";
    okButton.style.cursor = "pointer";
    okButton.style.fontSize = "14px";
    okButton.style.marginTop = "10px";
    okButton.addEventListener("click", function () {
      messageBox.remove();
      overlay.remove();
    });
    messageBox.appendChild(okButton);
  
    document.body.appendChild(messageBox);
  }
  
document.addEventListener("DOMContentLoaded", function () {
    const NBBLink = document.getElementById("NBB-link");
  
    NBBLink.addEventListener("click", function (event) {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  
      if (isLoggedIn !== "true") {
        event.preventDefault();
        showMessage("Je moet je aanmelden om deze functie te gebruiken.");
      }
    });
  });
  