const figures = document.querySelectorAll("figure");

function isDarkModeEnabled() {
  return localStorage.getItem("darkMode") === "true";
}

figures.forEach(function (figure) {
  if (figure.id != "NBB") {
    figure.addEventListener("click", function () {
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
      messageBox.id = "messageBox";
      messageBox.style.position = "fixed";
      messageBox.style.zIndex = "9999";
      messageBox.style.top = "50%";
      messageBox.style.left = "50%";
      messageBox.style.transform = "translate(-50%, -50%)";
      messageBox.style.backgroundColor = isDarkModeEnabled() ? "#333" : "white";
      messageBox.style.color = isDarkModeEnabled() ? "#fff" : "black";
      messageBox.style.padding = "20px";
      messageBox.style.borderRadius = "10px";
      
      const message = document.createElement("p");
      message.textContent = "Dit is niet mijn project.";
      messageBox.appendChild(message);

      const okButton = document.createElement("button");
      okButton.id = "okButton";
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
    });
  }
});