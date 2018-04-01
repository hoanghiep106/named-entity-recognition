const { getNERLocations } = require('../../services/ner');
const { geocoder, googleSetLatLng, googleSetLatLngs, googleGetCountry } = require('../../services/google');
const { setLatLng, connect } = require('../../db');
const utf8 = require('utf8');

const inferTweetLocation = () => {
  connect((db, dbs) => {
    const tweetsCollection = db.collection('tweets');
    const usersCollection = db.collection('users');
    tweetsCollection.find().toArray(function(e, res) {
      if (res && res.length) {
        res.forEach((tweet, index) => {
          if (!tweet.lat && !tweet.lng && !tweet.noLatLng) {
            if (tweet.geo && tweet.geo.coordinates) {
              const lat = tweet.geo.coordinates[0];
              const lng = tweet.geo.coordinates[1];
              setLatLng(tweetsCollection, tweet.id, lat, lng);
            } else {
              getNERLocations(utf8.encode(tweet.text), (locations) => {
                if ( locations && locations.length) {
                  if (locations.length === 1) {
                    googleSetLatLng(geocoder, tweetsCollection, tweet.id, locations[0]);
                  } else {
                    googleSetLatLngs(geocoder, tweetsCollection, tweet.id, locations);
                  }
                } else {
                  usersCollection.findOne({id: tweet.user.id}, (err, user) => {
                    console.log(user.lat, user.lng);
                    if (user.lat && user.lng) {
                      tweetsCollection.updateOne({id: tweet.id}, {$set: {lat: user.lat, lng: user.lng}}, (err, res) => {
                        if (err) throw err;
                        console.log(`Document updated with user lat lng. ${user.lat}, ${user.lng}`);
                      });
                    } else if (tweet.user.location) {
                      googleSetLatLng(geocoder, tweetsCollection, tweet.id, user.location);
                    }
                  });
                }
              });
            }
          }
          // Fix Twitter Date
          tweetsCollection.updateOne({id: tweet.id}, {$set: {created_at: new Date(tweet.created_at)}});
        });
      }
    });
  });
};

module.exports = {
  inferTweetLocation,
};
