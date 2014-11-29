// Node requires
var twitter = require('twitter');
var util = require('util')

// var twitterHandle = '@technicalhumans';
// The status to tweet
var status = 'Hello. This is your #Tessel speaking.';

// Enter the oauth key and secret information
var twit = new twitter({
  // Twitter 'Ms Johnson' account credentials:
  consumer_key: 'Shsuqj0OtJ2diGuc8KED76X3D',
  consumer_secret: 'vU7Zo45P0kQpJQBu8ihNtEMb1d0Nj9Nhp3HwNOkg66MHt90PVr',
  access_token_key: '2903191117-yK4tHpzR308POoLsETwpb1NIrGZSRBoFIEDk4rH',
  access_token_secret: 'YNo21NkdjXJ3rHuIHOyqkMxaHxdVvuXpJBFGQxr8V0CPJ'
});

// Make a tweet!
twit.updateStatus(status, function(data) {
  if (data.name === 'Error') {
    console.log('error sending tweet!', data.message);
  }
  else {
    console.log('tweet successful!');
  }
});
