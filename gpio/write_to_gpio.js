/* From https://tessel.io/docs/hardwareAPI#pins
	NOTE: the program has to keep running in order to see anything happen, i.e., 
	don't change a pin and then expect to see it if the program halts
*/

var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var myPin = gpio.pin['G3']; // on GPIO, can be gpio.digital[0] through 5 or gpio.pin['G3'] through ‘G6’

// Toggle the pin n times with a delay of delayMs between each toggle
function nPulses(n, delayMs) {
	t = 0;
	var intervalId = setInterval(function () {
		myPin.toggle();
		if (++t === n) {
       clearInterval(intervalId);
   }
	}, delayMs);

}

// Toggle 100 times with 50 ms interval
nPulses(3200, 1);

/*
while (true) {
	// Turn on the pin
	myPin.output(1); // setting ‘true’ has the same effect
	sleep
}
*/

// Read the pin
// console.log('Reading pin:', myPin.read());

// Turn off the pin
// myPin.output(0); // setting ‘false’ has the same effect. We could also call myPin.toggle() here.

// Read the pin
// console.log('Reading pin:', myPin.read());

