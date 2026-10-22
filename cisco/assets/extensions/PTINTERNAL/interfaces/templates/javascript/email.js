function setup() {
	EmailClient.setup(
		"mcu@cisco.com",
		"cisco.com",
		"mcu",
		"password"
	);
	
	EmailClient.onReceive = function(sender, subject, body) {
		Serial.println("Received from: " + sender);
		Serial.println("Subject: " + subject);
		Serial.println("Body: " + body);
	};
	
	EmailClient.onSend = function(status) {
		Serial.println("Sent: " + status);
	};
	
	EmailClient.send("pc@cisco.com", "hello", "world");
}

function loop() {
	EmailClient.receive();
	delay(5000);
}
