/*Importatie*/
import express from "express"; //Express()
import ejs from "ejs";
import bcrypt from "bcrypt";
import { getCompanyData } from "./api";
import { User, Company } from "./types";
import {
  userExist,
  fetchHistory,
  fetchCompany,
  connect,
  exit,
  addToHistory,
  addCompany,
  inHistory,
  client,
} from "./db";
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
  profit: 0,
};

/*Variabelendeclaraties*/
let activeUser: User = {name: "", password: ""}; //De ingelogde gebruiker
let companiesList: Company[] = [];
let user: User;
let isLoggedIn: Boolean = false;
/*Synchrone functies*/
app.set("view engine", "ejs"); //EJS-templating instelen
app.set("port", 3000); //Luisterende poort: 3000
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //Statische assets leesbaar maken

// Index/landing //
app.get("/", (req: any, res: any) => res.render("landing", {isLoggedIn: isLoggedIn})); //landing.ejs inladen bij '/'

// login //
app.get("/login", (req: any, res: any) => {
  res.render("login");
}); //login.ejs inladen bij '/login'
app.post("/login", async (req, res) => {
  activeUser = { name: req.body.email, password: req.body.password };
  let dbUser = await client.db("NBB").collection("Users").findOne({ name: activeUser.name });
        if(dbUser == null){
          res.render("login", { succses: "Wrong username or password." });
        }else{
            const hash = await bcrypt.compare(activeUser.password,dbUser.password);
            if(hash){
              isLoggedIn = true;
              res.render("landing", {
                companyData: emptyCompanyData,
                company2Data: emptyCompanyData,
                isLoggedIn: isLoggedIn
              }); 
              }else{
                res.render("login", { succses: "Wrong username or password." });
            }
        }
});
app.get("/logout", (req, res) => {
  activeUser = {name: "", password: ""};
  isLoggedIn = false;
    res.render("landing", {
      companyData: emptyCompanyData,
      company2Data: emptyCompanyData,
      isLoggedIn: isLoggedIn
    });
});

// Home //
app.get("/home", (req, res) => {
  if (activeUser.name != "") {
    res.render("home", {
      companyData: emptyCompanyData,
      company2Data: emptyCompanyData,
    }); //home.ejs inladen bij '/home'
  } else {
    res.render("login");
  }
});
app.post("/home", async (req, res) => {
  let companyData = emptyCompanyData;
  let company2Data = emptyCompanyData;
  const referencenumberCompany1: string = req.body.company1 as string;
  const referencenumberCompany2: string = req.body.company2 as string;
  if (referencenumberCompany1 == "" || referencenumberCompany2 == "") {
    res.render("home", {
      companyData: emptyCompanyData,
      company2Data: emptyCompanyData,
      succses: "Vul twee ondernemingsnummers in",
    });
  }
  else if (referencenumberCompany1 == referencenumberCompany2) {
    res.render("home", {
      companyData: emptyCompanyData,
      company2Data: emptyCompanyData,
      succses: "Vul twee verschillende ondernemingsnummers in",
    });
  }
  else {
    companyData = await getCompanyData(referencenumberCompany1);
    if (companyData.address != "No data found") {
      const searchCompanyData = {
        username: activeUser.name,
        referencenumber: companyData.referencenumber,
      };
      addToHistory(searchCompanyData);
      addCompany(companyData);
    }

    company2Data = await getCompanyData(referencenumberCompany2);
    if (company2Data.address != "No data found" ){
      const searchCompany2Data = {
        username: activeUser.name,
        referencenumber: company2Data.referencenumber,
      };
      addToHistory(searchCompany2Data);
      addCompany(company2Data);
    }

  res.render("home", {
    companyData: companyData,
    company2Data: company2Data,
    succses: "Vul twee geldige ondernemingsnummers in",
  }); //home.ejs inladen bij '/home' na de input van de gebruiker
  }
});

// History //
app.get("/history", async (req: any, res: any) => {
  if (activeUser.name != "") {
    const userHistory = await fetchHistory(activeUser.name);
    for (const search of userHistory) {
      const company = await fetchCompany(search.referencenumber);
      if (company != null) {
        companiesList.push({
          address: company.address,
          debts: company.debts,
          depositDate: company.depositDate,
          equities: company.equities,
          name: company.name,
          profit: company.profit,
          referencenumber: company.referencenumber,
        });
      }
    }
    res.render("history", {
      searchedCompanies: companiesList,
      company: emptyCompanyData,
    });
    companiesList = [];
  } else {
    res.render("login");
  }
}); //history.ejs inladen bij '/history'
app.get("/history/:referencenumber", async (req, res) => {
  if (activeUser.name != "") {
    const userHistory = await fetchHistory(activeUser.name);
    for (const search of userHistory) {
      const company = await fetchCompany(search.referencenumber);
      if (company != null) {
        companiesList.push({
          address: company.address,
          debts: company.debts,
          depositDate: company.depositDate,
          equities: company.equities,
          name: company.name,
          profit: company.profit,
          referencenumber: company.referencenumber,
        });
      }
    }
    const spotlightCompanyOrLink = await fetchCompany(req.params.referencenumber);
    if (spotlightCompanyOrLink != null) {
      res.render("history", {
        searchedCompanies: companiesList,
        company: spotlightCompanyOrLink,
      });
      companiesList = [];
    } else {
      switch (req.params.referencenumber) {
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
  } else {
    res.render("login");
  }
}); //history.ejs opnieuw inladen na een selectie uit de zoekgeschiedenis

app.get("/about", (req: any, res: any) => {
  if (activeUser.name != "") {
    res.render("about");
  } else {
    res.render("login");
  }
}); //about.ejs inladen bij '/about'
app.get("/contact", (req: any, res: any) => {
  if (activeUser.name != "") {
    res.render("contact");
  } else {
    res.render("login");
  }
}); //contact.ejs inladen bij '/contact'

app.listen(app.get("port"), () => {
  console.log("[server] http://localhost:" + app.get("port"));
  console.log("0446486050\n0415675385");
  connect();
}); //Lokale server starten
