var $builtinmodule = function(name) {
	var mod = {};
	
	var fileManager = null;
	var FS_NAME = 'User:';
	
	function checkFs() {
		if (fileManager)
			return;
		fileManager = Sk.app.device.getProcess('FileManager');
		try {
			fileManager.getFileSystem(FS_NAME);
		} catch (e) {
			throw 'File system not available.';
		}
	}
	
	function checkFsPath(path) {
		checkFs();
		path = Sk.ffi.remapToJs(path);
		if (path == null)
			throw 'Expects a path.';
		
		if (path.length && path[0] != '/')
			path = '/' + path;
		path = FS_NAME + path;
		return path;
	}
	
	mod.exists = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			result = (fileManager.getFile(path, true) != null);
		} catch (e) {
		}

		return Sk.ffi.remapToPy(result);
	});
	
	mod.isfile = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var file = fileManager.getFile(path, true);
			result = !file.isDirectory();
		} catch (e) {
		}

		return Sk.ffi.remapToPy(result);
	});
	
	mod.isdir = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var file = fileManager.getFile(path, true);
			result = file.isDirectory();
		} catch (e) {
		}

		return Sk.ffi.remapToPy(result);
	});
	
	return mod;
};
