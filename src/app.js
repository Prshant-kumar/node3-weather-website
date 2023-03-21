const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// define the path for express configuration
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setuf for handleBars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// utils files
const geoCode = require("./utils/geoCode");
const getForecast = require("./utils/getForecast");

// Setub static directory to serve
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Prahsnt",
    footerText: "Created by one and only ME",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Prashant",
    footerText: "Created by one and only ME",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "HElp Me! HElp Me! HElp Me! HElp Me! HElp Me! HElp Me!",
    title: "Prashant",
    footerText: "Created by one and only ME",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",

    errorPageText: "Help article not found",
    footerText: "Created by one and only ME",
  });
});

app.use("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geoCode(address, (err, data) => {
    if (err) {
      return res.send({ err });
    }
    if (data) {
      getForecast(data, (err, forecastData) => {
        if (err) {
          return res.send({ err });
        } else if (forecastData) {
          console.log(forecastData);
          const { location } = data;
          res.send({ location, foreCast: forecastData, address });
        }
      });
    }
  });
  // res.send({
  //   forecast: "It is snowing",
  //   locaton: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.use("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search query",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorPageText: "Page not found",
    footerText: "Created by one and only ME",
  });
});

app.listen(3000, () => {
  console.log("listining on port 3000");
});
