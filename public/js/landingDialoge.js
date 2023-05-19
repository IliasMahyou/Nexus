function openDialog(gameName) {
    const dialog = document.getElementById(`${gameName}Dialog`);
    dialog.showModal();
  }
  
  function closeDialog(gameName) {
    const dialog = document.getElementById(`${gameName}Dialog`);
    dialog.close();
  }
  