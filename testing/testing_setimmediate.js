// Tests of setImmediate
var http = require('http');

var options = {
  host: 'www.httpstat.us',
  path: '/'
};

callback = function(response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

doSomething = function() {
  http.request(options, callback).end();  
}

setImmediate(function loop () {
  doSomething(function () {
      setTimeout(loop, 7000);
    });
});


