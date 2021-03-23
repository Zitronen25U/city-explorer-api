'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');

const weather = require('./data/weather.json');

app.use(cors());

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on ${port}`));

app.get('/weather', function (request, response) {
  response.send(weather);
});

console.log(`${weather.lat} and ${weather.lon}`);

