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
	
	mod.open = new Sk.builtin.func(function(path, modeStr) {
		path = checkFsPath(path);
		modeStr = modeStr ? Sk.ffi.remapToJs(modeStr) : 'r';
		mode = 0;
		if (modeStr.indexOf('r') >= 0)
			mode |= 1;
		if (modeStr.indexOf('w') >= 0)
			mode |= 2;
		if (modeStr.indexOf('a') >= 0)
			mode |= 4;
		
		if (path[path.length - 1] == '/')
			return null;

		var file = null;
		try {
			file = fileManager.getFile(path, true);
		} catch (e) {
		}
		
		var position = -1;
		if ((mode & 1) && !(mode & 2)) { // if read only
			// if file is not there, then return null
			if (file == null)
				return null;
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
					return null;
				}
			}
			
			// if not append
			if (!(mode & 4)) {
				file.setTextContent('', true);
			}
		} else {
			throw 'file.open() expects mode to be a combination of "r" and/or "w", with "a".';
		}
		
		var fileObj = Sk.misceval.callsim(FileClass);
		fileObj.file = file;
		fileObj.buffer = file.getContent(true).text;
		fileObj.mode = mode;
		fileObj.position = position;
		
		return fileObj;
	});
	
	var File = function($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.file = null;
			self.buffer = null;
			self.mode = 0;
			self.position = -1;
		});

		$loc.close = new Sk.builtin.func(function(self) {
			// if write, then write to file
			if (self.mode & 2) {
				self.file.setTextContent(self.buffer, true);
			}
			
			self.mode = 0;
		});

		$loc.tell = new Sk.builtin.func(function(self) {
			if (self.mode == 0)
				return Sk.ffi.remapToPy(-1);
			return Sk.ffi.remapToPy((self.position < 0) ? self.buffer.length : self.position);
		});

		$loc.seek = new Sk.builtin.func(function(self, pos) {
			pos = Sk.ffi.getInt(pos, -1);
			if (self.mode == 0 || pos < 0 || pos > self.buffer.length)
				return Sk.ffi.remapToPy(false);
			self.position = (pos == self.buffer.length) ? -1 : pos;
			return Sk.ffi.remapToPy(true);
		});
		
		$loc.write = new Sk.builtin.func(function(self, value) {
			if (!(self.mode & 2))
				return;

			value = Sk.ffi.remapToJs(value);
			
			if (self.position < 0) {
				self.buffer += value;
			} else if ((self.position + value.length) < self.buffer.length) {
				self.buffer = self.buffer.substr(0, self.position) + value + self.buffer.substr(self.position + value.length);
				self.position += value.length;
			} else {
				self.buffer = self.buffer.substr(0, self.position) + value;
				self.position = -1;
			}	
		});
		
		$loc.read = new Sk.builtin.func(function(self, length) {
			if (!(self.mode & 1))
				return Sk.ffi.remapToPy('');

			if (self.position < 0)
				return Sk.ffi.remapToPy('');
				
			length = length ? Sk.ffi.remapToJs(length) : 0;
			
			var oldPos = self.position;
			if ((length == 0) || ((self.buffer.length - self.position) < length)) {
				self.position = -1;
				return Sk.ffi.remapToPy(self.buffer.substr(oldPos));
			} else {
				self.position += length;
				return Sk.ffi.remapToPy(self.buffer.substring(oldPos, self.position));
			}
		});
		
		$loc.readline = new Sk.builtin.func(function(self) {
			if (!(self.mode & 1))
				return Sk.ffi.remapToPy('');

			if (self.position < 0)
				return Sk.ffi.remapToPy('');
				
			var index = self.buffer.indexOf('\n', self.position);
			var oldPos = self.position;
			if (index < 0) {
				self.position = -1;
				return Sk.ffi.remapToPy(self.buffer.substr(oldPos));
			} else {
				self.position = index + 1;
				return Sk.ffi.remapToPy(self.buffer.substring(oldPos, self.position));
			}
		});
	};
	var FileClass = Sk.misceval.buildClass(mod, File, "File", []);
	
	return mod;
};
