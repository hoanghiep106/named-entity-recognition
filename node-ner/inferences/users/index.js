const MongoClient = require('mongodb').MongoClient;
const { geocoder, googleSetLatLng, googleGetCountry } = require('./google');

const inferUserLocation = () => {
  MongoClient.connect("mongodb://localhost:27017", function(err, db) {
    if(err) { return console.dir(err); }
    const daily_tweets = db.db('daily_tweets');
    daily_tweets.collection('users').find().toArray((e, res) => {
      res.forEach((user) => {
        if (user.location && !user.lat && !user.lng) {
          googleSetLatLng(geocoder, daily_tweets.collection('users'), user.id, res[0].latitude, res[0].longitude);
        }
      });
    });
  });

  MongoClient.connect("mongodb://localhost:27017", function(err, db) {
    if(err) { return console.dir(err); }
    const daily_tweets = db.db('daily_tweets');
    daily_tweets.collection('users').find().toArray((e, res) => {
      console.log(res.filter(user => !user.location).length)
      res.forEach((user) => {
        if (!user.location) {
          ner.get({
            port:8080,
            host:'localhost'
          }, user.description, function(err, res){
            if (res && res.entities) {
              const locations = res.entities.LOCATION;
              console.log(locations);
              if (locations && locations.length) {
                daily_tweets.collection('users').update({id: user.id}, {$set: {location: locations[0]}});
              }
            } else {
              console.log('[Server error]');
            }
          });
        }
      });
    });
  });
}
