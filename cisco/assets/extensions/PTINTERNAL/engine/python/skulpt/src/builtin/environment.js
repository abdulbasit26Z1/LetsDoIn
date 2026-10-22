var $builtinmodule = function(name) {
	var mod = {};
	
	var Environment = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.inited = true;
            Sk.app.finalizers.push(self);
		});

		$loc.setContribution = new Sk.builtin.func(function(self, env, rate, limit, bCumulative) {
		    env = Sk.ffi.remapToJs(env);
		    rate = Sk.ffi.remapToJs(rate);
		    limit = Sk.ffi.remapToJs(limit);
		    bCumulative = Sk.ffi.remapToJs(bCumulative);

		    if ( typeof (limit) == "undefined") {
		        if (rate > 0)
		            limit = Number.MAX_VALUE;
		        else
		            limit = -Number.MAX_VALUE;
		    }

		    if (typeof (bCumulative) == "undefined")
		        bCumulative = true;

		    Sk.app.device.getPhysicalObject().getParent().getEnvironment().setContribution(env, Sk.app.device.getName(), rate, limit, bCumulative);
		});

		$loc.removeCumulativeContribution = new Sk.builtin.func(function(self, env) {
		   env = Sk.ffi.remapToJs(env);

		   Sk.app.device.getPhysicalObject().getParent().getEnvironment().removeCumulativeContribution(env, Sk.app.device.getName());
		});

		$loc.setTransferenceMultiplier = new Sk.builtin.func(function(self, env, multiplier) {
		    env = Sk.ffi.remapToJs(env);
		    multiplier = Sk.ffi.remapToJs(multiplier);

		    Sk.app.device.getPhysicalObject().getParent().getEnvironment().setThingTransferenceMultiplier(env, Sk.app.device.getName(), multiplier);

		});

		$loc.getTotalContributions = new Sk.builtin.func(function(self, env) {
		    env = Sk.ffi.remapToJs(env);
		    var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getTotalContributions(env);
		    return Sk.ffi.remapToPy(value);
		});

		$loc.getCumulativeContribution = new Sk.builtin.func(function(self, env) {
		    env = Sk.ffi.remapToJs(env);
		    var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getCumulativeContribution(env, Sk.app.device.getName());
		    return Sk.ffi.remapToPy(value);
		});
		
		$loc.get = new Sk.builtin.func(function(self, env) {
            env = Sk.ffi.remapToJs(env);
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getEnvironmentValue(env);
            return Sk.ffi.remapToPy(value);
        });   

        $loc.getMetricValue = new Sk.builtin.func(function(self, env) {
            env = Sk.ffi.remapToJs(env);
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getMetricValue(env);
            return Sk.ffi.remapToPy(value);
        });


        $loc.getUnit = new Sk.builtin.func(function(self, env) {
            env = Sk.ffi.remapToJs(env);
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getUnit(env);
            return Sk.ffi.remapToPy(value);
        });

        $loc.getVolume = new Sk.builtin.func(function(self) {            
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getVolume();
            return Sk.ffi.remapToPy(value);
        });
        

        $loc.getValueWithUnit = new Sk.builtin.func(function(self, env) {
            env = Sk.ffi.remapToJs(env);
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getValueWithUnit(env);
            return Sk.ffi.remapToPy(value);
        });               
        
        $loc.getGlobalProperty = new Sk.builtin.func(function(self, prop) {
            prop = Sk.ffi.remapToJs(prop);
            var value = ipc.appWindow().getActiveWorkspace().getProperty(prop);
            return Sk.ffi.remapToPy(value);
        });		
        
        $loc.hasGlobalProperty = new Sk.builtin.func(function(self, prop) {
            prop = Sk.ffi.remapToJs(prop);
            var value = ipc.appWindow().getActiveWorkspace().hasProperty(prop); 
            return Sk.ffi.remapToPy(value);
        });		      
       
       
       	$loc.setGlobalProperty = new Sk.builtin.func(function(self, prop, value) {
            prop = Sk.ffi.remapToJs(prop);
            value = Sk.ffi.remapToJs(value);         
            ipc.appWindow().getActiveWorkspace().setProperty(prop, value);
        });

        $loc.getTimeInSeconds = new Sk.builtin.func(function(self) {            
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getTimeInSeconds();
            return Sk.ffi.remapToPy(value);
        });

        $loc.getElapsedTime = new Sk.builtin.func(function(self, lastTime) {
            var lastTime = Sk.ffi.remapToJs(lastTime);              
            var value = Sk.app.device.getPhysicalObject().getParent().getEnvironment().getElapsedTime(lastTime);
            return Sk.ffi.remapToPy(value);
        });               
 
		
          		 
	};
	mod.Environment = Sk.misceval.callsim(Sk.misceval.buildClass(mod, Environment, "Environment", []));
	
	return mod;
};
