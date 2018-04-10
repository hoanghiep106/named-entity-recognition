const NodeGeocoder = require('node-geocoder');
const { geocoderConfig } = require('../../config/app');

var geocoder = NodeGeocoder(geocoderConfig[2]);

const googleSetLatLng = async (geocoder, collection, documentId, location, successCallback, failedCallback) => {
  if (collection) {
    await geocoder.geocode(location, (err, res) => {
      if (err) {
        console.log(err);
        return 0;
      }
      if (res && res[0]) {
        const lat = res[0].latitude;
        const lng = res[0].longitude;
        collection.updateOne({id: documentId}, {$set: {lat, lng}}, (err, res) => {
          if (err) console.log(err);
          console.log(`Document updated with google. ${lat}, ${lng}`);
          if (successCallback) successCallback();
        });
      } else {
        console.log('Geocoder found no locations.')
        if (failedCallback) failedCallback();
      }
    });
  } else {
    console.log('No collection');
  }
};

const googleSetLatLngs = (geocoder, collection, documentId, locations, successCallback) => {
  if (collection) {
    geocoder.batchGeocode(locations, function (err, results) {
      for (let i = 0; i < results.length; i++) {
        if (!results[i].error && results[i].value && results[i].value.latitude && results[i].value.longitude) {
          const lat = results[i].value.latitude;
          const lng = results[i].value.longitude;
          console.log(lat, lng)
          collection.updateOne({id: documentId}, {$set: {lat, lng}}, (error, res) => {
            if (error) throw error;
            console.log(`Document updated with google. ${lat}, ${lng}`);
            if (successCallback) successCallback();
          });
          return null;
        }
      }
    });
  } else {
    console.log('No collection');
  }
};

const googleGetCountry = (geocoder, location, successCallback) => {
  geocoder.geocode(encodeURIComponent(location), (err, res) => {
    if (res && res[0]) {
      successCallback(res[0].country);
    } else {
      console.log('No country detected');
    }
  });
};

module.exports = {
  geocoder,
  googleSetLatLng,
  googleSetLatLngs,
  googleGetCountry
};
