var $builtinmodule = function(name) {
    var mod = {};

    // save sk instance
    var thisSk = Sk;

    mod.pinMode = new Sk.builtin.func(function(slot, mode) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "pinMode() expects a slot number >= 0.";

        mode = Sk.ffi.getInt(mode, 0);
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.setIsOutputMode(mode != 0);
    });

    mod.digitalRead = new Sk.builtin.func(function(slot) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "digitalRead() expects a slot number >= 0.";

        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            return Sk.builtin.assk$(comp.digitalRead());
        return Sk.builtin.assk$(0);
    });

    mod.digitalWrite = new Sk.builtin.func(function(slot, value) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "digitalWrite() expects a slot number >= 0.";

        //		dprint(Sk.ffi.remapToJs(value) + ", " + typeof Sk.ffi.remapToJs(value));
        value = Sk.ffi.getInt(value, 0);
        //		dprint(value);
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.digitalWrite(value);

        Sk.device.digitalWrite(slot, value);
    });

    mod.analogRead = new Sk.builtin.func(function(slot) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "analogRead() expects a slot number >= 0.";

        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            return Sk.builtin.assk$(comp.analogRead());
        return Sk.builtin.assk$(0);
    });

    mod.analogWrite = new Sk.builtin.func(function(slot, value) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "analogWrite() expects a slot number >= 0.";

        value = Sk.ffi.getInt(value, 0);
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.analogWrite(value);

        Sk.device.analogWrite(slot, value);
    });



    mod.customWrite = new Sk.builtin.func(function(slot, value) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "customWrite() expects a slot number >= 0.";

        value = Sk.ffi.remapToJs(value);
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.customWrite(value);
    });

    mod.customRead = new Sk.builtin.func(function(slot) {
        //		Sk = thisSk;
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "customRead() expects a slot number >= 0.";

        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            return Sk.ffi.remapToPy(comp.customRead());
        return Sk.ffi.remapToPy(0);
    });



    mod.setup = mod.pinMode;
    mod.input = mod.digitalRead;
    mod.output = mod.digitalWrite;

    mod.IN = Sk.builtin.assk$(0);
    mod.OUT = Sk.builtin.assk$(1);
    mod.HIGH = Sk.builtin.assk$(1023);
    mod.LOW = Sk.builtin.assk$(0);

    // set analog slot constants: A0, A1, ...
    var analogCount = Sk.device.getAnalogSlotsCount();
    var analogOffset = Sk.device.getAnalogSlotsOffset();
    for (var i = 0; i < analogCount; i++) {
        mod['A' + i] = Sk.builtin.assk$(analogOffset + i);
    }
	
	var callbacks = {};
	var processInterrupt = function(src, args) {
		var comp = _Parser.prototype.createObject(src.className, src.objectUuid);
		var slot = comp.getSlotNumber();
		var callback = callbacks[slot];
		if (callback && callback instanceof Sk.builtin.func) {
			Sk.app.callSim(callback);
		}
	};
	
	mod.add_event_detect = new Sk.builtin.func(function(slot, callback) {
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "add_event_detect() expects a slot number >= 0.";

		callbacks[slot] = callback;
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.registerEvent('valueChanged', null, processInterrupt);
    });
	
	mod.remove_event_detect = new Sk.builtin.func(function(slot) {
        slot = Sk.ffi.getInt(slot, -1);
        if (slot < 0)
            throw "remove_event_detect() expects a slot number >= 0.";

		delete callbacks[slot];
        var comp = Sk.device.getComponentAtSlot(slot);
        if (comp)
            comp.unregisterEvent('valueChanged', null, processInterrupt);
    });
	
	Sk.app.finalizers.push({cleanUp: function() {
		var count = Sk.app.device.getSlotsCount();
		for (var i=0; i<count; i++) {
			var comp = app.device.getComponentAtSlot(slot);
			if (comp)
				comp.unregisterEvent('valueChanged', null, processInterrupt);
		}
	}});

    return mod;
};
