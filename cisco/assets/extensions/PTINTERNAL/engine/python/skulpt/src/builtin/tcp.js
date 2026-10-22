var $builtinmodule = function(name) {
	var mod = {};
	
	var TCPClient = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.process = null;
		
			self.cleanUp = function() {
				if (self.process) {
					try {
						self.process.getConnection().close(null);
						self.process.unregisterEvent("connectionChanged", self, self.tcpConnectionChanged);
						self.process.unregisterDelegate("processData", self, self.processTcpData);
						Sk.app.device.getProcess('TcpProcess').deleteCustomProcess(self.process);
					} catch (e) {
					}
				}
			};
			
			Sk.app.finalizers.push(self);
		});

		$loc.connect = new Sk.builtin.func(function(self, ip, port) {
			if (self.process || self.server)
				return Sk.ffi.remapToPy(false);
				
			ip = Sk.ffi.remapToJs(ip);
			port = Sk.ffi.getInt(port, 0);
			
			var client = self;
			
			var frameInstance = ipc.simulation().createFrameInstance(Sk.app.device, 1, 0xa0dab4, ip);
			if (frameInstance) {
				frameInstance.addDecision("CUSTOM_SEND", SM_TR('The Device starts a TCP connection to the %1.').arg(ip + ':' + port), false, 7);
			}

			self.tcpConnectionChanged = function(src, args) {
				if (self.onConnectionChange && self.onConnectionChange instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onConnectionChange, Sk.builtin.assk$(args.eventType));
				}
			};
			
			self.processTcpData = function(src, args) {
				if (args.frameInstance != null) {
					args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives a TCP message."), true, 7);
					args.frameInstance.setFrameAccepted(true);
				}
				
				if (self.onReceive && self.onReceive instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onReceive, Sk.ffi.remapToPy(args.data));
				}
			};

			self.process = Sk.app.device.getProcess("TcpProcess").connect(ip, port, 0, 10000, frameInstance);
			self.process.registerEvent("connectionChanged", self, self.tcpConnectionChanged);
			self.process.registerDelegate("processData", self, self.processTcpData);

			if (frameInstance)
				ipc.simulation().finalizeFrameInstance(frameInstance);

			return Sk.ffi.remapToPy(true);
		});

		$loc.close = new Sk.builtin.func(function(self) {
			if (self.process) {
				try {
					self.process.getConnection().close(null);
					self.process.unregisterEvent("connectionChanged", self, self.tcpConnectionChanged);
					self.process.unregisterDelegate("processData", self, self.processTcpData);
					Sk.app.device.getProcess("TcpProcess").deleteCustomProcess(self.process);
				} catch (e) {
				}
			} else if (self.connection) {
				var id = self.connection.getRemoteIpString() + ':' + self.connection.getRemotePort();
				self.connection.close(null);
				delete self.server.clients[id];
			}
		});

		$loc.connected = new Sk.builtin.func(function(self) {
			var value = false;
			if (self.process)
				value = (self.process.getConnection().getState() == 3);
			else if (self.connection)
				value = (self.connection.getState() == 3);
				
			return Sk.ffi.remapToPy(value);
		});
		
		$loc.state = new Sk.builtin.func(function(self) {
			var value = 0;
			if (self.process)
				value = self.process.getConnection().getState();
			else if (self.connection)
				value = self.connection.getState();
				
			return Sk.ffi.remapToPy(value);
		});
		
		$loc.remoteIP = new Sk.builtin.func(function(self) {
			var value = '0.0.0.0';
			if (self.process)
				value = self.process.getConnection().getRemoteIpString();
			else if (self.connection)
				value = self.connection.getRemoteIpString();
				
			return Sk.ffi.remapToPy(value);
		});
		
		$loc.remotePort = new Sk.builtin.func(function(self) {
			var value = 0;
			if (self.process)
				value = self.process.getConnection().getRemotePort();
			else if (self.connection)
				value = self.connection.getRemotePort();
				
			return Sk.ffi.remapToPy(value);
		});
		
		$loc.localIP = new Sk.builtin.func(function(self) {
			var value = '0.0.0.0';
			if (self.process)
				value = self.process.getConnection().getLocalIp();
			else if (self.connection)
				value = self.connection.getLocalIp();
				
			return Sk.ffi.remapToPy(value);
		});

		$loc.localPort = new Sk.builtin.func(function(self) {
			var value = 0;
			if (self.process)
				value = self.process.getConnection().getLocalPort();
			else if (self.connection)
				value = self.connection.getLocalPort();
				
			return Sk.ffi.remapToPy(value);
		});
		
		$loc.send = new Sk.builtin.func(function(self, data) {
			var result = false;
			var conn = null;
			if (self.process)
				conn = self.process.getConnection();
			else if (self.connection)
				conn = self.connection;
			
			if (conn && conn.getState() == 3) {
				data = Sk.ffi.remapToJs(data);
				
				var frameInstance = ipc.simulation().createFrameInstance(Sk.app.device, 1, 0xa0dab4, conn.getRemoteIpString());
				if (frameInstance)
					frameInstance.addDecision("CUSTOM_SEND", SM_TR('The device sends a TCP message.'), false, 7);
					
				result = conn.sendData(data, frameInstance);

				if (frameInstance)
					ipc.simulation().finalizeFrameInstance(frameInstance);
			}
		
			return Sk.ffi.remapToPy(result);
		});

		// support both onConnectionChange and onConnectionChanged
		$loc.onConnectionChange = new Sk.builtin.func(function(self, callback) {
			self.onConnectionChange = callback;
		});
		$loc.onConnectionChanged = new Sk.builtin.func(function(self, callback) {
			self.onConnectionChange = callback;
		});

		$loc.onReceive = new Sk.builtin.func(function(self, callback) {
			self.onReceive = callback;
		});
	};
	mod.TCPClient = Sk.misceval.buildClass(mod, TCPClient, "TCPClient", []);
	
	
	var TCPServer = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.process = null;
			self.clients = {};
	
			self.cleanUp = function() {
				if (self.process) {
					try {
						self.process.getConnection().close(null);
						self.process.unregisterEvent("connectionChanged", self, self.tcpConnectionChanged);
						self.process.unregisterDelegate("processData", self, self.processTcpData);
						Sk.app.device.getProcess('TcpProcess').deleteCustomProcess(self.process);
					} catch (e) {
					}
				}
			};
			
			Sk.app.finalizers.push(self);
		});

		$loc.listen = new Sk.builtin.func(function(self, port) {
			if (self.process)
				return Sk.ffi.remapToPy(false);
				
			port = Sk.ffi.getInt(port, 0);
			
			var server = self;
			
			self.tcpConnectionChanged = function(src, args) {
				// create a TCPClient
				// set tcpClient.server = this
				// save the tcpClient
				var ip = args.connection.getRemoteIpString();
				var port = args.connection.getRemotePort();
				var id = ip + ':' + port;
				var client = server.clients[id];
				if (!client) {
					client = Sk.misceval.callsim(mod.TCPClient);
					client.server = server;
					client.connection = args.connection;
					server.clients[id] = client;
				}
				
				// if established
				if (args.eventType == 0) {
					if (server.onNewClient && server.onNewClient instanceof Sk.builtin.func) {
						Sk.app.callSim(server.onNewClient, client);
					}
				} else {
					if (client.onConnectionChange && client.onConnectionChange instanceof Sk.builtin.func) {
						Sk.app.callSim(client.onConnectionChange, Sk.builtin.assk$(args.eventType));
					}
				}
			};
			
			self.processTcpData = function(src, args) {
				if (args.frameInstance != null) {
					args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives a TCP message."), true, 7);
					args.frameInstance.setFrameAccepted(true);
				}
				
				// get the tcp client
				// if the tcp client has onData, call it
				var id = args.connection.getRemoteIpString() + ':' + args.connection.getRemotePort();
				var client = server.clients[id];
				if (client.onReceive && client.onReceive instanceof Sk.builtin.func) {
					Sk.app.callSim(client.onReceive, Sk.builtin.str(args.data));
				}
			};

			self.process = Sk.app.device.getProcess("TcpProcess").listen(port, false);
			self.process.registerEvent("connectionChanged", self, self.tcpConnectionChanged);
			self.process.registerDelegate("processData", self, self.processTcpData);

			return Sk.ffi.remapToPy(true);
		});

		$loc.stop = new Sk.builtin.func(function(self) {
			if (self.process == null)
				return;
			
			try {
				self.process.getConnection().close(null);
				self.process.unregisterEvent("connectionChanged", self, self.tcpConnectionChanged);
				self.process.unregisterDelegate("processData", self, self.processTcpData);
				Sk.app.device.getProcess("TcpProcess").deleteCustomProcess(self.process);
			} catch (e) {
			}
		});
		
		$loc.onNewClient = new Sk.builtin.func(function(self, callback) {
			self.onNewClient = callback;
		});
	};
	mod.TCPServer = Sk.misceval.buildClass(mod, TCPServer, "TCPServer", []);

	return mod;
};
