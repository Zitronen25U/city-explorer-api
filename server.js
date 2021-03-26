'use strict';

const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors');

const port = process.env.PORT;

app.use(cors());

//  serv start
// ```
// ```
// ```

const handleWeather = require('./modules/handleWeather');

app.get('/weather', handleWeather);

app.get('/', (req, res) =>{
  res.send('hello world');
});

app.use('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
});


app.listen(port, () => console.log(`listening on #${port}`));
