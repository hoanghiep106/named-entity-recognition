const ner = require('ner');
const { nerConfig } = require('./config');

const getNERLocations = (text, callback) => {
  ner.get({
    port: nerConfig.port,
    host: nerConfig.host,
  }, text, function(err, res){
    if (err) throw err;
    const locations = res && res.entities && res.entities.LOCATION;
    callback(locations);
  });
};

module.exports = {
  getNERLocations,
}
