const express = require('express');
const { connect } = require('../db');
const { headers } = require('../config/api');

const app = express();

app.get('/users', (req, res) => {
  res.set(headers);
  connect((db) => {
    db.collection('users').find().toArray((e, result) => {
      res.send(JSON.stringify(result.filter(ele => ele.lat && ele.lng).map((ele) => {return {lat: ele.lat, lng: ele.lng}})));
    });
  })
});

app.get('/tweets', (req, res) => {
  res.set(headers);
  connect((db) => {
    db.collection('tweets').find().toArray((e, result) => {
      res.send(JSON.stringify(result.filter(ele => ele.lat && ele.lng).map((ele) => {return {lat: ele.lat, lng: ele.lng}})));
    });
  });
});

app.listen(3001, () => console.log('Example app listening on port 3000!'))
