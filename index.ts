/*Importatie*/
import express from "express";//Express()
import ejs from "ejs";


/*Constantedeclaratie*/
const app = express();//Express-app maken

/*Synchrone functies*/
app.set("view engine", "ejs");//EJS-templating instelen
app.set("port", 3000);//Luisterende poort: 3000

app.use(express.static("public"));//Statische assets leesbaar maken

app.get("/", (req: any, res: any) => res.render('landing'));//landing.ejs inladen bij '/'
app.get("/login", (req: any, res: any) => res.render('login'));//login.ejs inladen bij '/login'
app.get("/home", (req: any, res: any) => res.render('home'));//home.ejs inladen bij '/home'
app.get("/history", (req: any, res: any) => res.render('history'));//history.ejs inladen bij '/history'
app.get("/about", (req: any, res: any) => res.render('about'));//about.ejs inladen bij '/about'
app.get("/contact", (req: any, res: any) => res.render('contact'));//contact.ejs inladen bij '/contact'

app.listen(app.get("port"), () => console.log("[server] http://localhost:" + app.get("port")));//Lokale server starten