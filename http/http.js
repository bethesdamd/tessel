// http server for the tessel
// get the tessel's IP address via 'tessel wifi -l'

var http = require( 'http' );
setTimeout( function() {
	http.createServer( function (req, res) {
		res.writeHead( 200, {'Content-Type': 'text/plain'} );
		res.end('Hello World!\n');
	}).listen( 80 );
}, 10000 );

