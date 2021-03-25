'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');

const port = process.env.PORT;

app.use(cors());
const superagent = require('superagent');

//  serv start
// ```
// ```
// ```

// const weather = require('./data/weather.json');

app.get('/weather', handleWeather);

app.get('/', (req, res) =>{
  res.send('hello world');
});

app.use('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
});



function handleWeather(req, res) {
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  console.log(req.query);
  const query = {
    key: process.env.WEATHER_API_KEY,
    lat: req.query.lat,
    lon: req.query.lon
  };


  superagent
    .get(url)
    .query(query)
    .then(superagentResults => {
      const newResults = superagentResults.body.data;
      const finalForecast = newResults.map(day => {
        return new Forecast(day);
      });
      res.status(200).send(finalForecast);
    });
}


function Forecast(obj, city) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
  this.city = city;
}



app.listen(port, () => console.log(`listening on #${port}`));
