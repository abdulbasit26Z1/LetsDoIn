var url = "http://www.cisco.com";

function setup() {
	var http = new RealHTTPClient();
	
	// when receiving data
	http.onDone = function(status, data) {
		Serial.println("status: " + status);
		Serial.println("data: " + data);
	};
	
	http.get(url);
}
