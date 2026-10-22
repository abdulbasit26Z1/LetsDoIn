var $builtinmodule = function(name) {
	var mod = {};
	
	var IoEClient = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.inited = false;
		});

		$loc.setup = new Sk.builtin.func(function(self, api) {
		
			var api = Sk.ffi.remapToJs(api);
			var json = JSON.stringify(api);
			//Sk.app.device.addSerialOutputs(json);
			
			self.process = Sk.app.device.getProcess('IoeClientProcess');
			if (!self.process.setupRemoteApi(json))
				throw 'IoEClient setup error';
			
			if (!self.inited) {
				self.inited = true;
				
				var processInputsReceived = function(src, args) {
					if (self.onInputReceive && self.onInputReceive instanceof Sk.builtin.func) {
						Sk.app.callSim(self.onInputReceive, Sk.builtin.str(args.states));
					}
				};
				self.process.registerEvent('inputReceived', null, processInputsReceived);
				
				var processStateSet = function(src, args) {
					if (self.onStateSet && self.onStateSet instanceof Sk.builtin.func) {
						Sk.app.callSim(self.onStateSet, Sk.builtin.str(args.stateName), Sk.builtin.str(args.value));
					}
				};
				self.process.registerEvent('stateSet', null, processStateSet);

				Sk.app.finalizers.push({cleanUp: function() {
					self.process.unregisterEvent('inputReceived', null, processInputsReceived);
					self.process.unregisterEvent('stateSet', null, processStateSet);
				}});
			}
		});
		
		$loc.onInputReceive = new Sk.builtin.func(function(self, callback) {
			self.onInputReceive = callback;
		});

		$loc.onStateSet = new Sk.builtin.func(function(self, callback) {
			self.onStateSet = callback;
		});

		$loc.reportStates = new Sk.builtin.func(function(self, states) {
			if (!self.inited)
				throw 'IoEClient not setup.';

			states = Sk.ffi.remapToJs(states);
			if (states instanceof Array) {
				states = JSON.stringify(states);
				states = states.substr(1, states.length - 2);
			}
			
			self.process.reportStates(states);
		});
	};
	mod.IoEClient = Sk.misceval.callsim(Sk.misceval.buildClass(mod, IoEClient, "IoEClient", []));
	
	return mod;
};
