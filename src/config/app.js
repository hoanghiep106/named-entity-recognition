const mongoConfig = {
  mongoServerUrl: 'mongodb://localhost:27017',
  dbName: 'daily_tweets',
};

const nerConfig = {
  host: 'localhost',
  port: '8080',
};

const geocoderConfig = {
  provider: 'google',
  httpAdapter: 'https',
  // apiKey: 'AIzaSyANkv6Rq2MyQMPGZ8he5dCSNI5IesEtICY',
  apiKey: 'AIzaSyDxrxa-ZacB4CO84xJ0pVj_zeUjEy30q5g',
  formatter: null,
};

module.exports = {
  mongoConfig,
  nerConfig,
  geocoderConfig,
};
