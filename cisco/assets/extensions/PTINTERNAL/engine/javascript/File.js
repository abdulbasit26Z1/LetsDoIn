
UserJsApp.prototype.initFile = function(interpreter, scope) {

	var app = this;
	var fileManager = null;
	var FS_NAME = 'User:';
	var wrapper;
	
	function checkFs() {
		if (fileManager)
			return;
		fileManager = app.device.getProcess('FileManager');
		try {
			fileManager.getFileSystem(FS_NAME);
		} catch (e) {
			throw 'File system not available.';
		}
	}
	
	function checkFsPath(path) {
		checkFs();
		if (path == null || path.data == null)
			throw 'Expects a path.';
		
		path = path.toString();
		if (path.length && path[0] != '/')
			path = '/' + path;
		path = FS_NAME + path;
		return path;
	}

	var FileSystem = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'FileSystem', FileSystem);

	interpreter.setProperty(FileSystem, 'exists', interpreter.createNativeFunction(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			result = (fileManager.getFile(path, true) != null);
		} catch (e) {
		}

		return interpreter.createPrimitive(result);
	}));

	interpreter.setProperty(FileSystem, 'remove', interpreter.createNativeFunction(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var file = fileManager.getFile(path, true);
			if (!file.isDirectory()) {
				result = file.getParent().removeFile(file.getName(), true);
			}
		} catch (e) {
		}
		
		return interpreter.createPrimitive(result);
	}));
	
	interpreter.setProperty(FileSystem, 'rmdir', interpreter.createNativeFunction(function(path) {
		path = checkFsPath(path);
		
		var result = false;
		try {
			var dir = fileManager.getDirectory(path, true);
			result = dir.getParent().removeFile(dir.getName(), true);
		} catch (e) {
		}
		
		return interpreter.createPrimitive(result);
	}));
	
	interpreter.setProperty(FileSystem, 'dir', interpreter.createNativeFunction(function(path) {
		path = checkFsPath(path);
		
		try {
			var dir = fileManager.getDirectory(path, true);
			var arr = interpreter.createObject(interpreter.ARRAY);
			var count = dir.getFileCount();
			for (var i=0; i<count; i++) {
				interpreter.setProperty(arr, i, interpreter.createPrimitive(dir.getFileAt(i).getName()));
			}
			return arr;
		} catch (e) {
		}

		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(FileSystem, 'mkdir', interpreter.createNativeFunction(function(path) {
		path = checkFsPath(path);
		
		if (path[path.length - 1] == '/')
			path = path.substr(0, path.length - 1);
		
		var lastSlash = path.lastIndexOf('/');
		if (lastSlash < 0)
			return interpreter.createPrimitive(false);
		
		var dirPath = path.substr(0, lastSlash);
		var newDirName = path.substr(lastSlash + 1);
		
		var result = false;
		try {
			var dir = fileManager.getDirectory(dirPath, true);
			result = dir.addDirectory(newDirName, true);
		} catch (e) {
		}
		
		return interpreter.createPrimitive(result);
	}));
	
	interpreter.setProperty(FileSystem, 'open', interpreter.createNativeFunction(function(path, mode) {
		path = checkFsPath(path);
		mode = interpreter.getInt(mode, 0);
		
		if (path[path.length - 1] == '/')
			return interpreter.UNDEFINED;

		var file = null;
		try {
			file = fileManager.getFile(path, true);
		} catch (e) {
		}
		
		var position = -1;
		if ((mode & 1) && !(mode & 2)) { // if read only
			// if file is not there, then return null
			if (file == null)
				return interpreter.UNDEFINED;
			position = 0;
		} else if (mode & 2) { // if write
			// create file if not exist
			if (file == null) {
				var lastSlash = path.lastIndexOf('/');
				var dirPath = path.substr(0, lastSlash);
				var fileName = path.substr(lastSlash + 1);
				
				try {
					var dir = fileManager.getDirectory(dirPath, true);
					dir.addTextFile(fileName, '', true);
					file = fileManager.getFile(path, true);
				} catch (e) {
					return interpreter.UNDEFINED;
				}
			}
			
			// if not append
			if (!(mode & 4)) {
				file.setTextContent('', true);
			}
		} else {
			throw 'FileSystem.open() expects mode to be a combination of File.READ and/or File.WRITE, with File.APPEND.';
		}
		
		var fileObj = File.nativeFunc();
		fileObj.file = file;
		fileObj.buffer = file.getContent(true).text;
		fileObj.mode = mode;
		fileObj.position = position;
		
		return fileObj;
	}));

	var File;
	File = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == File) {
			obj = this;
		} else {
			obj = interpreter.createObject(File);
		}
		obj.file = null;
		obj.buffer = null;
		obj.mode = 0;
		obj.position = -1;

		return obj;
	});
	interpreter.setProperty(scope, 'File', File);
	
	interpreter.setProperty(File, 'READ', interpreter.createPrimitive(1));
	interpreter.setProperty(File, 'WRITE', interpreter.createPrimitive(2));
	interpreter.setProperty(File, 'APPEND', interpreter.createPrimitive(4));

	interpreter.setProperty(File.properties.prototype, 'close', interpreter.createNativeFunction(function() {
		// if write, then write to file
		if (this.mode & 2) {
			this.file.setTextContent(this.buffer, true);
		}
		
		this.mode = 0;
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(File.properties.prototype, 'name', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.file.getName());
	}));

	interpreter.setProperty(File.properties.prototype, 'dir', interpreter.createNativeFunction(function() {
		var dir = this.file.getParent().getAbsPath().substr(FS_NAME.length);
		if (dir.length == 0)
			dir = '/';
		return interpreter.createPrimitive(dir);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'available', interpreter.createNativeFunction(function() {
		if (this.mode == 0)
			return interpreter.createPrimitive(0);
		if (this.position < 0)
			return interpreter.createPrimitive(0);
		return interpreter.createPrimitive(this.buffer.length - this.position);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'position', interpreter.createNativeFunction(function() {
		if (this.mode == 0)
			return interpreter.createPrimitive(-1);
		return interpreter.createPrimitive((this.position < 0) ? this.buffer.length : this.position);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'seek', interpreter.createNativeFunction(function(pos) {
		pos = interpreter.getInt(pos, -1);
		if (this.mode == 0 || pos < 0 || pos > this.buffer.length)
			return interpreter.createPrimitive(false);
		this.position = (pos == this.buffer.length) ? -1 : pos;
		return interpreter.createPrimitive(true);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'print', interpreter.createNativeFunction(function(value) {
		if (!(this.mode & 2))
			return interpreter.createPrimitive(0);

		value = value.toString();
		
		if (this.position < 0) {
			this.buffer += value;
		} else if ((this.position + value.length) < this.buffer.length) {
			this.buffer = this.buffer.substr(0, this.position) + value + this.buffer.substr(this.position + value.length);
			this.position += value.length;
		} else {
			this.buffer = this.buffer.substr(0, this.position) + value;
			this.position = -1;
		}	
		
		return interpreter.createPrimitive(value.length);
	}));

	interpreter.setProperty(File.properties.prototype, 'println', interpreter.createNativeFunction(function(value) {
		return File.properties.prototype.properties.print.nativeFunc.call(this, value.toString() + '\n');
	}));

	interpreter.setProperty(File.properties.prototype, 'readln', interpreter.createNativeFunction(function() {
		if (!(this.mode & 1))
			return interpreter.createPrimitive(null);

		if (this.position < 0)
			return interpreter.createPrimitive(null);
		
		var index = this.buffer.indexOf('\n', this.position);
		var oldPos = this.position;
		if (index < 0) {
			this.position = -1;
			return interpreter.createPrimitive(this.buffer.substr(oldPos));
		} else {
			this.position = index + 1;
			return interpreter.createPrimitive(this.buffer.substring(oldPos, this.position));
		}
	}));
	
	interpreter.setProperty(File.properties.prototype, 'readch', interpreter.createNativeFunction(function() {
		if (!(this.mode & 1))
			return interpreter.createPrimitive(null);

		if (this.position < 0)
			return interpreter.createPrimitive(null);

		var ch = this.buffer.charAt(this.position);
		this.position++;
		if (this.position == this.buffer.length)
			this.position = -1;
		
		return interpreter.createPrimitive(ch);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'peekch', interpreter.createNativeFunction(function() {
		var oldPos = this.position;
		
		var result = File.properties.prototype.properties.readch.nativeFunc.call(this);
		
		this.position = oldPos;
		return result;
	}));

	interpreter.setProperty(File.properties.prototype, 'write', interpreter.createNativeFunction(function(value) {
		if (!(this.mode & 2))
			return interpreter.createPrimitive(0);

		value = interpreter.getInt(value, 0) & 0xff;
		
		// convert 0 to a private unicode char
		if (value == 0)
			value = 0xe000;
			
		value = String.fromCharCode(value);
		
		if (this.position < 0) {
			this.buffer += value;
		} else if ((this.position + 1) < this.buffer.length) {
			this.buffer = this.buffer.substr(0, this.position) + value + this.buffer.substr(this.position + 1);
			this.position++;
		} else {
			this.buffer = this.buffer.substr(0, this.position) + value;
			this.position = -1;
		}	
		
		return interpreter.createPrimitive(1);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'read', interpreter.createNativeFunction(function() {
		if (!(this.mode & 1))
			return interpreter.createPrimitive(-1);

		if (this.position < 0)
			return interpreter.createPrimitive(-1);

		var b = this.buffer.charCodeAt(this.position);
		this.position++;
		if (this.position == this.buffer.length)
			this.position = -1;
		
		// convert private unicode char back to 0
		if (b == 0xe000)
			b = 0;
			
		return interpreter.createPrimitive(b & 0xff);
	}));
	
	interpreter.setProperty(File.properties.prototype, 'peek', interpreter.createNativeFunction(function() {
		var oldPos = this.position;
		
		var result = File.properties.prototype.properties.read.nativeFunc.call(this);
		
		this.position = oldPos;
		return result;
	}));
	
}
