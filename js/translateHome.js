let langs = document.querySelector("body");
let link = document.querySelectorAll("a");
let talen = document.querySelector(".talen");
let para = document.querySelector("p");
let titleHome = document.querySelector(".titleHome");
let compareButton = document.querySelector(".compare-button");
let th = document.querySelectorAll("th");
let translateHistory = document.querySelector(".translateHistory");
let li = document.querySelectorAll(".li");

link.forEach(el=>{
     el.addEventListener("click", ()=>{
          langs.querySelector(".active").classList.remove("active");
          el.classList.add("active");

          let attr = el.getAttribute("language")
          talen.textContent = data[attr].talen
          para.textContent = data[attr].para
          titleHome.textContent = data[attr].titleHome
          compareButton.textContent = data[attr].compareButton
          for(let i = 0; i < th.length; i++){
               th[i].textContent = data[attr].th[i]
          }
          translateHistory.textContent = data[attr].translateHistory
          for(let i = 0; i < li.length; i++){
               li[i].textContent = data[attr].li[i]
          }
     })
})

let data = {
     dutch: {
          talen: "Nederlands",
        para: "Lorem Ipsum is een eenvoudige dummytekst van de druk- en zetterijindustrie. Lorem Ipsum is in de zeventiende eeuw als 'een normale tekst' gebruikt. Hierdoor is het niet alleen vijf eeuwen, maar ook de sprong naar elektronische typesetting, blijvend essentieel. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages, en meer recentelijk door desktop publishing software zoals Aldus PageMaker met versies van Lorem Ipsum.",
        titleHome: "Vergelijkingstool",
        compareButton: "Vergelijk",
        th: ["Naam:", "Adres:", "Datum neerlegging:", "Eigen vermogen:", "Schulden:", "BedrijfsWinst:", "Naam:", "Adres:", "Datum neerlegging:", "Eigen vermogen:", "Schulden:", "BedrijfsWinst:"],
        translateHistory: "Recent searches",
        li: ["Bedrijf A", "Bedrijf B","Bedrijf C", "Bedrijf D","Bedrijf E", "Bedrijf F", "Bedrijf G", "Bedrijf H","Bedrijf I", "Bedrijf J"]

   },
     english: {
            talen: "English",
          para: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          titleHome: "comparison tool",
          compareButton: "Compare",
          th: ["Name:", "Adres:", "Date of filing:", "Equity:", "Debts:", "Operating profit: ", "Name:", "Adres:", "Date of filing:", "Equity:", "Debts:", "Operating profit:"],
          translateHistory: "Recent searches",
          li: ["Company A", "Company B","Company C", "Company D","Company E", "Company F", "Company G", "Company H","Company I", "Company J"]

     },
     french: {
          talen: "Français",
        para: "Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        titleHome: "Outil de comparaison",
        compareButton: "Comparer",
        th: ["Nom:", "Adres:", "Date de dépôt:", "Capital:", "Dettes:", "Résultat d'exploitation:", "Nom:", "Adres:", "Date de dépôt:", "Capital:", "Dettes:", "Résultat d'exploitation:"],
        translateHistory: "Recent searches",
        li: ["Entreprise A", "Entreprise B","Entreprise C", "Entreprise D","Entreprise E", "Entreprise F", "Entreprise G", "Entreprise H","Entreprise I", "Entreprise J"]

   }
}