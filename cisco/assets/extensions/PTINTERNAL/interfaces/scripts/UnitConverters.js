function convertTemperature(value, isMetric) {
	if (isMetric)
		return (value - 32) / 1.8;
	else
		return value * 1.8 + 32;
}

function celsius(value) {
	return value * 1.8 + 32;
}

function fahrenheit(value) {
	return value;
}

function convertLength(value, isMetric) {
	if (isMetric)
		return value * 2.54;
	else
		return value / 2.54;
}

function cm(value) {
	return value / 2.54;
}

function inches(value) {
	return value;
}

function convertSpeed(value, isMetric) {
	if (isMetric)
		return value * 1.60934;
	else
		return value / 1.60934;
}

function kmph(value) {
	return value / 1.60934;
}

function mph(value) {
	return value;
}

function convertPressure(value, isMetric) {
	if (isMetric)
		return value * 33.863753;
	else
		return value / 33.863753;
}

function mbar(value) {
	return value / 33.863753;
}

function inHg(value) {
	return value;
}

function convertWeight(value, isMetric) {
	if (isMetric)
		return value * 0.453592;
	else
		return value / 0.453592;
}

function kg(value) {
	return value / 0.453592;
}

function lb(value) {
	return value;
}
