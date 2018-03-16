const { getNERLocations } = require('../../services/ner');
const { geocoder, googleSetLatLng, googleSetLatLngs, googleGetCountry } = require('../../services/google');
const { setLatLng, connect } = require('../../db');
const utf8 = require('utf8');

const inferTweetLocation = () => {
  connect((db, dbs) => {
    const tweetsCollection = db.collection('tweets');
    tweetsCollection.find().toArray(function(e, res) {
      if (res && res.length) {
        res.forEach((tweet, index) => {
          if (!tweet.lat && !tweet.lng) {
            if (tweet.geo && tweet.geo.coordinates) {
              const lat = tweet.geo.coordinates[0];
              const lng = tweet.geo.coordinates[1];
              setLatLng(tweetsCollection, tweet.id, lat, lng);
            } else {
              getNERLocations(utf8.encode(tweet.text), (locations) => {
                if (locations.length) {
                  if (locations.length === 1) {
                    googleSetLatLng(geocoder, tweetsCollection, tweet.id, locations[0]);
                  } else {
                    googleSetLatLngs(geocoder, tweetsCollection, tweet.id, locations);
                  }
                } else {
                  console.log('[No location found in tweet. Set tweet location with user location]');
                  if (tweet.user.location) {
                    googleSetLatLng(geocoder, tweetsCollection, tweet.id, tweet.user.location);
                  }
                }
              });
            }
          }
        });
      }
    });
  });
};

module.exports = {
  inferTweetLocation,
};
