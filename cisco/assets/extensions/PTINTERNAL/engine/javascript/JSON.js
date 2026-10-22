
UserJsApp.prototype.initJSON = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var json = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'JSON', json);
	wrapper = function(obj) {
		var nativeObj = interpreter.getNative(obj);
		var str = JSON.stringify(nativeObj);
		return interpreter.createPrimitive(str);
	};
	interpreter.setProperty(json, 'stringify', interpreter.createNativeFunction(wrapper));

	wrapper = function(str) {
		var nativeObj = JSON.parse(str);
		return interpreter.fromNative(nativeObj);
	};
	interpreter.setProperty(json, 'parse', interpreter.createNativeFunction(wrapper));
}
