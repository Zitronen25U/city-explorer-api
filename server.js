'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');

const weather = require('./data/weather.json');


app.use(cors());

const port = process.env.PORT;

app.get('/weather', handleWeather);

app.use('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
});

function handleWeather(req, res) {
  const forcastArr = weather.data.map(day => {
    return new Forecast(day, weather.city_name, weather.lat, weather.lon);
  });
  res.status(200).send(forcastArr);
}

function Forecast(obj, city, lat, lon) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
  this.city = city;
  this.lat = lat;
  this.lon = lon;
}



app.listen(port, () => console.log(`listening on ${port}`));
