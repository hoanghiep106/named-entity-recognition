const MongoClient = require('mongodb').MongoClient;
const { mongoConfig } = require('../config/app');

const connect = (callback) => {
  MongoClient.connect(mongoConfig.mongoServerUrl, (err, dbs) => {
    if(err) { return console.dir(err); }
    const db = dbs.db(mongoConfig.dbName);
    if (db) {
      callback(db, dbs);
    } else {
      console.log(`No datase with name ${dbName}`);
      dbs.close();
    }
  });
};

const setLatLng = (collection, documentId, lat, lng, successCallback) => {
  if (collection) {
    collection.updateOne({ id: documentId }, { $set: {lat, lng } }, (err, res) => {
      if (err) throw err;
      console.log(`Document updated. ${lat}, ${lng}`);
      successCallback();
    });
  } else {
    console.log('No collection');
  }
}

module.exports = {
  connect,
  setLatLng,
};
