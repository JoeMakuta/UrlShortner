import express from "express";
import shortener from "./shortener.js"; // Assuming shortener.js is in the same directory
import clipboardy from "clipboardy";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

import path from "path";

const shortener1 = new shortener();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testUrlRegex =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

app.use(express.urlencoded({ extended: true }));
app.set("views", "views"); // Set the template folder to an empty string to use the root directory
app.set("view engine", "ejs"); // Set the view engine to handle HTML files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  //Verify if the url is valid

  if (url.match(testUrlRegex)) {
    const shortUrl = await shortener1.shorten(req.body.url);
    res.render("result.ejs", {
      base: req.protocol + "://" + req.get("host") + "/",
      shortUrl,
    });
  } else {
    res.redirect("/");
  }
});

app.get("/:shortUrl", async (req, res) => {
  console.log("Request params : ", req.params);
  const url = await shortener1.getUrl(req.params.shortUrl);
  console.log("The returned url is : ", url);
  if (url) {
    res.redirect(url);
  } else {
    res.send("Not found !");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Project url: http://localhost:" + process.env.PORT);
});
