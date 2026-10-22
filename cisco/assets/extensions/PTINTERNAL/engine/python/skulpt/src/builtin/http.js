var $builtinmodule = function(name) {
	var mod = {};
	
	var HTTPClient = function ($gbl, $loc) {
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.client = Sk.app.device.getProcess('HttpBackgroundClientManager').createClient();
			self.processOnDone = function(src, args) {
				if (self.onDone && self.onDone instanceof Sk.builtin.func) {
					var status = 0;
					switch (args.responseType) {
						case 3:
							status = 200; // OK
							break;
						case 4:
						case 12:
							status = 401; // unauthorized
							break;
						case 5:
							status = 404; // not found
							break;
						case 7:
						case 8:
						case 9:
						case 10:
						case 13:
							status = 504; // time out
							break;
						case 6:
						case 11:
						default:
							status = 400; // invalid request or protocol error
							break;
					}
					Sk.app.callSim(self.onDone, Sk.builtin.assk$(status), Sk.builtin.str(args.content));
				}
			};
			self.client.registerDelegate("onDone", self, self.processOnDone);
			
			self.cleanUp = function() {
				self.client.unregisterDelegate("onDone", self, self.processOnDone);
				Sk.app.device.getProcess('HttpBackgroundClientManager').deleteClient(self.client);
			};
			
			Sk.app.finalizers.push(self);
		});

		$loc.open = new Sk.builtin.func(function(self, url) {
			url = Sk.ffi.remapToJs(url);
			return Sk.ffi.remapToPy(self.client.go(url));
		});

		$loc.stop = new Sk.builtin.func(function(self) {
			self.client.cancel();
		});
		
		$loc.onDone = new Sk.builtin.func(function(self, callback) {
			self.onDone = callback;
		});
	};
	mod.HTTPClient = Sk.misceval.buildClass(mod, HTTPClient, "HTTPClient", []);
	
	var HTTPServer = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.process = null;
			self.routes = {};
		});

		$loc.start = new Sk.builtin.func(function(self, port) {
			if (self.process)
				return Sk.ffi.remapToPy(false);
			
			self.process = Sk.app.device.getProcess('HttpServer');
			if (self.process == null)
				throw 'HTTP server not supported on this device.';

			self.processOnRequest = function(src, args) {
				var path = args.url;
				var queryIndex = path.indexOf('?');
				if (queryIndex >= 0)
					path = path.substr(0, queryIndex);
				if (path.length == 0)
					path = '/';
				
				var callback = self.routes[path];
				while (!callback) {
					if (path.length > 1 && path.lastIndexOf('/*') == path.length - 2)
						path = path.substr(0, path.length - 2);

					var index = path.lastIndexOf('/');
					if (index < 0)
						break;
					path = path.substr(0, index + 1) + '*';
					callback = self.routes[path];
				}
				if (!callback) {
					callback = self.routes['*'];
					if (!callback)
						return false;
				}

				var response = Sk.misceval.callsim(HTTPServerResponseClass);
				response.serverProcess = self.process;
				response.tcpConn = args.connection;
				Sk.app.callSim(callback, Sk.ffi.remapToPy(args.url), response);

				return true;
			};
			self.process.registerDelegate("onRequest", null, self.processOnRequest);
			
			Sk.app.finalizers.push({cleanUp: function() {
				finalize(self);
			}});
			
			port = Sk.ffi.getInt(port, 0);
			
			// save old settings
			self.processSavedPort = self.process.getPortNumber();
			self.processSavedEnabled = self.process.isEnabled();

			self.process.setPortNumber(port);
			self.process.setEnable(true);
			if (!self.process.isEnabled())
				throw 'HTTP server cannot listen on port ' + port + '.';
				
			return Sk.ffi.remapToPy(true);
		});
		
		function finalize(self) {
			if (self.process !== null){
				self.process.unregisterDelegate("onRequest", null, self.processOnRequest);
				self.process.setPortNumber(self.processSavedPort);
				self.process.setEnable(self.processSavedEnabled);
			}
			self.process = null;
		}

		$loc.stop = new Sk.builtin.func(function(self) {
			finalize(self);
		});
		
		$loc.route = new Sk.builtin.func(function(self, path, callback) {
			path = Sk.ffi.remapToJs(path);
			self.routes[path] = callback;
		});
	};
	mod.HTTPServer = Sk.misceval.callsim(Sk.misceval.buildClass(mod, HTTPServer, "HTTPServer", []));
	
	var HTTPServerResponse = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.contentType = null;
			self.sent = false;
		});

		$loc.setContentType = new Sk.builtin.func(function(self, type) {
			self.contentType = Sk.ffi.remapToJs(type);
		});

		$loc.send = new Sk.builtin.func(function(self, content) {
			content = Sk.ffi.remapToJs(content);
			if (self.serverProcess && self.tcpConn && !self.sent) {
				self.sent = true;
				if (self.contentType)
					self.serverProcess.sendTypedResponse(self.tcpConn, content, self.contentType);
				else
					self.serverProcess.sendResponse(self.tcpConn, content);
			}
		});
		
		$loc.sendFile = new Sk.builtin.func(function(self, filePath) {
			filePath = Sk.ffi.remapToJs(filePath);
			if (self.serverProcess && self.tcpConn && !self.sent) {
				self.sent = true;
				if (filePath.length && filePath.charAt(0) != '/')
					filePath = '/' + filePath;
				self.serverProcess.sendFileResponse(self.tcpConn, 'User:' + filePath);
			}
		});
		
		$loc.sendNotFound = new Sk.builtin.func(function(self) {
			if (self.serverProcess && self.tcpConn && !self.sent) {
				self.sent = true;
				self.serverProcess.sendNotFoundResponse(self.tcpConn);
			}
		});
	};
	var HTTPServerResponseClass = Sk.misceval.buildClass(mod, HTTPServerResponse, "HTTPServerResponse", []);

	return mod;
};
