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

app.use('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
});

function handleWeather(req, res) {
  const { lat, lon} = req.query;
  console.log(lat, lon, process.env.WEATHER_API_KEY);
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat={lat}&lon={lon}&key={process.env.WEATHER_API_KEY}&days=8`;

  superagent
    .get(url)
    .query(lat, lon)
    .then(superagentResults => {
      const newForcast = superagentResults.body.map(agent => {
        return new Forecast(agent);
      });
      res.status(200).send(newForcast);
    });

}


function Forecast(obj, city) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
  this.city = city;
}



//   try{
//     const forcastArr = weather.data.map(day => {
//       return new Forecast(day, weather.city_name, weather.lat, weather.lon);
//     });
//     res.status(200).send(forcastArr);
//   } catch(error){
//     response.status(500).send('oops! Somethings went wrong');
//   }
// }



app.listen(port, () => console.log(`listening on ${port}`));
