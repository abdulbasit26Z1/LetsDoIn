var buttonPin = 0;
var ledPin = 1;
var state;

function setup() {
	pinMode(buttonPin, INPUT);
	pinMode(ledPin, OUTPUT);
	
	// read initial button state
	state = digitalRead(buttonPin);
}

function loop() {
	// read new state
	var newState = digitalRead(buttonPin);
	
	if (newState != state) {
		// write to LED pin
		digitalWrite(ledPin, newState);
		state = newState;
	}
}
