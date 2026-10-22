var count = 0;

function setup() {
	// start USB0
	USB0.begin(57600);
}

function loop() {
	// read from USB0
	while (USB0.available())
		Serial.print(USB0.readln());

	// write to USB0
	USB0.println("USB0 " + count++);
	
	delay(1000);
}
