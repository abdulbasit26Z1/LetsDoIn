
UserJsApp.prototype.initTcp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	// TCPClient
	var TCPClient;
	TCPClient = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == TCPClient) {
			obj = this;
		} else {
			obj = interpreter.createObject(TCPClient);
		}
		obj.process = null;
		
		obj.cleanUp = function() {
			if (obj.process) {
				try {
					obj.process.getConnection().close(null);
					obj.process.unregisterEvent("connectionChanged", obj, obj.tcpConnectionChanged);
					obj.process.unregisterDelegate("processData", obj, obj.processTcpData);
					app.device.getProcess('TcpProcess').deleteCustomProcess(obj.process);
				} catch (e) {
				}
			}
		};
		
		app.finalizers.push(obj);
		return obj;
	});
	interpreter.setProperty(scope, 'TCPClient', TCPClient);

	interpreter.setProperty(TCPClient.properties.prototype, 'connect', interpreter.createNativeFunction(function(ip, port) {
		if (this.process || this.server)
			return interpreter.createPrimitive(false);
			
		ip = ip.toString();
		port = interpreter.getInt(port, 0);
		
		var client = this;
		
		var frameInstance = ipc.simulation().createFrameInstance(app.device, 1, 0xa0dab4, ip);
		if (frameInstance) {
			frameInstance.addDecision("CUSTOM_SEND", SM_TR('The Device starts a TCP connection to the %1.').arg(ip + ':' + port), false, 7);
		}

		this.tcpConnectionChanged = function(src, args) {
			// support both onConnectionChange and onConnectionChanged
			if (client.properties.onConnectionChange && client.properties.onConnectionChange.type == 'function') {
				interpreter.immediateCall(client, 'onConnectionChange', [args.eventType]);
			} else if (client.properties.onConnectionChanged && client.properties.onConnectionChanged.type == 'function') {
				interpreter.immediateCall(client, 'onConnectionChanged', [args.eventType]);
			}
		};
		
		this.processTcpData = function(src, args) {
			if (args.frameInstance != null) {
				args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives a TCP message."), true, 7);
				args.frameInstance.setFrameAccepted(true);
			}
			
			if (client.properties.onReceive && client.properties.onReceive.type == 'function') {
				interpreter.immediateCall(client, 'onReceive', [args.data]);
			}
		};

		this.process = app.device.getProcess("TcpProcess").connect(ip, port, 0, 10000, frameInstance);
		this.process.registerEvent("connectionChanged", this, this.tcpConnectionChanged);
		this.process.registerDelegate("processData", this, this.processTcpData);

		if (frameInstance)
			ipc.simulation().finalizeFrameInstance(frameInstance);

		return interpreter.createPrimitive(true);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'close', interpreter.createNativeFunction(function() {
		if (this.process) {
			try {
				this.process.getConnection().close(null);
				this.process.unregisterEvent("connectionChanged", this, this.tcpConnectionChanged);
				this.process.unregisterDelegate("processData", this, this.processTcpData);
				app.device.getProcess("TcpProcess").deleteCustomProcess(this.process);
			} catch (e) {
			}
		} else if (this.connection) {
			var id = this.connection.getRemoteIpString() + ':' + this.connection.getRemotePort();
			this.connection.close(null);
			delete this.server.clients[id];
		}
		
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(TCPClient.properties.prototype, 'connected', interpreter.createNativeFunction(function() {
		var value = false;
		if (this.process)
			value = (this.process.getConnection().getState() == 3);
		else if (this.connection)
			value = (this.connection.getState() == 3);
			
		return interpreter.createPrimitive(value);
	}));
	
	interpreter.setProperty(TCPClient.properties.prototype, 'state', interpreter.createNativeFunction(function() {
		var value = 0;
		if (this.process)
			value = this.process.getConnection().getState();
		else if (this.connection)
			value = this.connection.getState();
			
		return interpreter.createPrimitive(value);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'remoteIP', interpreter.createNativeFunction(function() {
		var value = "0.0.0.0";
		if (this.process)
			value = this.process.getConnection().getRemoteIpString();
		else if (this.connection)
			value = this.connection.getRemoteIpString();
			
		return interpreter.createPrimitive(value);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'remotePort', interpreter.createNativeFunction(function() {
		var value = 0;
		if (this.process)
			value = this.process.getConnection().getRemotePort();
		else if (this.connection)
			value = this.connection.getRemotePort();
			
		return interpreter.createPrimitive(value);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'localIP', interpreter.createNativeFunction(function() {
		var ip;
		if (this.process)
			ip = this.process.getConnection().getLocalIp();
		else if (this.connection)
			ip = this.connection.getLocalIp();
		return interpreter.createPrimitive(ip);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'localPort', interpreter.createNativeFunction(function() {
		var value = 0;
		if (this.process)
			value = this.process.getConnection().getLocalPort();
		else if (this.connection)
			value = this.connection.getLocalPort();
			
		return interpreter.createPrimitive(value);
	}));

	interpreter.setProperty(TCPClient.properties.prototype, 'send', interpreter.createNativeFunction(function(data) {
		var result = false;
		var conn = null;
		if (this.process)
			conn = this.process.getConnection();
		else if (this.connection)
			conn = this.connection;
		
		if (conn && conn.getState() == 3) {
			data = data.toString();
			
			var frameInstance = ipc.simulation().createFrameInstance(app.device, 1, 0xa0dab4, conn.getRemoteIpString());
			if (frameInstance)
				frameInstance.addDecision("CUSTOM_SEND", SM_TR('The device sends a TCP message.'), false, 7);
				
			result = conn.sendData(data, frameInstance);

			if (frameInstance)
				ipc.simulation().finalizeFrameInstance(frameInstance);
		}
	
		return interpreter.createPrimitive(result);
	}));
	
	interpreter.setProperty(TCPClient, 'EVENT_CONNECTION_ACTIVE', interpreter.createPrimitive(0));
	interpreter.setProperty(TCPClient, 'EVENT_CONNECTION_TIMEOUT', interpreter.createPrimitive(1));
	interpreter.setProperty(TCPClient, 'EVENT_CONNECTION_REQUEST', interpreter.createPrimitive(2));
	interpreter.setProperty(TCPClient, 'EVENT_PEER_CLOSE', interpreter.createPrimitive(3));
	interpreter.setProperty(TCPClient, 'EVENT_PEER_ABORT', interpreter.createPrimitive(4));
	
	interpreter.setProperty(TCPClient, 'STATE_CLOSED', interpreter.createPrimitive(0));
	interpreter.setProperty(TCPClient, 'STATE_SYN_SENT', interpreter.createPrimitive(1));
	interpreter.setProperty(TCPClient, 'STATE_SYN_RECEIVED', interpreter.createPrimitive(2));
	interpreter.setProperty(TCPClient, 'STATE_ESTABLISHED', interpreter.createPrimitive(3));
	interpreter.setProperty(TCPClient, 'STATE_LISTEN', interpreter.createPrimitive(4));
	interpreter.setProperty(TCPClient, 'STATE_FIN_WAIT_1', interpreter.createPrimitive(5));
	interpreter.setProperty(TCPClient, 'STATE_TIMED_WAIT', interpreter.createPrimitive(6));
	interpreter.setProperty(TCPClient, 'STATE_CLOSE_WAIT', interpreter.createPrimitive(7));
	interpreter.setProperty(TCPClient, 'STATE_FIN_WAIT_2', interpreter.createPrimitive(8));
	interpreter.setProperty(TCPClient, 'STATE_LAST_ACK', interpreter.createPrimitive(9));
	interpreter.setProperty(TCPClient, 'STATE_CLOSING', interpreter.createPrimitive(10));

	// TCP server
	var TCPServer;
	TCPServer = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == TCPServer) {
			obj = this;
		} else {
			obj = interpreter.createObject(TCPServer);
		}
		obj.process = null;
		obj.clients = {};
		
		obj.cleanUp = function() {
			if (obj.process) {
				try {
					obj.process.unregisterEvent("connectionChanged", obj, obj.tcpConnectionChanged);
					obj.process.unregisterDelegate("processData", obj, obj.processTcpData);
					obj.process.getConnection().close(null);
					app.device.getProcess('TcpProcess').deleteCustomProcess(obj.process);
				} catch (e) {
					dprint('tcp server cleanup error: ' + e);
				}
			}
		};
		
		app.finalizers.push(obj);
		return obj;
	});
	interpreter.setProperty(scope, 'TCPServer', TCPServer);

	interpreter.setProperty(TCPServer.properties.prototype, 'listen', interpreter.createNativeFunction(function(port) {
		if (this.process)
			return interpreter.createPrimitive(false);

		port = interpreter.getInt(port, 0);
		
		var server = this;
		
		this.tcpConnectionChanged = function(src, args) {
			// create a TCPClient
			// set tcpClient.server = this
			// save the tcpClient
			var ip = args.connection.getRemoteIpString();
			var port = args.connection.getRemotePort();
			var id = ip + ':' + port;
			var client = server.clients[id];
			if (!client) {
				client = interpreter.createObject(TCPClient);
				client.server = server;
				client.connection = args.connection;
				server.clients[id] = client;
			}
			
			// if established
			if (args.eventType == 0) {
				interpreter.immediateCall(server, '_onNewClient', [ip, port]);
			} else {
				interpreter.immediateCall(server, '_onConnectionChanged', [ip, port, args.eventType]);
			}
		};
		
		this.processTcpData = function(src, args) {
			if (args.frameInstance != null) {
				args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives a TCP message."), true, 7);
				args.frameInstance.setFrameAccepted(true);
			}
			
			// get the tcp client
			// if the tcp client has onData, call it
			interpreter.immediateCall(server, '_onReceive', [args.connection.getRemoteIpString(), args.connection.getRemotePort(), args.data]);
		};

		this.process = app.device.getProcess("TcpProcess").listen(port, false);
		this.process.registerEvent("connectionChanged", this, this.tcpConnectionChanged);
		this.process.registerDelegate("processData", this, this.processTcpData);

		return interpreter.createPrimitive(true);
	}));

	interpreter.setProperty(TCPServer.properties.prototype, 'stop', interpreter.createNativeFunction(function() {
		if (this.process == null)
			return interpreter.UNDEFINED;
		
		try {
			this.process.unregisterEvent("connectionChanged", this, this.tcpConnectionChanged);
			this.process.unregisterDelegate("processData", this, this.processTcpData);
			this.process.getConnection().close(null);
			app.device.getProcess("TcpProcess").deleteCustomProcess(this.process);
		} catch (e) {
		}

		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(TCPServer.properties.prototype, '_getClient', interpreter.createNativeFunction(function(ip, port) {
		var id = ip.toString() + ':' + port.toString();
		var client = this.clients[id];
		if (client)
			return client;
		return interpreter.UNDEFINED;
	}));
}

UserJsApp.addPreprocessor(function() {
	var code = 'TCPServer.prototype._onNewClient = function(ip, port) {'
		+ 'if (this.onNewClient) this.onNewClient(this._getClient(ip, port));'
		+ '}\n'
		+ 'TCPServer.prototype._onConnectionChanged = function(ip, port, type) {'
		+ 'var client = this._getClient(ip, port);'
		+ 'if (client.onConnectionChange) client.onConnectionChange(type);'
		+ 'else if (client.onConnectionChanged) client.onConnectionChanged(type);'
		+ '}\n'
		+ 'TCPServer.prototype._onReceive = function(ip, port, data) {'
		+ 'var client = this._getClient(ip, port);'
		+ 'if (client.onReceive) client.onReceive(data);'
		+ '}\n'
	
	this.code = code + this.code;
});
