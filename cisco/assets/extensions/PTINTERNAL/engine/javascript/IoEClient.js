
UserJsApp.prototype.initIoEClient = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var IoEClient = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'IoEClient', IoEClient);

	interpreter.setProperty(IoEClient, 'setup', interpreter.createNativeFunction(function(api) {
		var api = interpreter.getNative(api);
		var json = JSON.stringify(api);
		
		this.process = app.device.getProcess('IoeClientProcess');
		if (!this.process.setupRemoteApi(json))
			throw 'IoEClient setup error';
		
		if (!this.inited) {
			this.inited = true;
			
			var processInputsReceived = function(src, args) {
				if (IoEClient.properties.onInputReceive && IoEClient.properties.onInputReceive.type == 'function') {
					interpreter.immediateCall(IoEClient, 'onInputReceive', [args.states]);
				}
			};
			this.process.registerEvent('inputReceived', null, processInputsReceived);
			
			var processStateSet = function(src, args) {
				if (IoEClient.properties.onStateSet && IoEClient.properties.onStateSet.type == 'function') {
					interpreter.immediateCall(IoEClient, 'onStateSet', [args.stateName, args.value]);
				}
			};
			this.process.registerEvent('stateSet', null, processStateSet);

			var self = this;
			app.finalizers.push({cleanUp: function() {
				self.process.unregisterEvent('inputReceived', null, processInputsReceived);
				self.process.unregisterEvent('stateSet', null, processStateSet);
			}});
		}
		
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(IoEClient, 'reportStates', interpreter.createNativeFunction(function(states) {
		if (!this.inited)
			throw 'IoEClient not setup.';
			
		states = interpreter.getNative(states);
		if (states instanceof Array) {
			states = JSON.stringify(states);
			states = states.substr(1, states.length - 2);
		}

		this.process.reportStates(states);
		return interpreter.UNDEFINED;
	}));
}
