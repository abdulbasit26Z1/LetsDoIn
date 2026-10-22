var $builtinmodule = function(name) {
	var mod = {};
	
	var UDPSocket = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.process = Sk.app.device.getProcess('UdpProcess').createCustomUdpProcess();
			self.processUdpData = function(src, args) {
				if (args.frameInstance != null) {
					args.frameInstance.addDecision("RECEIVE", SM_TR("The device receives an UDP message."), true, 7);
					args.frameInstance.setFrameAccepted(true);
				}
				
				if (self.onReceive && self.onReceive instanceof Sk.builtin.func) {
					Sk.app.callSim(self.onReceive,
						Sk.builtin.str(args.srcIp),
						Sk.builtin.assk$(args.srcPort),
						Sk.builtin.str(args.data));
				}
			};
			self.process.registerDelegate("processData", self, self.processUdpData);
			
			self.cleanUp = function() {
				self.process.unregisterDelegate("processData", self, self.processUdpData);
				Sk.app.device.getProcess('UdpProcess').deleteCustomUdpProcess(self.process);
			};
			
			Sk.app.finalizers.push(self);
		});

		$loc.begin = new Sk.builtin.func(function(self, port) {
			port = Sk.ffi.getInt(port, 0);
			return Sk.ffi.remapToPy(self.process.start(port));
		});

		$loc.stop = new Sk.builtin.func(function(self) {
			self.process.stop();
		});

		$loc.send = new Sk.builtin.func(function(self, ip, port, data) {
			ip = Sk.ffi.remapToJs(ip);
			port = Sk.ffi.getInt(port, 0);
			data = Sk.ffi.remapToJs(data);

			var frameInstance = ipc.simulation().createFrameInstance(Sk.app.device, 2, 0xff0000, ip);
			if (frameInstance) {
				frameInstance.addDecision("CUSTOM_SEND", SM_TR("The device sends a UDP message."), false, 7);
			}

			var result = self.process.sendData(data, ip, port, frameInstance, null);

			if (frameInstance)
				ipc.simulation().finalizeFrameInstance(frameInstance);
		
			return Sk.ffi.remapToPy(result);
		});
		
		$loc.onReceive = new Sk.builtin.func(function(self, callback) {
			self.onReceive = callback;
		});
	};
	mod.UDPSocket = Sk.misceval.buildClass(mod, UDPSocket, "UDPSocket", []);

	return mod;
};
