const mongoConfig = {
  mongoServerUrl: 'mongodb://localhost:27017',
  dbName: 'daily_tweets',
};

const nerConfig = {
  host: 'localhost',
  port: '8080',
};

const apiKeys = [
  'AIzaSyANkv6Rq2MyQMPGZ8he5dCSNI5IesEtICY',
  'AIzaSyABsHHXsDcwV85IVLLnQiWqYZZ_afzt-J8',
  'AIzaSyDxrxa-ZacB4CO84xJ0pVj_zeUjEy30q5g',
  'AIzaSyAlS4gaR5Z55lSbbOOj9e6yW8sjxzQg6og',
  'AIzaSyAYdjWusWEWe1d2r_UNMWIRy5xkrGEVgkk',
];

const geocoderConfig = apiKeys.map(apiKey => {
  const config = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey,
    formatter: null,
  };
  return config;
})

module.exports = {
  mongoConfig,
  nerConfig,
  geocoderConfig,
};
