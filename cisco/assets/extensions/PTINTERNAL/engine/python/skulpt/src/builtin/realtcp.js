var $builtinmodule = function(name) {
	var mod = {};
	
	var RealTCPClient = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.socket = $createTcpSocket();
			self.socket.onStateChange = function(state) {
				if (self.onConnectionChange && self.onConnectionChange instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onConnectionChange, Sk.builtin.assk$(state));
				}
			};
			self.socket.onReceive = function(data) {
				if (self.onReceive && self.onReceive instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onReceive, Sk.ffi.remapToPy(data));
				}
			};
		
			self.cleanUp = function() {
				if (self.socket) {
					try {
						self.socket.cleanUp();
						self.socket = null;
					} catch (e) {
					}
				}
			};
			
			Sk.app.finalizers.push(self);
		});

		$loc.connect = new Sk.builtin.func(function(self, host, port) {
			host = Sk.ffi.remapToJs(host);
			port = Sk.ffi.getInt(port, 0);
			self.socket.connect(host, port);
		});

		$loc.close = new Sk.builtin.func(function(self) {
			self.socket.disconnect();
		});

		$loc.connected = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getState() == 3);
		});
		
		$loc.state = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getState());
		});
		
		$loc.error = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getError());
		});

		$loc.errorString = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getErrorString());
		});

		$loc.remoteIP = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getRemoteIP());
		});

		$loc.remoteHost = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getRemoteHost());
		});
		
		$loc.remotePort = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getRemotePort());
		});
		
		$loc.localIP = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getLocalIP());
		});

		$loc.localPort = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getLocalPort());
		});
		
		$loc.send = new Sk.builtin.func(function(self, data) {
			data = Sk.ffi.remapToJs(data);
			self.socket.sendData(data);
		});

		$loc.onConnectionChange = new Sk.builtin.func(function(self, callback) {
			self.onConnectionChange = callback;
		});

		$loc.onReceive = new Sk.builtin.func(function(self, callback) {
			self.onReceive = callback;
		});
	};
	mod.RealTCPClient = Sk.misceval.buildClass(mod, RealTCPClient, "RealTCPClient", []);
	
	return mod;
};
