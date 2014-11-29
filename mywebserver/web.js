/* This code works and was lifted out of here (there is more code there):
  https://github.com/seanami/tessel-temp-tracker/blob/master/index.js
  I'm just testing out how to create a web server and returning text, the example
  actually shows how to return values from a climate sensor and could be useful later.
*/

var tessel = require('tessel');
var wifi = require('wifi-cc3000');
var http = require('http');

function setupServer() {
  http.createServer(function(req, res) {
    if (req.method === 'GET' && req.url === '/') {
      console.log('Serving webpage');

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Time, Temperature (F), Humidity (%RH)\n');
      /*
      storage.forEach(function(data) {
        res.write(data[0] + ', ' + data[1].toFixed(2) + ', ' + data[2].toFixed(2) + '\n');
      });
      */

      res.end();
    } else {
      console.log('Unknown webpage request');
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found\n');
    }
  }).listen(80);
}

if (wifi.isConnected()) {
  setupServer();
} else {
  wifi.on('connect', setupServer);
}
