var $builtinmodule = function(name) {
	var mod = {};

	// save sk instance
	var thisSk = Sk;
	
	mod.time = new Sk.builtin.func(function() {
		Sk = thisSk;
		
		//TODO miwang: change to ioe device time
		return Sk.builtin.assk$(new Date().getTime() / 1000, undefined);
	});

	mod.sleep = new Sk.builtin.func(function(delay) {
		Sk = thisSk;
		
		Sk.app.cppApp.onEndRun(Sk.app.runStatementCount);
		
		var susp = new Sk.misceval.Suspension();
		susp.resume = function() {
			Sk = thisSk;
			return Sk.builtin.none.none$;
		}
		susp.data = {type: "Sk.promise", promise: new Promise(function(resolve) {
//			dprint('sleep promise');
			// put back the saved sk instance
			Sk = thisSk;
			Sk.app.nextTimer = setSimulationTimeout(function() {
//				dprint('sleep done');
				// put back the saved sk instance
				Sk = thisSk;
				Sk.app.nextTimer = null;
				Sk.app.cppApp.onStartRun();
				resolve();
			}, Sk.ffi.remapToJs(delay));
		})};
		return susp;
	});
	
	mod.delay = mod.sleep;

	return mod;
};
