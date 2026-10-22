
UserJsApp.prototype.initHttp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var HTTPClient;
	HTTPClient = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == HTTPClient) {
			obj = this;
		} else {
			obj = interpreter.createObject(HTTPClient);
		}
		
		obj.client = app.device.getProcess('HttpBackgroundClientManager').createClient();
		obj.processOnDone = function(src, args) {
			if (obj.properties.onDone && obj.properties.onDone.type == 'function') {
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
				interpreter.immediateCall(obj, 'onDone', [status, args.content]);
			}
		};
		obj.client.registerDelegate("onDone", obj, obj.processOnDone);
		
		obj.cleanUp = function() {
			obj.client.unregisterDelegate("onDone", obj, obj.processOnDone);
			app.device.getProcess('HttpBackgroundClientManager').deleteClient(obj.client);
		};
		
		app.finalizers.push(obj);
		return obj;
	});
	interpreter.setProperty(scope, 'HTTPClient', HTTPClient);

	interpreter.setProperty(HTTPClient.properties.prototype, 'open', interpreter.createNativeFunction(function(url) {
		url = url.toString();
		return interpreter.createPrimitive(this.client.go(url));
	}));

	interpreter.setProperty(HTTPClient.properties.prototype, 'stop', interpreter.createNativeFunction(function() {
		this.client.cancel();
		return interpreter.UNDEFINED;
	}));
	
	
	
	var HTTPServer = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'HTTPServer', HTTPServer);
	interpreter.setProperty(HTTPServer, '_routes', interpreter.createObject(interpreter.OBJECT));
	HTTPServer.tcpConns = {};
	
	var serverProcess;
	var serverProcessSavedPort;
	var serverProcessSavedEnabled;
	
	// var routes = {};
	function initHttpServer() {
		if (serverProcess)
			return;
		
		serverProcess = app.device.getProcess('HttpServer');
		if (serverProcess == null)
			return;

        serverProcessSavedPort = serverProcess.getPortNumber();
        serverProcessSavedEnabled = serverProcess.isEnabled();
//		dprint("HTTP.js::initHttpServer() - saved port/enabled: " + serverProcessSavedPort+"/"+serverProcessSavedEnabled)

		serverProcess.registerDelegate("onRequest", null, processOnRequest);
		
		app.finalizers.push({cleanUp: finalizeHttpServer});
	}
	
	var processOnRequest = function(src, args) {
		var path = args.url;
		var queryIndex = path.indexOf('?');
		if (queryIndex >= 0)
			path = path.substr(0, queryIndex);
		if (path.length == 0)
			path = '/';
		
		var callback = HTTPServer.properties._routes.properties[path];
		while (!callback) {
			if (path.length > 1 && path.lastIndexOf('/*') == path.length - 2)
				path = path.substr(0, path.length - 2);

			var index = path.lastIndexOf('/');
			if (index < 0)
				break;
			path = path.substr(0, index + 1) + '*';
			callback = HTTPServer.properties._routes.properties[path];
		}
		if (!callback) {
			callback = HTTPServer.properties._routes.properties['*'];
			if (!callback)
				return false;
		}
		
		var id = args.connection.getRemoteIpString() + ':' + args.connection.getRemotePort();
		HTTPServer.tcpConns[id] = args.connection;
		interpreter.immediateCall(HTTPServer, '_onRequest', [path, args.url, id]);

		return true;
	};

	// can be called from both stop() and app finalizers!
    function finalizeHttpServer(){
//	    dprint("HTTP.js::finalizeHttpServer() - called");
	        
		if (serverProcess !== null){
			serverProcess.unregisterDelegate("onRequest", null, processOnRequest);
		    serverProcess.setPortNumber(serverProcessSavedPort);
		    serverProcess.setEnable(serverProcessSavedEnabled);
//		    dprint("HTTP.js::finalizeHttpServer() - new port/enabled: " + serverProcessSavedPort+"/"+serverProcessSavedEnabled)
		}
		serverProcess = null; // to make multiple _stop()s a NOOP
		
		return interpreter.UNDEFINED;
    }

	interpreter.setProperty(HTTPServer, '_getRes', interpreter.createNativeFunction(function(id) {
		var tcpConn = this.tcpConns[id];
		if (tcpConn == null)
			return interpreter.UNDEFINED;
			
		var res = interpreter.createObject(HTTPServerResponse);
		res.tcpConn = tcpConn;
		return res;
	}));

	interpreter.setProperty(HTTPServer, 'start', interpreter.createNativeFunction(function(port) {
//	    dprint("HTTP.js::start() - called");
	    
	    var me = this;
		
		initHttpServer();
		
		if (serverProcess == null)
			throw 'HTTP server not supported on this device.';
		
		port = interpreter.getInt(port, 0);

		serverProcess.setPortNumber(port);
		serverProcess.setEnable(true);
//		dprint("HTTP.js::start() - new port/enabled: " + serverProcess.getPortNumber()+"/"+serverProcess.isEnabled())
		
		if (!serverProcess.isEnabled())
			throw 'HTTP server cannot listen on port ' + port + '.';
			
		return interpreter.createPrimitive(true);
	}));

	interpreter.setProperty(HTTPServer, 'stop', interpreter.createNativeFunction(function() {
	    return finalizeHttpServer();		
	}));
	
	
	var HTTPServerResponse;
	HTTPServerResponse = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == HTTPServerResponse) {
			obj = this;
		} else {
			obj = interpreter.createObject(HTTPServerResponse);
		}
		obj.contentType = null;
		obj.sent = false;
		return obj;
	});
	interpreter.setProperty(scope, 'HTTPServerResponse', HTTPServerResponse);

	interpreter.setProperty(HTTPServerResponse.properties.prototype, 'setContentType', interpreter.createNativeFunction(function(type) {
		this.contentType = type;
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(HTTPServerResponse.properties.prototype, 'send', interpreter.createNativeFunction(function(content) {
		if (serverProcess && this.tcpConn && !this.sent) {
			this.sent = true;
			if (this.contentType)
				serverProcess.sendTypedResponse(this.tcpConn, content, this.contentType);
			else
				serverProcess.sendResponse(this.tcpConn, content);
		}
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(HTTPServerResponse.properties.prototype, 'sendFile', interpreter.createNativeFunction(function(filePath) {
		if (serverProcess && this.tcpConn && !this.sent) {
			this.sent = true;
			if (filePath.length && filePath.charAt(0) != '/')
				filePath = '/' + filePath;
			serverProcess.sendFileResponse(this.tcpConn, 'User:' + filePath);
		}
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(HTTPServerResponse.properties.prototype, 'sendNotFound', interpreter.createNativeFunction(function() {
		if (serverProcess && this.tcpConn && !this.sent) {
			this.sent = true;
			serverProcess.sendNotFoundResponse(this.tcpConn);
		}
		return interpreter.UNDEFINED;
	}));
}

UserJsApp.addPreprocessor(function() {
	var code = 'HTTPServer.route = function(path, callback) {'
		+ 'this._routes[path] = callback;'
		+ '}\n'
		+ 'HTTPServer._onRequest = function(path, url, id) {'
		+ 'this._routes[path](url, this._getRes(id));'
		+ '}\n'
	
	this.code = code + this.code;
});
