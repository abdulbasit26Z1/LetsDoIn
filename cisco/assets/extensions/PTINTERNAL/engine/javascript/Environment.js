
UserJsApp.prototype.initEnvironment = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var Environment = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'Environment', Environment);

	interpreter.setProperty(Environment, 'setup', interpreter.createNativeFunction(function(api) {
	    var api = interpreter.getNative(api);
	    this.setup = api;
		
		this.inited = true;

	
		/*		
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
			
			var self = this;
			app.finalizers.push({cleanUp: function() {
				self.process.unregisterEvent('inputReceived', null, processInputsReceived);
			}});
		}
		
*/
		return interpreter.UNDEFINED;
	}));


    
    interpreter.setProperty(Environment, 'setContribution', interpreter.createNativeFunction(function(env, rate, limit, bCumulative) {
        if (limit == interpreter.UNDEFINED || typeof(limit)=="undefined"){
            if ( rate > 0 )
                limit = Number.MAX_VALUE;
            else
                limit = -Number.MAX_VALUE;
        }

        if (bCumulative == interpreter.UNDEFINED || typeof (bCumulative) == "undefined")
            bCumulative = true;

        app.device.getPhysicalObject().getParent().getEnvironment().setContribution(env, app.device.getName(), rate, limit, bCumulative);

        return interpreter.UNDEFINED;
    }));

    interpreter.setProperty(Environment, 'removeCumulativeContribution', interpreter.createNativeFunction(function(env) {

        app.device.getPhysicalObject().getParent().getEnvironment().removeCumulativeContribution(env, app.device.getName());

        return interpreter.UNDEFINED;
    }));

    
    interpreter.setProperty(Environment, 'setTransferenceMultiplier', interpreter.createNativeFunction(function(env, multiplier) {

        app.device.getPhysicalObject().getParent().getEnvironment().setThingTransferenceMultiplier(env, app.device.getName(), multiplier);

        return interpreter.UNDEFINED;
    }));



    interpreter.setProperty(Environment, 'getTotalContributions', interpreter.createNativeFunction(function(env) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getTotalContributions(env);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'getCumulativeContribution', interpreter.createNativeFunction(function(env) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getCumulativeContribution(env, app.device.getName());

        return interpreter.createPrimitive(value);
    }));  

    interpreter.setProperty(Environment, 'get', interpreter.createNativeFunction(function(env) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getEnvironmentValue(env);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'getMetricValue', interpreter.createNativeFunction(function(env) {

        //        var value = app.device.getPhysicalObject().getParent().getEnvironmentValue(env);
        var value = app.device.getPhysicalObject().getParent().getEnvironment().getMetricValue(env);

        return interpreter.createPrimitive(value);
    }));    
    
    interpreter.setProperty(Environment, 'getValueWithUnit', interpreter.createNativeFunction(function(env) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getValueWithUnit(env);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'getUnit', interpreter.createNativeFunction(function(env) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getUnit(env);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'getVolume', interpreter.createNativeFunction(function() {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getVolume();

        return interpreter.createPrimitive(value);
    }));  
    

    interpreter.setProperty(Environment, 'setGlobalProperty', interpreter.createNativeFunction(function(prop, value) {

        ipc.appWindow().getActiveWorkspace().setProperty(prop, value);

        return interpreter.UNDEFINED;
    }));

    interpreter.setProperty(Environment, 'getGlobalProperty', interpreter.createNativeFunction(function(prop) {

        var value = ipc.appWindow().getActiveWorkspace().getProperty(prop);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'hasGlobalProperty', interpreter.createNativeFunction(function(prop) {

        var value = ipc.appWindow().getActiveWorkspace().hasProperty(prop);

        return interpreter.createPrimitive(value);
    }));

    interpreter.setProperty(Environment, 'getTimeInSeconds', interpreter.createNativeFunction(function() {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getTimeInSeconds();

        return interpreter.createPrimitive(value);
    }));     
    
    interpreter.setProperty(Environment, 'getElapsedTime', interpreter.createNativeFunction(function(lastTime) {

        var value = app.device.getPhysicalObject().getParent().getEnvironment().getElapsedTime(lastTime);

        return interpreter.createPrimitive(value);
    }));   
}
