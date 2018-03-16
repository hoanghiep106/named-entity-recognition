const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'xdYM827Hgx7yJXOhMOH03Tv6h',
  consumer_secret: 'cXH5n86h50euD9RlPLh4GrWWZgwoo19CZE3s59QWYnH9U34ILy',
  access_token_key: '332790272-BCTwBkwAKDHy8fDRk4cJibk1TTV6Utu4BaNnyml8',
  access_token_secret: 'mW5oqR1WBwySMAK0NEyiUkLtqktaZsbvQi8UtxqzgyV8v'
});

const getUserTimeline = (screenName, callback) => {
  const params = {
    screen_name: screenName,
    count: 1000,
    include_rts: false,
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      callback(tweets);
    } else {
      console.log(error);
    }
  });
};

module.exports = {
  getUserTimeline,
};
