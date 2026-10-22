
UserJsApp.prototype.initRealTcp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	// RealTCPClient
	var RealTCPClient;
	RealTCPClient = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == RealTCPClient) {
			obj = this;
		} else {
			obj = interpreter.createObject(RealTCPClient);
		}
		
		obj.socket = $createTcpSocket();
		obj.socket.onStateChange = function(state) {
			if (obj.properties.onConnectionChange && obj.properties.onConnectionChange.type == 'function') {
				interpreter.immediateCall(obj, 'onConnectionChange', [state]);
			}
		};
		obj.socket.onReceive = function(data) {
			if (obj.properties.onReceive && obj.properties.onReceive.type == 'function') {
				interpreter.immediateCall(obj, 'onReceive', [data]);
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
	interpreter.setProperty(scope, 'RealTCPClient', RealTCPClient);

	interpreter.setProperty(RealTCPClient.properties.prototype, 'connect', interpreter.createNativeFunction(function(host, port) {
		host = host.toString();
		port = interpreter.getInt(port, 0);
		
		this.socket.connect(host, port);
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'close', interpreter.createNativeFunction(function() {
		this.socket.disconnect();
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(RealTCPClient.properties.prototype, 'connected', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getState() == 3);
	}));
	
	interpreter.setProperty(RealTCPClient.properties.prototype, 'state', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getState());
	}));
	
	interpreter.setProperty(RealTCPClient.properties.prototype, 'error', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getError());
	}));
	
	interpreter.setProperty(RealTCPClient.properties.prototype, 'errorString', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getErrorString());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'remoteIP', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getRemoteIP());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'remoteHost', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getRemoteHost());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'remotePort', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getRemotePort());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'localIP', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getLocalIP());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'localPort', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.socket.getLocalPort());
	}));

	interpreter.setProperty(RealTCPClient.properties.prototype, 'send', interpreter.createNativeFunction(function(data) {
		data = data.toString();
		this.socket.sendData(data);
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(RealTCPClient, 'STATE_UNCONNECTED', interpreter.createPrimitive(0));
	interpreter.setProperty(RealTCPClient, 'STATE_HOST_LOOKUP', interpreter.createPrimitive(1));
	interpreter.setProperty(RealTCPClient, 'STATE_CONNECTING', interpreter.createPrimitive(2));
	interpreter.setProperty(RealTCPClient, 'STATE_CONNECTED', interpreter.createPrimitive(3));
	interpreter.setProperty(RealTCPClient, 'STATE_CLOSING', interpreter.createPrimitive(6));
}
