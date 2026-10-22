var $builtinmodule = function(name) {
	var mod = {};
	
	var RealHTTPClient = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.processOnDone = function(response, status, error, errorString) {
				if (self.onDone && self.onDone instanceof Sk.builtin.func) {
					if (status == 0) {
						if (error == 301 || error == 302)
							status = 400; // invalid request or protocol error
						else
							status = 504; // time out
					}
					Sk.app.callSim(self.onDone, Sk.builtin.assk$(status), Sk.builtin.str(response));
				}
			};
		});

		$loc.get = new Sk.builtin.func(function(self, url) {
			url = Sk.ffi.remapToJs(url);
			$http.get(url, function(response, status, error, errorString) {
				self.processOnDone(response, status, error, errorString);
			});
		});
		
		$loc.post = new Sk.builtin.func(function(self, url, data) {
			url = Sk.ffi.remapToJs(url);
			data = Sk.ffi.remapToJs(data);
			
			$http.post(url, data, function(response, status, error, errorString) {
				self.processOnDone(response, status, error, errorString);
			});
		});

		$loc.put = new Sk.builtin.func(function(self, url, data) {
			url = Sk.ffi.remapToJs(url);
			data = Sk.ffi.remapToJs(data);
			
			$http.put(url, data, function(response, status, error, errorString) {
				self.processOnDone(response, status, error, errorString);
			});
		});
		
		$loc.deleteResource = new Sk.builtin.func(function(self, url) {
			url = Sk.ffi.remapToJs(url);
			$http.deleteResource(url, function(response, status, error, errorString) {
				self.processOnDone(response, status, error, errorString);
			});
		});
		
		$loc.onDone = new Sk.builtin.func(function(self, callback) {
			self.onDone = callback;
		});
	};
	mod.RealHTTPClient = Sk.misceval.buildClass(mod, RealHTTPClient, "RealHTTPClient", []);
	
	return mod;
};
