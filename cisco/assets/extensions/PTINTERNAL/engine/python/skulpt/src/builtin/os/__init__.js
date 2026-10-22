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
	
	mod.mkdir = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		if (path[path.length - 1] == '/')
			path = path.substr(0, path.length - 1);
		
		var lastSlash = path.lastIndexOf('/');
		if (lastSlash < 0)
			return Sk.ffi.remapToPy(false);
		
		var dirPath = path.substr(0, lastSlash);
		var newDirName = path.substr(lastSlash + 1);
		
		var result = false;
		try {
			var dir = fileManager.getDirectory(dirPath, true);
			result = dir.addDirectory(newDirName, true);
		} catch (e) {
		}
		
		return Sk.ffi.remapToPy(result);
	});
	
	mod.rmdir = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var dir = fileManager.getDirectory(path, true);
			result = dir.getParent().removeFile(dir.getName(), true);
		} catch (e) {
		}
		
		return Sk.ffi.remapToPy(result);
	});
	
	mod.remove = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var file = fileManager.getFile(path, true);
			if (!file.isDirectory()) {
				result = file.getParent().removeFile(file.getName(), true);
			}
		} catch (e) {
		}
		
		return Sk.ffi.remapToPy(result);
	});
	
	mod.listdir = new Sk.builtin.func(function(path) {
		path = checkFsPath(path);
		
		try {
			var dir = fileManager.getDirectory(path, true);
			var arr = [];
			var count = dir.getFileCount();
			for (var i=0; i<count; i++) {
				arr.push(dir.getFileAt(i).getName());
			}
			return Sk.ffi.remapToPy(arr);
		} catch (e) {
		}

		return Sk.ffi.remapToPy(result);
	});
	
	return mod;
};
