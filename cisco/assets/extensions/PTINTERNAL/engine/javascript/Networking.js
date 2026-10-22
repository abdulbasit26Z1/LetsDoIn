
UserJsApp.prototype.initNetworking = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var network = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'Network', network);
	wrapper = function() {
		var port = app.device.getPortAt(0);
		if (port)
			return interpreter.createPrimitive(port.getIpAddress());
		return interpreter.createPrimitive('0.0.0.0');
	};
	interpreter.setProperty(network, 'localIP', interpreter.createNativeFunction(wrapper));

	wrapper = function() {
		var port = app.device.getPortAt(0);
		if (port)
			return interpreter.createPrimitive(port.getSubnetMask());
		return interpreter.createPrimitive('0.0.0.0');
	};
	interpreter.setProperty(network, 'subnetMask', interpreter.createNativeFunction(wrapper));

	wrapper = function() {
		return interpreter.createPrimitive(app.device.getProcess('HostIp').getDefaultGateway());
	};
	interpreter.setProperty(network, 'gatewayIP', interpreter.createNativeFunction(wrapper));
}
