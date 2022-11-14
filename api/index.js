'use strict'

const express = require('express');
const cors = require('cors');

const {cities} = require('./data/cities.json');

const app = express();
app.use(cors());

const getCitiesByName = query => {
  return cities.filter(city => {
    const patt = new RegExp(query, 'gi');
    return patt.test(city[0])
  })
};

app.get('/', (req, res) => {
  return res.send('Up and running...')
});

app.get('/api/v1/cities', (req, res) => {
  if (!req.query.q) return res.json(cities);

  const foundResults = getCitiesByName(req.query.q);

  return res.json({
    cities: foundResults
  });
});

const server = app.listen(8000, 'localhost', () => {
  console.log(`API listen on http://${server.address().address}:${server.address().port}`)
})
