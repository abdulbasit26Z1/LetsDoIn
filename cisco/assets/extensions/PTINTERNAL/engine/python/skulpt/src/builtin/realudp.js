var $builtinmodule = function(name) {
	var mod = {};
	
	var RealUDPSocket = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.socket = $createUdpSocket();
			self.socket.onReceive = function(ip, port, data) {
				if (self.onReceive && self.onReceive instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onReceive, Sk.ffi.remapToPy(ip), Sk.ffi.remapToPy(port), Sk.ffi.remapToPy(data));
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

		$loc.begin = new Sk.builtin.func(function(self, port) {
			port = Sk.ffi.getInt(port, 0);
			self.socket.begin(port);
		});

		$loc.stop = new Sk.builtin.func(function(self) {
			self.socket.stop();
		});

		$loc.error = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getError());
		});

		$loc.errorString = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getErrorString());
		});

		$loc.localIP = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getLocalIP());
		});

		$loc.localPort = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.socket.getLocalPort());
		});
		
		$loc.send = new Sk.builtin.func(function(self, ip, port, data) {
			ip = Sk.ffi.remapToJs(ip);
			port = Sk.ffi.getInt(port, 0);
			data = Sk.ffi.remapToJs(data);
			self.socket.sendData(ip, port, data);
		});
		
		$loc.joinMulticastGroup = new Sk.builtin.func(function(self, ip) {
			ip = Sk.ffi.remapToJs(ip);
			return Sk.ffi.remapToPy(self.socket.joinMulticastGroup(ip));
		});

		$loc.leaveMulticastGroup = new Sk.builtin.func(function(self, ip) {
			ip = Sk.ffi.remapToJs(ip);
			return Sk.ffi.remapToPy(self.socket.leaveMulticastGroup(ip));
		});

		$loc.onReceive = new Sk.builtin.func(function(self, callback) {
			self.onReceive = callback;
		});
	};
	mod.RealUDPSocket = Sk.misceval.buildClass(mod, RealUDPSocket, "RealUDPSocket", []);
	
	return mod;
};
