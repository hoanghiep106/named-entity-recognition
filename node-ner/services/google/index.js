var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyANkv6Rq2MyQMPGZ8he5dCSNI5IesEtICY',
  formatter: null
};

var geocoder = NodeGeocoder(options);

const googleSetLatLng = (geocoder, collection, documentId, location, successCallback) => {
  if (collection) {
    geocoder.geocode(encodeURIComponent(location), (err, res) => {
      if (res && res[0]) {
        collection.updateOne({id: documentId}, {$set: {lat, lng}}, (err, res) => {
          if (err) throw err;
          console.log(`Document updated with google. ${lat}, ${lng}`);
          successCallback();
        });
      }
    });
  } else {
    console.log('No collection');
  }
};

const googleGetCountry = (geocoder, location) => {
  geocoder.geocode(encodeURIComponent(location), (err, res) => {
    if (res && res[0]) {
      console.log(res[0].country);
    } else {
      console.log('No country detected');
    }
  });
};

module.exports = {
  geocoder,
  googleSetLatLng,
  googleGetCountry
};
