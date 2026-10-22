function setup() {
	PTmata0.begin(57600);
}

function loop() {
	while (PTmata0.available())
		PTmata0.processInput();
		
	PTmata0.readAndReportData();
}
