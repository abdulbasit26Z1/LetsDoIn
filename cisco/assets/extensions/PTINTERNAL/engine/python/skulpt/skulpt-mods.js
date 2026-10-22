function modifySkulpt() {
	// these are bugs in skulpt
	
	// check for none
	Sk.ffi.remapToPyOriginal = Sk.ffi.remapToPy;
	Sk.ffi.remapToPy = function(a) {
		if (a === null)
			return Sk.builtin.none.none$;
		if ("boolean" === typeof a)
			return a ? Sk.builtin.bool.true$ : Sk.builtin.bool.false$;
		return Sk.ffi.remapToPyOriginal.apply(this, arguments);
	}
	
	// check for bool
	Sk.ffi.remapToJsOriginal = Sk.ffi.remapToJs;
	Sk.ffi.remapToJs = function(a) {
		if (a instanceof Sk.builtin.bool)
			return (a.v == 1);
		return Sk.ffi.remapToJsOriginal.apply(this, arguments);
	}
}
