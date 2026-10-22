
UserJsApp.prototype.initRealHttp = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var RealHTTPClient;
	RealHTTPClient = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == RealHTTPClient) {
			obj = this;
		} else {
			obj = interpreter.createObject(RealHTTPClient);
		}
		
		obj.processOnDone = function(response, status, error, errorString) {
			if (obj.properties.onDone && obj.properties.onDone.type == 'function') {
				if (status == 0) {
					if (error == 301 || error == 302)
						status = 400; // invalid request or protocol error
					else
						status = 504; // time out
				}
				interpreter.immediateCall(obj, 'onDone', [status, response]);
			}
		};
		return obj;
	});
	interpreter.setProperty(scope, 'RealHTTPClient', RealHTTPClient);

	interpreter.setProperty(RealHTTPClient.properties.prototype, 'get', interpreter.createNativeFunction(function(url) {
		url = url.toString();
		var self = this;
		$http.get(url, function(response, status, error, errorString) {
			self.processOnDone(response, status, error, errorString);
		});
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(RealHTTPClient.properties.prototype, 'post', interpreter.createNativeFunction(function(url, data) {
		url = url.toString();
		var data = interpreter.getNative(data);
		var self = this;
		$http.post(url, data, function(response, status, error, errorString) {
			self.processOnDone(response, status, error, errorString);
		});
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(RealHTTPClient.properties.prototype, 'put', interpreter.createNativeFunction(function(url, data) {
		url = url.toString();
		var data = interpreter.getNative(data);
		var self = this;
		$http.put(url, data, function(response, status, error, errorString) {
			self.processOnDone(response, status, error, errorString);
		});
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(RealHTTPClient.properties.prototype, 'deleteResource', interpreter.createNativeFunction(function(url) {
		url = url.toString();
		var self = this;
		$http.deleteResource(url, function(response, status, error, errorString) {
			self.processOnDone(response, status, error, errorString);
		});
		return interpreter.UNDEFINED;
	}));
}

UserJsApp.addPreprocessor(function() {
	var code = 'RealHTTPClient.get = function(url, callback) {'
		+ 'var client = new RealHTTPClient();'
		+ 'client.onDone = callback;'
		+ 'client.get(url);'
		+ '}\n'
		+ 'RealHTTPClient.post = function(url, data, callback) {'
		+ 'var client = new RealHTTPClient();'
		+ 'client.onDone = callback;'
		+ 'client.post(url, data);'
		+ '}\n'
		+ 'RealHTTPClient.put = function(url, data, callback) {'
		+ 'var client = new RealHTTPClient();'
		+ 'client.onDone = callback;'
		+ 'client.put(url, data);'
		+ '}\n'
		+ 'RealHTTPClient.deleteResource = function(url, callback) {'
		+ 'var client = new RealHTTPClient();'
		+ 'client.onDone = callback;'
		+ 'client.deleteResource(url);'
		+ '}\n';
	
	this.code = code + this.code;
});
