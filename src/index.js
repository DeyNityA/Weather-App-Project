const express = require("express");
const hbs = require("hbs");
const app = express();
const https = require("https");
const path = require("path");
const port = process.env.PORT || 3000;

// making hndelbar helpers to check if else with attribute
hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

// app.use(router);
app.use("/public", express.static(path.join(__dirname, "..", "public")));

//set hbs as template engine
app.set("view engine", "hbs");



const viewsdir = path.join(__dirname, "..", "template", "views");
//to change the default view dir name
app.set("views", viewsdir);

const partialPath = path.join(__dirname, "..", "template", "partials");
hbs.registerPartials(partialPath);

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/index", function (req, res) {
  res.render("index");
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/weather", function (req, res) {
  const obj = req.query;
  if (Object.keys(obj).length == 0) {
    res.render("weather");
  } 
  else {
    try {
      https.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${obj.city}&units=metric&appid=ee4c799d2b5c587a777ffd6f961d26a4`,
        (resp) => {
          let data = " ";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            const objdata = JSON.parse(data);
            console.log(objdata);
            res.render("weather", { objdata });
          });
        }
      );
    } 
    catch (err) {
      res.send(err.message);
    }
  }
});

app.get('*', function(req, res) {
    res.render('404error',{
        errmessage:'Oops! Page Not Found'
    });
});

app.listen(port, (err) => {
  if (!err) console.log("listening on port", port);
});
