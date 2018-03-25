const express = require('express');
var bodyParser = require('body-parser')
const { connect } = require('../db');
const { headers } = require('../config/api');
const { getNERLocations } = require('../services/ner');

const app = express();
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.set(headers);
  connect((db) => {
    db.collection('users').find().toArray((e, result) => {
      res.send(JSON.stringify(result.filter(ele => ele.lat && ele.lng).map((ele) => {return {lat: ele.lat, lng: ele.lng}})));
    });
  })
});

app.post('/ner', (req, res) => {
  console.log(req.body);
  const text = req.body && req.body.text;
  if (text) {
    getNERLocations(text, (locations) => {
      res.send(JSON.stringify({ locations }));
    });
  }
});

app.get('/tweets', (req, res) => {
  res.set(headers);
  connect((db) => {
    db.collection('tweets').find().toArray((e, result) => {
      res.send(JSON.stringify(result.filter(ele => ele.lat && ele.lng).map((ele) => {return {lat: ele.lat, lng: ele.lng}})));
    });
  });
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))
