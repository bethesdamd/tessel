// My program to read temperature and tweet it

var twitter = require('twitter');
var util = require('util')
var tessel = require('tessel');
var climatelib = require('climate-si7020');
// var moment = require('moment');  // date-time formatting
var climate = climatelib.use(tessel.port['A']);
var twitter_keys = require('../mytwitterkeys')

var twit = new twitter({
  // Twitter 'Ms Johnson' @WoodAcresZap account:
  consumer_key: twitter_keys.consumer_key(),
  consumer_secret: twitter_keys.consumer_secret(),
  access_token_key: twitter_keys.access_token_key(),
  access_token_secret: twitter_keys.access_token_secret()
});

function sendTweet(twitObj, t) {
	twitObj.updateStatus(t.toString(), function(data) {
	  if (data.name === 'Error') {
	    console.log('error sending tweet!', data.message);
	  }
	  else {
	    console.log('tweet successful!');
	  }
	});
}

Date.prototype.addHours = function(h) { this.setHours(this.getHours()+h); return this; }
console.log("test date: " + new Date().addHours(-5));

function myGetDate() {
	var d = new Date().addHours(-5);
	var datetime =    (("0" + (d.getMonth() + 1)).slice(-2))  + "/"
					+  ("0" + d.getDate()).slice(-2) + "/"
	                + d.getFullYear() + " @ "  
	                + d.getHours() + ":"  
	                + d.getMinutes() + ":" 
	                + d.getSeconds();
	return datetime;
}

/*
function getNewDT() {
	return moment().format('MMMM Do YYYY, h:mm:ss a');
}
*/

climate.on('ready', function () {
  console.log('Connected to si7020');
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
      	var myTemp = temp.toFixed(2);
      	var msg = '#tessel #STEM temperature data to tweet, teaching kids electronics: ' + myGetDate() + ' |' + myTemp + '|';
        console.log('Degrees:', myTemp + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
        console.log("Sending to Twitter: " + msg)
        sendTweet(twit, msg);
        setTimeout(loop, 60 * 60 * 1000);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});
