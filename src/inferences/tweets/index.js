const { getNERLocations } = require('../../services/ner');
const { geocoder, googleSetLatLng, googleGetCountry } = require('../../services/google');
const { setLatLng, connect } = require('../../db');

const inferTweetLocation = () => {
  connect((db, dbs) => {
    const tweetsCollection = db.collection('tweets');
    tweetsCollection.find().toArray(function(e, res) {
      if (res && res.length) {
        let countInferedBefore = 0;
        let countJustInfered = 0;
        res.forEach((tweet, index) => {
          if (!tweet.lat && !tweet.lng) {
            if (tweet.geo && tweet.geo.coordinates) {
              const lat = tweet.geo.coordinates[0];
              const lng = tweet.geo.coordinates[1];
              setLatLng(tweetsCollection, tweet.id, lat, lng, () => {
                countJustInfered += 1;
              });
            } else {
              getNERLocations(tweet.text, (locations) => {
                if (locations.length) {
                  if (locations.length === 1) {
                    googleSetLatLng(geocoder, tweetsCollection, tweet.id, locations[0], () => {
                      countJustInfered += 1;
                    });
                  } else {
                    // console.log(locations);
                  }
                } else {
                  // console.log('[No location found in tweet]');
                }
              });
            }
          } else {
            countInferedBefore += 1;
          }
          // if (index === res.length - 1) {
          //   console.log('Done. Processing remaining things...');
          //   setTimeout(() => {
          //     console.log(`Tweets infered before: ${countInferedBefore}`);
          //     console.log(`Tweets just infered: ${countJustInfered}`);
          //     console.log(`Total tweets: ${res.length}`);
          //     dbs.close();
          //   }, 5000);
          // }
        });
      }
    });
  });
};

module.exports = {
  inferTweetLocation,
};
