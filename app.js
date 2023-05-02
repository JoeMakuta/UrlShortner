const express = require("express");
const Shortener = require("./shortener"); // Assuming shortener.js is in the same directory
var cons = require("consolidate");
const dotenv = require("dotenv").config();

const path = require("path");
const app = express();
const shortener1 = new Shortener();

app.use(express.urlencoded({ extended: true }));
app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views")); // Set the template folder to an empty string to use the root directory
app.set("view engine", "html"); // Set the view engine to handle HTML files

app.get("/", (req, res) => {
  res.render("home.html");
});

app.post("/shorten", (req, res) => {
  const shortUrl = "";
  res.render("result.html", { shortUrl });
});

app.get("/:shortUrl", (req, res) => {
  res.send("URL not found");
});

app.listen(process.env.PORT, () => {
  console.log("Project url: http://localhost:" + process.env.PORT);
});
