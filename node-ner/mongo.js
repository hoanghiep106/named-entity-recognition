const ner = require('ner');
const MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017", function(err, db) {
  if(err) { return console.dir(err); }
  const daily_tweets = db.db('daily_tweets');
  const tweetsCollection = daily_tweets.collection('tweets');
  tweetsCollection.find().toArray(function(e, res) {
    res.forEach((tweet, index) => {
      ner.get({
        port:8080,
        host:'localhost'
      }, tweet.text, function(err, res){
        if (res && res.entities) {
          console.log(res.entities.LOCATION);
        } else {
          console.log('[Server error]');
        }
      });
      if (index === res.length -1) {
        setTimeout(() => db.close(), 300);
      }
    });
  });
});
