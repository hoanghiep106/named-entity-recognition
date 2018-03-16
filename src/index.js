const { inferTweetLocation } = require('./inferences/tweets');
const { inferUserLocation } = require('./inferences/users');
const args = require("args-parser")(process.argv)

if (args.user) {
  inferUserLocation();
}

if (args.tweet) {
  inferTweetLocation();
}
