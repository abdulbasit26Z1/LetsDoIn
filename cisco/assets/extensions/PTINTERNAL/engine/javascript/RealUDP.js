
UserJsApp.prototype.initRealUdp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	// RealUDPSocket
	var RealUDPSocket;
	RealUDPSocket = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == RealUDPSocket) {
			obj = this;
		} else {
			obj = interpreter.createObject(RealUDPSocket);
		}
		
		obj.socket = $createUdpSocket();
		obj.socket.onReceive = function(ip, port, data) {
			if (obj.properties.onReceive && obj.properties.onReceive.type == 'function') {
				interpreter.immediateCall(obj, 'onReceive', [ip, port, data]);
			}
		};
		
		obj.cleanUp = function() {
			if (obj.socket) {
				try {
					obj.socket.cleanUp();
					obj.socket = null;
				} catch (e) {
				}
			}
		};
		
		app.finalizers.push(obj);
		return obj;
	});
	interpreter.setProperty(scope, 'RealUDPSocket', RealUDPSocket);

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'begin', interpreter.createNativeFunction(function(port) {
		port = interpreter.getInt(port, 0);
		return interpreter.createPrimitive(this.socket.begin(port));
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'stop', interpreter.createNativeFunction(function() {
		this.socket.stop();
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(RealUDPSocket.properties.prototype, 'error', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getError());
	}));
	
	interpreter.setProperty(RealUDPSocket.properties.prototype, 'errorString', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getErrorString());
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'localIP', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getLocalIP());
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'localPort', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getLocalPort());
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'send', interpreter.createNativeFunction(function(ip, port, data) {
		ip = ip.toString();
		port = interpreter.getInt(port, 0);
		data = data.toString();
		this.socket.sendData(ip, port, data);
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'joinMulticastGroup', interpreter.createNativeFunction(function(ip) {
		ip = ip.toString();
		return interpreter.createPrimitive(this.socket.joinMulticastGroup(ip));
	}));

	interpreter.setProperty(RealUDPSocket.properties.prototype, 'leaveMulticastGroup', interpreter.createNativeFunction(function(ip) {
		ip = ip.toString();
		return interpreter.createPrimitive(this.socket.leaveMulticastGroup(ip));
	}));
}
