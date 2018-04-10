const { connect } = require('../../db');
const { geocoder, googleSetLatLng } = require('../../services/google');
const { getNERLocations } = require('../../services/ner');
const utf8 = require('utf8');

const inferUserLocation = () => {
  connect((db, dbs) => {
    db.collection('users').find().toArray((e, res) => {
      res.forEach((user) => {
        if (!user.location && user.description) {
          getNERLocations(utf8.encode(user.description), (locations) => {
            if (locations && locations.length) {
              db.collection('users').update({id: user.id}, {$set: {location: locations[0]}});
              googleSetLatLng(geocoder, db.collection('users'), user.id, locations[0], () => {}, () => {
                db.collection('users').deleteOne({id: user.id});
                console.log('Deleted user', user.id);
              });
            } else {
              console.log('[No location infered from user description]');
              db.collection('users').deleteOne({id: user.id});
              console.log('Deleted user', user.id);
            }
          });
        }
        if (!user.location && !user.description) {
          db.collection('users').deleteOne({id: user.id});
          console.log('Deleted user', user.id);
        }
        if(user.location && !user.lat && !user.lng) {
          googleSetLatLng(geocoder, db.collection('users'), user.id, user.location, () => {}, () => {
            db.collection('users').deleteOne({id: user.id});
            console.log('Deleted user', user.id);
          });
        }
      });
    });
  });
};

module.exports = {
  inferUserLocation,
};
