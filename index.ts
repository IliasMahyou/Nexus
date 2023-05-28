/*Importatie*/
import express from "express"; //Express-functies
import ejs from "ejs";//EJS-templating
import bcrypt from "bcrypt";//Encryptiemethoden
import { getCompanyData } from "./api";//Te gebruiken API-functies
import { User, Company, History } from "./types";//Te gebruiken interfaces
import { userExist, fetchHistory, fetchCompany, connect, addToHistory, addCompany, client } from "./db";//Te gebruiken databankfuncties
import { WithId, Document, W} from "mongodb";//Te gebruiken MongoDb-interfaces

/*Constantedeclaraties*/
const app = express(); //Express-applicatie
//Een "leeg" bedrijf
const emptyCompanyData: Company = {
  name: "",
  referencenumber: "",
  address: "",
  depositDate: "",
  equities: 0,
  debts: 0,
  profit: 0,
};

/*Variabeledeclaraties*/
//De ingelogde gebruiker
let activeUser: User = { 
  username: "",
  password: ""
};
//De lijst met de door ingelogde gebruiker opgezochte bedrijven
let companiesList: Company[] = [];
//Als de actieve gebruiker al dan niet is ingelogd
let isLoggedIn: Boolean = false;

/*Functiedefinities*/
app.set("view engine", "ejs");//EJS-templating instellen
app.set("port", 3000);//Poort 3000 als luisterende poort instellen

app.use(express.json({ limit: "1mb" }));//De maximale grootte van de retournerende JSON-bestanden
app.use(express.urlencoded({ extended: true }));//Request-objecten laten uitlezen als strings of reeksen
app.use(express.static("public"));//Statische assets leesbaar maken

app.get("/", (req: any, res: any) => res.render("landing", { isLoggedIn: isLoggedIn }));//Landingspagina inladen bij de URL: '/'
app.get("/login", (req: any, res: any) => res.render("login"));//Logingpagina inladen bij de URL: '/login'
//Landingpagina inladen bij de URL: '/logout' en de actieve gebruiker uitloggen
app.get("/logout", (req: any, res: any) => {
  activeUser = {
    username: "",
    password: ""
  };
  isLoggedIn = false;
  res.render("landing", { companyData: emptyCompanyData, company2Data: emptyCompanyData, isLoggedIn: isLoggedIn });
});
//Gebruikersrechten controleren bij de URL: '/home'
app.get("/home", (req: any, res: any) => {
  //Als de gebruiker is ingelogd dan wordt de gebruiker doorverwezen naar de homepagina, anders naar de loginpagina
  if (activeUser.username != ""){
    res.render("home", { companyData: emptyCompanyData, company2Data: emptyCompanyData });
  } else{
    res.render("login");
  }
});
//Gebruikersrechten controleren bij de URL: '/history'
app.get("/history", async (req: any, res: any) => {
  //Als de gebruiker is ingelogd dan wordt de gebruiker doorverwezen naar de historiekpagina, anders naar de loginpagina
  if(activeUser.username != ""){
    const userHistory: WithId<Document>[] = await fetchHistory(activeUser.username);//De zoekgeschiedenis van de ingelogde gebruiker
    //Voor elke zoekopdracht in de zoekgeschiedenis van de ingelogde gebruiker wordt het opgezochte bedrijf opgehaald en bijgehouden
    for(const search of userHistory){
      const company: WithId<Document> | null = await fetchCompany(search.referencenumber);//Het opgezochte bedrijf uit de zoekopdracht
      //Als de data van het opgezochte bedrijf kan worden gevonden, dan wordt deze opgehaald en bijgehouden
      if(company != null){
        companiesList.push({
          address: company.address,
          debts: company.debts,
          depositDate: company.depositDate,
          equities: company.equities,
          name: company.name,
          profit: company.profit,
          referencenumber: company.referencenumber
        });
      }
    }
    res.render("history", { searchedCompanies: companiesList, company: emptyCompanyData });
    companiesList = [];
  } else{
    res.render("login");
  }
});
//Gebruikersrechten controleren bij de URL: '/history/' gevolgd door een ondernemingsnummer
app.get("/history/:referencenumber", async (req: any, res: any) => {
  //Als de gebruiker is ingelogd dan wordt de zoekgeschiedenis ingeladen, anders wordt de gebruiker teruggestuurd naar de loginpagina
  if(activeUser.username != ""){
    const userHistory: WithId<Document>[] = await fetchHistory(activeUser.username);//De zoekgeschiedenis van de ingelogde gebruiker
    //Voor elke zoekopdracht in de zoekgeschiedenis van de ingelogde gebruiker wordt het opgezochte bedrijf opgehaald en bijgehouden
    for(const search of userHistory){
      const company: WithId<Document> | null = await fetchCompany(search.referencenumber);//Het opgezochte bedrijf uit de zoekopdracht
      //Als de data van het opgezochte bedrijf kan worden gevonden, dan wordt deze opgehaald en bijgehouden
      if(company != null){
        companiesList.push({
          address: company.address,
          debts: company.debts,
          depositDate: company.depositDate,
          equities: company.equities,
          name: company.name,
          profit: company.profit,
          referencenumber: company.referencenumber
        });
      }
    }
    const spotlightCompanyOrLink: WithId<Document> | null = await fetchCompany(req.params.referencenumber);//De data van het geselecteerde bedrijf
    //Als de dat van het geselecteerd bedrijf kan worden gevonden, dan wordt deze meegegeven, en anders wordt er naar naar de meegegeven pagina doorverwezen
    if(spotlightCompanyOrLink != null){
      res.render("history", { searchedCompanies: companiesList, company: spotlightCompanyOrLink });
      companiesList = [];
    } else{
      switch(req.params.referencenumber){
        case "home":
          res.redirect("/home");
          companiesList = [];
          break;
        case "history":
          res.redirect("/history");
          companiesList = [];
          break;
        case "about":
          res.redirect("/about");
          companiesList = [];
          break;
        case "contact":
          res.redirect("/contact");
          companiesList = [];
          break;
      }
    }
  } else{
    res.render("login");
  }
});
//Gebruikersrechten controleren bij de URL: '/about'
app.get("/about", (req: any, res: any) => {
  //Als de gebruiker is ingelogd, dan wordt de over ons-pagina geladen, anders de loginpagina
  if(activeUser.username != ""){
    res.render("about");
  } else{
    res.render("login");
  }
});
//Gebruikersrechten controleren bij de URL: '/contact'
app.get("/contact", (req: any, res: any) => {
  //Als de gebruiker is ingelogd, dan wordt de contactpagina geladen, anders de loginpagina
  if(activeUser.username != ""){
    res.render("contact");
  } else{
    res.render("login");
  }
});

