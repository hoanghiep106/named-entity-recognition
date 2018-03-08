const ner = require('ner');
const { nerConfig } = require('../../config/app');

const getNERLocations = (text, callback) => {
  ner.get(nerConfig, text, function(err, res){
    const locations = (res && res.entities && res.entities.LOCATION) || [];
    callback(locations);
  });
};

module.exports = {
  getNERLocations,
}
