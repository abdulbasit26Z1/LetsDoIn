var $builtinmodule = function(name) {
	var mod = {};
	
	var Options = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
		});

		var isUsingMetric = ipc.options().isUsingMetric();
		
		$loc.isUsingMetric = new Sk.builtin.func(function(self) {
            return Sk.ffi.remapToPy(isUsingMetric);
        });
        
       	function onOptionsChanged(src, args) {
			var oldIsUsingMetric = isUsingMetric;
			isUsingMetric = ipc.options().isUsingMetric();
			if (isUsingMetric != oldIsUsingMetric) {
//				Sk.app.runCode('measurementSystemChangeEvent');
				Sk.app.runCode('try:\n  measurementSystemChangeEvent()\nexcept:\n  pass');
			}
		}
		ipc.options().registerEvent('optionsChanged', null, onOptionsChanged);
		Sk.app.finalizers.push({cleanUp: function() {
			ipc.options().unregisterEvent('optionsChanged', null, onOptionsChanged);
		}});
	};
	mod.Options = Sk.misceval.callsim(Sk.misceval.buildClass(mod, Options, "Options", []));
	
	return mod;
};
