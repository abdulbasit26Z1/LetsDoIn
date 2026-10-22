
UserJsApp.prototype.initGPIO = function(interpreter, scope) {

    var app = this;
    var wrapper;

    interpreter.setProperty(scope, 'HIGH', interpreter.createPrimitive(1023));
    interpreter.setProperty(scope, 'LOW', interpreter.createPrimitive(0));
    interpreter.setProperty(scope, 'INPUT', interpreter.createPrimitive(0));
    interpreter.setProperty(scope, 'OUTPUT', interpreter.createPrimitive(1));

    // set analog slot constants: A0, A1, ...
    var analogCount = app.device.getAnalogSlotsCount();
    var analogOffset = app.device.getAnalogSlotsOffset();
    for (var i = 0; i < analogCount; i++) {
        interpreter.setProperty(scope, 'A' + i, interpreter.createPrimitive(analogOffset + i));
    }

    wrapper = function(slot, mode) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "pinMode() expects a slot number >= 0.";

        mode = interpreter.getInt(mode, 0);
        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.setIsOutputMode(mode != 0);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'pinMode', interpreter.createNativeFunction(wrapper));

    wrapper = function(slot) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "digitalRead() expects a slot number >= 0.";

        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            return interpreter.createPrimitive(comp.digitalRead());
        
        return interpreter.createPrimitive(0);
    };
    interpreter.setProperty(scope, 'digitalRead', interpreter.createNativeFunction(wrapper));

    wrapper = function(slot, value) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "digitalWrite() expects a slot number >= 0.";

        value = interpreter.getInt(value, 0);
        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.digitalWrite(value);

        app.device.digitalWrite(slot, value);

        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'digitalWrite', interpreter.createNativeFunction(wrapper));

    wrapper = function(slot) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "analogRead() expects a slot number >= 0.";

        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            return interpreter.createPrimitive(comp.analogRead());
        return interpreter.createPrimitive(0);
    };
    interpreter.setProperty(scope, 'analogRead', interpreter.createNativeFunction(wrapper));

    wrapper = function(slot, value) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "analogWrite() expects a slot number >= 0.";

        value = interpreter.getInt(value, 0);
        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.analogWrite(value);

        app.device.analogWrite(slot, value);

        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'analogWrite', interpreter.createNativeFunction(wrapper));


    wrapper = function(slot, value) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "customWrite() expects a slot number >= 0.";

        //	    value = interpreter.getInt(value, 0);
        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.customWrite(value);

        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'customWrite', interpreter.createNativeFunction(wrapper));


    wrapper = function(slot) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "customRead() expects a slot number >= 0.";

        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            return interpreter.createPrimitive(comp.customRead());

        return interpreter.createPrimitive(0);
    };
    interpreter.setProperty(scope, 'customRead', interpreter.createNativeFunction(wrapper));
	
	var bounceTimes = {};
	var processInterrupt = function(src, args) {
		var comp = _Parser.prototype.createObject(src.className, src.objectUuid);
		var slot = comp.getSlotNumber();
//		var bounceTime = bounceTimes[slot];
//		var now = (new Date()).getTime();
//		if ((bounceTime.call + bounceTime.bounce) < now)
			app.runCode('_processInterrupt(' + slot + ');');
//		bounceTime.call = now;
	};
	
    wrapper = function(slot, bounceTime) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "attachInterrupt() expects a slot number >= 0.";
			
        bounceTime = interpreter.getInt(bounceTime, 0);
		bounceTimes[slot] = {bounce:bounceTime, call:(new Date()).getTime()};

        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.registerEvent('valueChanged', null, processInterrupt);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, '_registerInterrupt', interpreter.createNativeFunction(wrapper));

    wrapper = function(slot) {
        slot = interpreter.getInt(slot, -1);
        if (slot < 0)
            throw "detachInterrupt() expects a slot number >= 0.";

		delete bounceTimes[slot];
		
        var comp = app.device.getComponentAtSlot(slot);
        if (comp)
            comp.unregisterEvent('valueChanged', null, processInterrupt);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, '_unregisterInterrupt', interpreter.createNativeFunction(wrapper));
	
	// clean up
	app.finalizers.push({cleanUp: function() {
		var count = app.device.getSlotsCount();
		for (var i=0; i<count; i++) {
			var comp = app.device.getComponentAtSlot(slot);
			if (comp)
				comp.unregisterEvent('valueChanged', null, processInterrupt);
		}
	}});
}

UserJsApp.addPreprocessor(function() {
	var code = 'var _interrupts = {};\n'
		+ 'var attachInterrupt = function(slot, isr, bounceTime) {'
		+ '_registerInterrupt(slot, bounceTime);'
		+ '_interrupts[slot] = isr;'
		+ '}\n'
		+ 'var detachInterrupt = function(slot) {'
		+ '_unregisterInterrupt(slot);'
		+ 'delete _interrupts[slot];'
		+ '}\n'
		+ 'var _processInterrupt = function(slot) {'
		+ 'var isr = _interrupts[slot];'
		+ 'if (isr) isr();'
		+ '}\n';
	
	this.code = code + this.code;
});