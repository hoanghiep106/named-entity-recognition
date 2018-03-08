const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.get('/', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  })
  MongoClient.connect("mongodb://localhost:27017", function(err, db) {
    if(err) { return console.dir(err); }
    const daily_tweets = db.db('daily_tweets');
    daily_tweets.collection('users').find().toArray((e, result) => {
      res.send(JSON.stringify(result));
    });
  });
});

app.listen(3001, () => console.log('Example app listening on port 3000!'))
