function setup() {
	HTTPServer.route("/", function(url, res) {
		Serial.println("Request for /");
		res.send("hello IoE");
	});

	HTTPServer.route("/test", function(url, res) {
		Serial.println("Request for /test");
		res.setContentType("text/plain");
		res.send("test content");
	});
	
	HTTPServer.route("/file", function(url, res) {
		Serial.println("Request for /file");
		res.sendFile("/test.txt");
	});

	// wild card
	HTTPServer.route("/*", function(url, res) {
		Serial.println("Request for " + url);
		res.send("hello world");
	});

	// start server on port 80
	HTTPServer.start(80);

	// write a file
	var file = FileSystem.open('/test.txt',
		File.WRITE | File.READ | File.APPEND);
	file.println("hello text");
	file.close();
}