var port = 1234;
var server;
var count = 0;

function setup() {
	// create server
	server = new TCPServer();
	
	// when new client is connected
	server.onNewClient = function(client) {
	
		Serial.println("new client: " + client.remoteIP()
			+ ":" + client.remotePort());
			
		// when the client state changes
		client.onConnectionChange = function(type) {
			Serial.println("connection changed: " + type);
		};
		
		// when receiving data from client
		client.onReceive = function(data) {
			// print it and then disconnect
			Serial.println("received: " + client.remoteIP()
				+ ":" + client.remotePort() + ", " + data);
			client.close();
		};
		
		// send a msg to client
		client.send("hello " + (count++));
	};
	
	// start listening on port
	Serial.println(server.listen(port));
}
