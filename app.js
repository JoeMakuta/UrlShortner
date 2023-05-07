const express = require("express");
const Shortener = require("./shortener"); // Assuming shortener.js is in the same directory
var cons = require("consolidate");
require("dotenv").config();

const path = require("path");
const app = express();
const shortener1 = new Shortener();

const testUrlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

app.use(express.urlencoded({ extended: true }));
app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views")); // Set the template folder to an empty string to use the root directory
app.set("view engine", "html"); // Set the view engine to handle HTML files

app.get("/", (req, res) => {
  res.render("home.html");
});

app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  //Verify if the url is valid

  if (url.match(testUrlRegex)) {
    const shortUrl = await shortener1.shorten(req.body.url);
    // const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.render("result.html", { shortUrl });
  } else {
    res.redirect("/");
  }
});

app.get("/:shortUrl", async (req, res) => {
  console.log("Request params : ", req.params);
  const url = await shortener1.getUrl(req.params.shortUrl);
  await console.log("The returned url is : ", url);
  if (url) {
    res.redirect(url);
  } else {
    res.send("Not found !");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Project url: http://localhost:" + process.env.PORT);
});
