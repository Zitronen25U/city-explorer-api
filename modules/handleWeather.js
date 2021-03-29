// const superagent = require('superagent');

// function handleWeather(req, res) {
//   const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
//   console.log(req.query);
//   const query = {
//     key: process.env.WEATHER_API_KEY,
//     lat: req.query.lat,
//     lon: req.query.lon
//   };


//   superagent
//     .get(url)
//     .query(query)
//     .then(superagentResults => {
//       const newResults = superagentResults.body.data;
//       const finalForecast = newResults.map(day => {
//         return new Forecast(day);
//       });
//       res.status(200).send(finalForecast);
//     });
// }


// function Forecast(obj, city) {
//   this.description = obj.weather.description;
//   this.date = obj.datetime;
//   this.city = city;
// }


// module.exports = handleWeather;
