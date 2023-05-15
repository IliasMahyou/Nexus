/*Importatie*/
import express from "express"; //Express()
import ejs from "ejs";
import bcrypt from "bcrypt";
import { getCompanyData } from "./api";
import { User, Company } from "./types";
import { userExist, fetchHistory, fetchCompany, connect, exit, addToHistory} from "./db";

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
const emptyCompany2Data: Company = {
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
  connect();
  res.render("login");
}); //login.ejs inladen bij '/login'
app.post("/login", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  activeUser = {name: req.body.email, password: req.body.password};
  //Gebruikerscontrole
  if (await userExist(activeUser)) {
    res.render("home", {
      companyData: emptyCompanyData,
      companyData2: emptyCompany2Data,
    });
  } else {
    res.render("login", { succses: "Wrong username or password." });
  }
});

// Home //
app.get("/home", (req, res) => {
  res.render("home", { companyData: emptyCompanyData, company2Data: emptyCompany2Data }); //home.ejs inladen bij '/home'
});
app.post("/home", async (req, res) => {
  const companyData = await getCompanyData(req.body.company1 as string);
  const company2Data = await getCompanyData(req.body.company2 as string);
  res.render("home", { companyData: companyData, company2Data: emptyCompany2Data }); //home.ejs inladen bij '/home' na de input van de gebruiker
  addToHistory({username: activeUser.name, referencenumber: companyData.referencenumber});
  addToHistory({username: activeUser.name, referencenumber: company2Data.referencenumber});
});

// History //
app.get("/history", async (req: any, res: any) => {
  const searchedCompanies: Company[] = await fetchHistory(activeUser.name);
  res.render("history", {searchedCompanies: searchedCompanies});
}); //history.ejs inladen bij '/history'
app.get("/history/:referencenumber", async (req, res) => {
  const company = await fetchCompany(req.params.referencenumber);
  res.render("history", {company: company});
});//history.ejs opnieuw inladen naa een selectie uit de zoekgeschiedenis


app.get("/about", (req: any, res: any) => res.render("about")); //about.ejs inladen bij '/about'
app.get("/contact", (req: any, res: any) => res.render("contact")); //contact.ejs inladen bij '/contact'

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
); //Lokale server starten
