const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=<GetAWeatherApiKeyFromOpenWeatherMap>&units=metric";
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdes = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather in " + city + " is " + temp + " degrees.");
      res.write("<h3>Weather Description:  " + weatherdes + "</h3>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});



app.listen(3000, function(req, res) {
  console.log("Server started.");
});
