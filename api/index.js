'use strict'

const express = require('express');
const cors = require('cors');

const cities = require('./data/cities.json');

const app = express();
app.use(cors());

const getCitiesByName = query => {
  return cities
};

app.get('/v1/cities', (req, res) => {
  if (!req.query.q) return res.json(cities);

  const foundResults = getCitiesByName(req.query.q);

  return res.json({
    cities: foundResults
  });
});

const server = app.listen(8000, 'localhost', () => {
  console.log(`API listen on http://${server.address().address}:${server.address().port}`)
})
