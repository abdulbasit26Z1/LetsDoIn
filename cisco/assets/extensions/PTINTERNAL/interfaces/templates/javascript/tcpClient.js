var serverIP = "1.1.1.1";
var serverPort = 1234;
var client;

function setup() {
	// create client
	client = new TCPClient();
	
	// when the client state changes
	client.onConnectionChange = function(type) {
		Serial.println("connection changed: " + type);
	};
	
	// when receiving data
	client.onReceive = function(data) {
		Serial.println("received: " + client.remoteIP()
			+ ":" + client.remotePort() + ", " + data);
			
		// send back the same data
		client.send(data);
	};
	
	// connect to server
	Serial.println(client.connect(serverIP, serverPort));
}
