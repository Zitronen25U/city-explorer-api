'use strict';

let cache = require('../cache.js');

const superagent = require('superagent');

function weather(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}


function getWeather(request, response) {
  const key = 'weather-' + request.query.lat + request.query.lon;
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';

  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: 'en',
    lat: request.query.lat,
    lon: request.query.lon,
    days: 5,
  };

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');

    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
      .query(queryParams)
      .then(response => parseWeather(response.body));
  }

  response.status(200).send(parseWeather);
  return cache[key].data;
}





function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}


module.exports = getWeather;
