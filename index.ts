/*Importatie*/
import express from "express"; //Express()
import ejs from "ejs";
import bcrypt from "bcrypt";
import { getCompanyData } from "./api";
import { CompanyData } from "./types";
//import { addCompany, fetchCompany } from "db";//Nodige ondernemingDatabaseFunctie

/*Constantedeclaratie*/
const app = express(); //Express-app maken

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
  let email = req.body.email;
  let password = req.body.password;
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
  // Als het wachtwoord en email juist is
  if (password == "NBB" && email == "Nexus@gmail.com") {
    let companyData: CompanyData = {
      name: "",
      address: "",
      depositDate: "",
      equity: 0,
      profit: 0,
      debt: 0,
    };
    let companyData2: CompanyData = {
      name: "",
      address: "",
      depositDate: "",
      equity: 0,
      profit: 0,
      debt: 0,
    };
    res.render("home", {
      companyData: companyData,
      companyData2: companyData2,
    });
  }
  // Als het wachtwoord en email fout is
  if (password != "NBB" || email != "Nexus@gmail.com") {
    res.render("login", { succses: "Wrong username or password." });
  }
});

// Home //
app.get("/home", (req, res) => {
  let companyData: CompanyData = {
    name: "",
    address: "",
    depositDate: "",
    equity: 0,
    profit: 0,
    debt: 0,
  };
  let companyData2: CompanyData = {
    name: "",
    address: "",
    depositDate: "",
    equity: 0,
    profit: 0,
    debt: 0,
  };
  res.render("home", { companyData: companyData, companyData2: companyData2 }); //home.ejs inladen bij '/home'
});
app.post("/home", async (req, res) => {
  let companyData = await getCompanyData(req.body.company1 as string);
  console.log(companyData);
  let companyData2 = await getCompanyData(req.body.company2 as string);
  console.log(companyData2);

  res.render("home", { companyData: companyData, companyData2: companyData2 }); //home.ejs inladen bij '/home' na de input van de gebruiker
});

// History //
app.get("/history", (req: any, res: any) => res.render("history")); //history.ejs inladen bij '/history'
app.get("/about", (req: any, res: any) => res.render("about")); //about.ejs inladen bij '/about'
app.get("/contact", (req: any, res: any) => res.render("contact")); //contact.ejs inladen bij '/contact'

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
); //Lokale server starten
