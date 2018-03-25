const { connect } = require('../../db');
const { geocoder, googleSetLatLng } = require('../../services/google');
const { getNERLocations } = require('../../services/ner');
const utf8 = require('utf8');

const inferUserLocation = () => {
  connect((db, dbs) => {
    db.collection('users').find().toArray((e, res) => {
      res.forEach((user) => {
        if (!user.location && user.description && !user.noLatLng) {
          getNERLocations(utf8.encode(user.description), (locations) => {
            if (locations && locations.length) {
              db.collection('users').update({id: user.id}, {$set: {location: locations[0]}});
              googleSetLatLngs(geocoder, db.collection('users'), user.id, locations[0]);
            } else {
              console.log('[No location infered from user description]');
            }
          });
        }
        if(user.location && !user.lat && !user.lng) {
          googleSetLatLng(geocoder, db.collection('users'), user.id, user.location);
        }
      });
    });
  });
};

module.exports = {
  inferUserLocation,
};
