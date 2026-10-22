var url = "http://1.1.1.1/test";

function setup() {
	var http = new HTTPClient();
	
	// when receiving data
	http.onDone = function(status, data) {
		Serial.println("status: " + status);
		Serial.println("data: " + data);
	};
	
	http.open(url);
}
