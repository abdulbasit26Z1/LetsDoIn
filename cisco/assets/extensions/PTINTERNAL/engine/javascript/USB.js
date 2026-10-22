
UserJsApp.prototype.initUsb = function(interpreter, scope) {

	var app = this;
	
	var USB = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == USB) {
			obj = this;
		} else {
			obj = interpreter.createObject(USB);
		}
		obj.usb = null;

		return obj;
	});
	
	interpreter.setProperty(USB.properties.prototype, 'begin', interpreter.createNativeFunction(function(speed) {
		speed = interpreter.getInt(speed, 0);
		this.usb.begin(speed);
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(USB.properties.prototype, 'end', interpreter.createNativeFunction(function() {
		this.usb.end();
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(USB.properties.prototype, 'available', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.available());
	}));

	interpreter.setProperty(USB.properties.prototype, 'print', interpreter.createNativeFunction(function(value) {
		value = value.toString();
		return interpreter.createPrimitive(this.usb.print(value));
	}));

	interpreter.setProperty(USB.properties.prototype, 'println', interpreter.createNativeFunction(function(value) {
		if (value == null || (value.data == null && value.toString() == 'null'))
			value = '';
		return USB.properties.prototype.properties.print.nativeFunc.call(this, value.toString() + '\n');
	}));

	interpreter.setProperty(USB.properties.prototype, 'readln', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.readLine());
	}));
	
	interpreter.setProperty(USB.properties.prototype, 'readch', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.readChar());
	}));

	interpreter.setProperty(USB.properties.prototype, 'peekch', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.peekChar());
	}));

	interpreter.setProperty(USB.properties.prototype, 'write', interpreter.createNativeFunction(function(value) {
		value = interpreter.getInt(value, 0) & 0xff;
		return interpreter.createPrimitive(this.usb.write(value));
	}));
	
	interpreter.setProperty(USB.properties.prototype, 'read', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.read());
	}));

	interpreter.setProperty(USB.properties.prototype, 'peek', interpreter.createNativeFunction(function() {
		return interpreter.createPrimitive(this.usb.peek());
	}));


	var PTmata = interpreter.createNativeFunction(function() {
		var obj;
		if (this.parent == PTmata) {
			obj = this;
		} else {
			obj = interpreter.createObject(PTmata);
		}
		obj.usb = null;

		return obj;
	});
	
	interpreter.setProperty(PTmata.properties.prototype, 'begin', interpreter.createNativeFunction(function(speed) {
		speed = interpreter.getInt(speed, 0);
		this.usb.begin(speed);

		this.slotComps = [];
		
		var digitalCount = app.device.getDigitalSlotsCount();
		var analogCount = app.device.getAnalogSlotsCount();
		var analogOffset = app.device.getAnalogSlotsOffset();
		for (var i=0; i<digitalCount; i++) {
			this.slotComps.push({
				digital: true,
				pinMode: -1,
				value: 0,
				customValue: ''
			});
		}
		for (var i=0; i<analogCount; i++) {
			this.slotComps.push({
				digital: false,
				pinMode: -1,
				value: 0,
				customValue: ''
			});
		}
		
		this.started = true;
	}));
	
	interpreter.setProperty(PTmata.properties.prototype, 'end', interpreter.createNativeFunction(function() {
		if (!this.started) 
			throw 'PTmata not started.';
			
		this.usb.end();
		this.started = false;
		
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(PTmata.properties.prototype, 'available', interpreter.createNativeFunction(function() {
		if (!this.started) 
			throw 'PTmata not started.';

		return interpreter.createPrimitive(this.usb.available());
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'processInput', interpreter.createNativeFunction(function() {
		if (!this.started) 
			throw 'PTmata not started.';

		var input = this.usb.readLine();
		if (!input || input.length == 0)
			return interpreter.UNDEFINED;
			
		if (input.charAt(input.length - 1) == '\n')
			input = input.substr(0, input.length - 1);
		
		try {
			var cmd = input.split(':');
			if (cmd.length == 0)
				return interpreter.UNDEFINED;
				
			if ((cmd[0] == 'pinMode') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var mode = parseInt(cmd[2]);
				var slotComp = this.slotComps[slot];
				slotComp.pinMode = mode;
				
				var comp = app.device.getComponentAtSlot(slot);
				if (comp)
					comp.setIsOutputMode(mode != 0);

			} else if ((cmd[0] == 'digitalWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var comp = app.device.getComponentAtSlot(slot);
				if (comp)
					comp.digitalWrite(value);
				app.device.digitalWrite(slot, value);
				
			} else if ((cmd[0] == 'analogWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var comp = app.device.getComponentAtSlot(slot);
				if (comp)
					comp.analogWrite(value);
				app.device.analogWrite(slot, value);

			} else if ((cmd[0] == 'customWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = cmd[2];
				var comp = app.device.getComponentAtSlot(slot);
				if (comp)
					comp.customWrite(value);

			} else if ((cmd[0] == 'report') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var slotComp = this.slotComps[slot];
				slotComp.value = value;

			} else if ((cmd[0] == 'reportCustom') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = cmd[2];
				var slotComp = this.slotComps[slot];
				slotComp.customValue = value;
			}
		} catch (e) {
		}

		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(PTmata.properties.prototype, 'readAndReportData', interpreter.createNativeFunction(function() {
		
		if (!this.started) 
			throw 'PTmata not started.';

		for (var i=0; i<this.slotComps.length; i++) {
			var slotComp = this.slotComps[i];
			var newValue = slotComp.value;
			if (slotComp.digital && slotComp.pinMode == 0) {
				var comp = app.device.getComponentAtSlot(i);
				if (comp)
					newValue = comp.digitalRead();
			} else if (!slotComp.digital) {
				var comp = app.device.getComponentAtSlot(i);
				if (comp)
					newValue = comp.analogRead();
			}

			if (newValue != slotComp.value) {
				slotComp.value = newValue;
				this.usb.print('report:' + i + ':' + newValue);
			}
			
			if (slotComp.digital) {
				var comp = app.device.getComponentAtSlot(i);
				if (comp) {
					var newCustomValue = comp.customRead();
					if (newCustomValue != slotComp.customValue) {
						slotComp.customValue = newCustomValue;
						this.usb.print('reportCustom:' + i + ':' + newCustomValue);
					}
				}
			}
		}
		
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'pinMode', interpreter.createNativeFunction(function(slot, mode) {
		if (!this.started) 
			throw 'PTmata not started.';

		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "pinMode() expects a slot number >= 0.";
		mode = interpreter.getInt(mode, 0);

		this.usb.print('pinMode:' + slot + ':' + mode + '\n');
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'digitalRead', interpreter.createNativeFunction(function(slot) {
		if (!this.started) 
			throw 'PTmata not started.';

		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "digitalRead() expects a slot number >= 0.";
		
		var slotComp = this.slotComps[slot];
		return interpreter.createPrimitive(slotComp.value);
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'digitalWrite', interpreter.createNativeFunction(function(slot, value) {
		if (!this.started) 
			throw 'PTmata not started.';

		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "digitalWrite() expects a slot number >= 0.";

		value = interpreter.getInt(value, 0);

		this.usb.print('digitalWrite:' + slot + ':' + value + '\n');
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'analogRead', interpreter.createNativeFunction(function(slot) {
		if (!this.started) 
			throw 'PTmata not started.';

		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "analogRead() expects a slot number >= 0.";

		var slotComp = this.slotComps[slot];
		return interpreter.createPrimitive(slotComp.value);
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'analogWrite', interpreter.createNativeFunction(function(slot, value) {
		if (!this.started) 
			throw 'PTmata not started.';
			
		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "analogWrite() expects a slot number >= 0.";

		value = interpreter.getInt(value, 0);

		this.usb.print('analogWrite:' + slot + ':' + value + '\n');
		return interpreter.UNDEFINED;
	}));
	
	interpreter.setProperty(PTmata.properties.prototype, 'customRead', interpreter.createNativeFunction(function(slot) {
		if (!this.started)
			throw 'PTmata not started.';

		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "customRead() expects a slot number >= 0.";

		var slotComp = this.slotComps[slot];
		return interpreter.createPrimitive(slotComp.customValue);
	}));

	interpreter.setProperty(PTmata.properties.prototype, 'customWrite', interpreter.createNativeFunction(function(slot, value) {
		if (!this.started) 
			throw 'PTmata not started.';
			
		slot = interpreter.getInt(slot, -1);
		if (slot < 0)
			throw "customWrite() expects a slot number >= 0.";

		value = value.toString();

		this.usb.print('customWrite:' + slot + ':' + value + '\n');
		return interpreter.UNDEFINED;
	}));
	
	
	var usbCount = app.device.getUsbPortCount();
	for (var i=0; i<usbCount; i++) {
		var port = app.device.getUsbPortAt(i);
		var controller = port.getController();
		
		var usb = USB.nativeFunc();
		usb.usb = controller;
		interpreter.setProperty(scope, port.getName(), usb);

		var ptmata = PTmata.nativeFunc();
		ptmata.usb = controller;
		interpreter.setProperty(scope, 'PTmata' + i, ptmata);
	}
}
