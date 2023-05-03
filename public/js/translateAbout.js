let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let para = document.querySelector("p");
let titleAbout = document.querySelector(".titleAbout");
let darkH = document.querySelector(".darkH");

link.forEach((el) => {
  el.addEventListener("click", () => {
    let attr = el.getAttribute("language");
    talen.textContent = data[attr].talen;
    titleAbout.textContent = data[attr].titleAbout;
    para.textContent = data[attr].para;
    darkH.textContent = data[attr].darkH;
  });
});

let data = {
  dutch: {
    talen: "NL",
    titleAbout: "Over ons",
    para: "Lorem Ipsum is een eenvoudige dummytekst van de druk- en zetterijindustrie. Lorem Ipsum is in de zeventiende eeuw als 'een normale tekst' gebruikt. Hierdoor is het niet alleen vijf eeuwen, maar ook de sprong naar elektronische typesetting, blijvend essentieel. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages, en meer recentelijk door desktop publishing software zoals Aldus PageMaker met versies van Lorem Ipsum.",
    darkH: "Ontmoet het team",
  },
  english: {
    talen: "EN",
    titleAbout: "About us",
    para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    darkH: "Meet the team",
  },
  french: {
    talen: "FR",
    titleAbout: "À propos de nous",
    para: "Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
    darkH: "Rencontrez l'équipe",
  },
}
