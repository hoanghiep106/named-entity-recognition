const mongoConfig = {
  mongoServerUrl: 'mongodb://localhost:27017',
  dbName: 'daily_tweets',
};

const nerConfig = {
  host: 'localhost',
  port: '8080',
};

module.exports = {
  mongoConfig,
  nerConfig,
};
