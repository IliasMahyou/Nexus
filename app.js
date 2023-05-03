/*Importatie*/
import express from "express";
import ejs from "ejs";


/*Constantedeclaratie*/
const app = express();


/*Synchrone functies*/
app.set("view engine", "ejs");
app.set("port", 3000);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index');
});
app.get("/login", (req, res) => {
    res.render('login');
});
app.get("/home", (req, res) => {
    res.render('home');
  });
app.get("/history", (req, res) => {
    res.render('history');
});app.get("/about", (req, res) => {
    res.render('about');
});
app.get("/contact", (req, res) => {
    res.render('contact');
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);