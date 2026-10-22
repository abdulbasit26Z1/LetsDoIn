var port = 1234;
var dstIP = "1.1.1.1";

var socket;
var count = 0;

function setup() {
	socket = new RealUDPSocket();
	
	// when receiving data
	socket.onReceive = function(ip, port, data) {
		Serial.println("received from "
			+ ip + ":" + port + ": " + data);
	};
	
	// start UDP socket on port
	Serial.println(socket.begin(port));
}

function loop() {
	// send one msg every sec
	socket.send(dstIP, port, "hello " + (count++));
	delay(1000);
}
