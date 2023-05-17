/*Importatie*/
import express from "express"; //Express()
import ejs from "ejs";
import bcrypt from "bcrypt";
import { getCompanyData } from "./api";
import { User, Company } from "./types";
import { userExist, fetchHistory, fetchCompany, connect, exit, addToHistory, addCompany, inHistory} from "./db";
import { WithId, Document } from "mongodb";

/*Constantedeclaraties*/
const app = express(); //Express-app maken
const emptyCompanyData: Company = {
  name: "",
  referencenumber: "",
  address: "",
  depositDate: "",
  equities: 0,
  debts: 0,
  profit: 0
};

/*Variabelendeclaraties*/
let activeUser: User;//De ingelogde gebruiker
let companiesList: Company[] = [];

/*Synchrone functies*/
app.set("view engine", "ejs"); //EJS-templating instelen
app.set("port", 3000); //Luisterende poort: 3000
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //Statische assets leesbaar maken

// Index/landing //
app.get("/", (req: any, res: any) => res.render("landing")); //landing.ejs inladen bij '/'

// login //
app.get("/login", (req: any, res: any) => {
  res.render("login");
}); //login.ejs inladen bij '/login'
app.post("/login", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  activeUser = {name: req.body.email, password: req.body.password};
  //Gebruikerscontrole
  if (await userExist(activeUser)) {
    res.render("home", {
      companyData: emptyCompanyData,
      company2Data: emptyCompanyData,
    });
  } else {
    res.render("login", { succses: "Wrong username or password." });
  }
});

// Home //
app.get("/home", (req, res) => {
  res.render("home", { companyData: emptyCompanyData, company2Data: emptyCompanyData }); //home.ejs inladen bij '/home'
});
app.post("/home", async (req, res) => {
  const companyData = await getCompanyData(req.body.company1 as string);
  const company2Data = await getCompanyData(req.body.company2 as string);
  const searchCompanyData = {username: activeUser.name, referencenumber: companyData.referencenumber};
  const searchCompany2Data = {username: activeUser.name, referencenumber: company2Data.referencenumber};
  addToHistory(searchCompanyData);
  addToHistory(searchCompany2Data);
  addCompany(companyData);
  addCompany(company2Data);
  res.render("home", { companyData: companyData, company2Data: company2Data }); //home.ejs inladen bij '/home' na de input van de gebruiker
});

// History //
app.get("/history", async (req: any, res: any) => {
  const userHistory = await fetchHistory(activeUser.name);
  for (const search  of userHistory) {
    const company = await fetchCompany(search.referencenumber);
    if (company != null) {
    companiesList.push({
      address: company.address,
      debts: company.debts,
      depositDate: company.depositDate,
      equities: company.equities,
      name: company.name,
      profit: company.profit,
      referencenumber: company.referencenumber
    })
  }
 }
  res.render("history", {searchedCompanies: companiesList, company: emptyCompanyData });
}); //history.ejs inladen bij '/history'
app.get("/history/:referencenumber", async (req, res) => {
  const userHistory = await fetchHistory(activeUser.name);
  for (const search  of userHistory) {
    const company = await fetchCompany(search.referencenumber);
    if (company != null) {
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
  const spotlightCompanyOrLink = await fetchCompany(req.params.referencenumber);
  if (spotlightCompanyOrLink != null) {
    res.render("history", {searchedCompanies: companiesList, company: spotlightCompanyOrLink});
  } else {
    switch (req.params.referencenumber) {
      case 'home':
        res.render("http://localhost:3000/home", { companyData: emptyCompanyData, company2Data: emptyCompanyData }); //home.ejs inladen bij '/home'
        break;
      case 'contact':
        res.render('http://localhost:3000/contact');
        break;
      case 'about': 
        res.render('http://localhost:3000/about');
        break;
      case 'http://localhost:3000/history':
        const userHistory = await fetchHistory(activeUser.name);
        for (const search  of userHistory) {
        const company = await fetchCompany(search.referencenumber);
        if (company != null) {
        companiesList.push({
          address: company.address,
          debts: company.debts,
          depositDate: company.depositDate,
          equities: company.equities,
          name: company.name,
          profit: company.profit,
          referencenumber: company.referencenumber
        })
      }
      res.render("http://localhost:3000/history", {searchedCompanies: companiesList, company: emptyCompanyData });
      break;
    }
  }
}
});//history.ejs opnieuw inladen na een selectie uit de zoekgeschiedenis


app.get("/about", (req: any, res: any) => res.render("about")); //about.ejs inladen bij '/about'
app.get("/contact", (req: any, res: any) => res.render("contact")); //contact.ejs inladen bij '/contact'

app.listen(app.get("port"), () => {
  console.log("[server] http://localhost:" + app.get("port"));
  console.log("0446486050\n0415675385");
  connect();
}
); //Lokale server starten