//Het evalueren van de actieve gebruiker na het ingeven van de inloggegevens
app.post("/login", async (req: any, res: any) => {
  //De inloggegevens ophalen
  activeUser = { 
    username: req.body.email,
    password: req.body.password
  }
  const correctUserdata: User | null = await client.db("NBB").collection("Users").findOne<User>({});//De correcte gebruikergegevens
  const correctPw: string = correctUserdata !== null ? correctUserdata.password : "";//Het correcte wachtwoord
  const isMatch: Boolean = await bcrypt.compare( activeUser.password, correctPw);//Als het ingegeven wachtwoord al dan niet correct is
  //Als de gebruiker bestaat dan wordt de gebruiker ingelogd en naar de landingspagina gebracht, anders wordt er een foutmelding meegegeven
  if(isMatch && (await userExist({ username: req.body.email, password: correctPw }))){
    isLoggedIn = true;
    res.render("landing", { companyData: emptyCompanyData, company2Data: emptyCompanyData, isLoggedIn: isLoggedIn });
  } else{
    res.render("login", { succses: "Verkeerde gebruikersnaam of wachtwoord." });
  }
});
//Het ophalen van de gevraagde data nadat de ingelogde gebruiker de vergelijkingstool gebruikt heeft
app.post("/home", async (req: any, res: any) => {
  let companyData: Company = emptyCompanyData;//De data van het ene bedrijf
  let company2Data: Company = emptyCompanyData;//De data van het andere bedrijf
  const referencenumberCompany1: string = req.body.company1 as string;//Het ene ingegeven ondernemingsnummer
  const referencenumberCompany2: string = req.body.company2 as string;//Het andere ingegeven ondernemingsnummer
  //Als de gebruiker een ondernemingsnummer leeg laat of tweemaal dezelfde ingeef, dan wordt er een foutmelding meegegeven, anders wordt de bedrijfsdata opgehaald
  if(referencenumberCompany1 == "" || referencenumberCompany2 == ""){
    res.render("home", { companyData: emptyCompanyData, company2Data: emptyCompanyData, succses: "Vul twee ondernemingsnummers in" });
  } else if(referencenumberCompany1 == referencenumberCompany2){
    res.render("home", { companyData: emptyCompanyData, company2Data: emptyCompanyData, succses: "Vul twee verschillende ondernemingsnummers in" });
  } else{
    companyData = await getCompanyData(referencenumberCompany1);
    //Als de ene onderneming niet genoeg data heeft, zal dit worden gezegd aan de gebruiker
    if(companyData.address != "No data found"){
      const searchCompanyData: History = { username: activeUser.username, referencenumber: companyData.referencenumber };//De zoekopdracht van het ene bedrijf
      addToHistory(searchCompanyData);
      addCompany(companyData);
    }
    company2Data = await getCompanyData(referencenumberCompany2);
    //Als de andere onderneming niet genoeg data heeft, zal dit worden gezegd aan de gebruiker
    if(company2Data.address != "No data found" ){
      const searchCompany2Data: History = { username: activeUser.username, referencenumber: company2Data.referencenumber };//De zoekopdracht van het andere bedrijf
      addToHistory(searchCompany2Data);
      addCompany(company2Data);
    }
    res.render("home", { companyData: companyData, company2Data: company2Data, succses: "Vul twee geldige ondernemingsnummers in" });
  }
});

//Lokale server laten luisteren
app.listen(app.get("port"), () => {
  console.log("[server] http://localhost:" + app.get("port"));
  console.log("0446486050\n0415675385");
  connect();
});