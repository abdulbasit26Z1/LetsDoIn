// The FileSystem API only works on the SBC device because
// the MCU devices does not have a file system.

function setup() {
	Serial.println("a exists: " + FileSystem.exists("a"));
	Serial.println("mkdir /a: " + FileSystem.mkdir("/a"));
	Serial.println("a exists: " + FileSystem.exists("a"));
	Serial.println("mkdir /b: " + FileSystem.mkdir("b"));
	Serial.println(FileSystem.dir("/"));
	Serial.println("rmdir /b: " + FileSystem.rmdir('/b'));
	
	var file = FileSystem.open('/a/a.txt',
		File.WRITE | File.READ | File.APPEND);
	Serial.println("file name: " + file.name());
	Serial.println("file location: " + file.dir());
	
	file.println("hello");
	file.println("hi");
	file.seek(0);
	while (file.available()) {
		Serial.print(file.readln());
	}
	
	// should write 255,0 because read/write only does 1 byte
	file.write(255);
	file.write(256);
	file.seek(file.position() - 2);
	Serial.println(file.read());
	Serial.println(file.read());
	
	file.close();
}
