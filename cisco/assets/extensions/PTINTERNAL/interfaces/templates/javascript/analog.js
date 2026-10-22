var ledPin = 1;
var potPin = A0;
var value = 0;

function setup() {
	pinMode(ledPin, OUTPUT);
}

function loop() {
	// read from pot
	var newValue = analogRead(potPin);
	
	// map it from 1023 to 255
	newValue = Math.floor(map(newValue, 0, 1023, 0, 255));
	
	if (newValue != value) {
		Serial.println("new value: " + newValue);
		
		// analog write to led
		analogWrite(ledPin, newValue);
		value = newValue;
	}
}
