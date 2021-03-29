'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

const weather = require('./modules/weather.js');

app.get('/weather', weather);


app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
