var sbcBtnState;
var mcuBtnState;

function setup() {
	pinMode(0, INPUT);
	pinMode(1, OUTPUT);
	sbcBtnState = digitalRead(0);

	PTmata0.begin(57600);
	PTmata0.pinMode(0, INPUT);
	PTmata0.pinMode(1, OUTPUT);
	mcuBtnState = PTmata0.digitalRead(0);
}

function loop() {
	// process all inputs
	while (PTmata0.available())
		PTmata0.processInput();

	// if local button changes, write to remote
	var newSbcBtnState = digitalRead(0);
	if (newSbcBtnState != sbcBtnState) {
		sbcBtnState = newSbcBtnState;
		PTmata0.digitalWrite(1, sbcBtnState);
	}

	// if remote button changes, write to local
	var newMcuBtnState = PTmata0.digitalRead(0);
	if (newMcuBtnState != mcuBtnState) {
		mcuBtnState = newMcuBtnState;
		digitalWrite(1, mcuBtnState);
	}
}
