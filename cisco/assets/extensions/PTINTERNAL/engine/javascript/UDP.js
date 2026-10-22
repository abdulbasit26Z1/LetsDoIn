
UserJsApp.prototype.initUdp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var UDPSocket;
	wrapper = function() {
		var obj;
		if (this.parent == UDPSocket) {
			obj = this;
		} else {
			obj = interpreter.createObject(UDPSocket);
		}
		
		obj.process = app.device.getProcess('UdpProcess').createCustomUdpProcess();
		obj.processUdpData = function(src, args) {
			if (args.frameInstance != null) {
				args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives an UDP message."), true, 7);
				args.frameInstance.setFrameAccepted(true);
			}
			
			if (obj.properties.onReceive && obj.properties.onReceive.type == 'function') {
				interpreter.immediateCall(obj, 'onReceive', [args.srcIp, args.srcPort, args.data]);
			}
		};
		obj.process.registerDelegate("processData", obj, obj.processUdpData);
		
		obj.cleanUp = function() {
			obj.process.unregisterDelegate("processData", obj, obj.processUdpData);
			app.device.getProcess('UdpProcess').deleteCustomUdpProcess(obj.process);
		};
		
		app.finalizers.push(obj);
		return obj;
	};
	UDPSocket = interpreter.createNativeFunction(wrapper);
	interpreter.setProperty(scope, 'UDPSocket', UDPSocket);

	wrapper = function(port) {
		port = interpreter.getInt(port, 0);
		return interpreter.createPrimitive(this.process.start(port));
	};
	interpreter.setProperty(UDPSocket.properties.prototype, 'begin', interpreter.createNativeFunction(wrapper));

	wrapper = function() {
		this.process.stop();
		return interpreter.UNDEFINED;
	};
	interpreter.setProperty(UDPSocket.properties.prototype, 'stop', interpreter.createNativeFunction(wrapper));

	wrapper = function(ip, port, data) {
		ip = ip.toString();
		port = interpreter.getInt(port, 0);
		data = data.toString();
		
		var frameInstance = ipc.simulation().createFrameInstance(app.device, 2, 0xff0000, ip);
		if (frameInstance) {
			frameInstance.addDecision("CUSTOM_SEND", SM_TR("The device sends a UDP message."), false, 7);
		}

		var result = this.process.sendData(data, ip, port, frameInstance, null);

		if (frameInstance)
			ipc.simulation().finalizeFrameInstance(frameInstance);
	
		return interpreter.createPrimitive(result);
	};
	interpreter.setProperty(UDPSocket.properties.prototype, 'send', interpreter.createNativeFunction(wrapper));
}
