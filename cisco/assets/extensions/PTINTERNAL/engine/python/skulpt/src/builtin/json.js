var $builtinmodule = function(name) {
	var mod = {};
	var app = Sk;

	var dumps = function(kwa) {
		var obj = arguments[1];
		var kwargs = new Sk.builtins.dict(kwa);
		kwargs = Sk.ffi.remapToJs(kwargs);
		
		var spaces = 0;
		if (typeof(kwargs.indent) == 'number')
			spaces = kwargs.indent;
		
		var nativeObj = Sk.ffi.remapToJs(obj);
		
		var str = JSON.stringify(nativeObj, null, spaces);
		return Sk.builtin.str(str);
	}
	dumps.co_kwargs = true;
	mod.dumps = new Sk.builtin.func(dumps);

	mod.loads = new Sk.builtin.func(function(str) {
		str = Sk.ffi.remapToJs(str);
		var nativeObj = JSON.parse(str);
		return Sk.ffi.remapToPy(nativeObj);
	});

	return mod;
};
