const NodeGeocoder = require('node-geocoder');
const { geocoderConfig } = require('../../config/app');

var geocoder = NodeGeocoder(geocoderConfig);

const googleSetLatLng = (geocoder, collection, documentId, location, successCallback) => {
  if (collection) {
    geocoder.geocode(location, (err, res) => {
      if (err) console.log(err);
      if (res && res[0]) {
        const lat = res[0].latitude;
        const lng = res[0].longitude;
        collection.updateOne({id: documentId}, {$set: {lat, lng}}, (err, res) => {
          if (err) throw err;
          console.log(`Document updated with google. ${lat}, ${lng}`);
          successCallback();
        });
      } else {
        console.log('Geocoder found no locations.')
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
