var server = "1.1.1.1";
var serverPort = 1234;

var client;
var count = 0;

function setup() {
	// create client
	client = new RealTCPClient();
	
	// when the client state changes
	client.onConnectionChange = function(type) {
		Serial.println("connection changed: " + type);
	};
	
	// when receiving data
	client.onReceive = function(data) {
		Serial.println("received: " + client.remoteIP()
			+ ":" + client.remotePort() + ", " + data);
	};
	
	// connect to server
	client.connect(server, serverPort);
}

function loop() {
	// send one msg every sec
	client.send("hello " + (count++));
	delay(1000);
}
