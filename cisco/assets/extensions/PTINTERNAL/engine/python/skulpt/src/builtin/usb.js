var $builtinmodule = function(name) {
	var mod = {};
		
	var USB = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self, usbNum, speed) {
			speed = Sk.ffi.remapToJs(speed);
			self.speed = speed;
			
			usbNum = Sk.ffi.remapToJs(usbNum);
			self.usb = Sk.app.device.getUsbPortAt(usbNum).getController();
			self.usb.begin(self.speed);
		});

		$loc.close = new Sk.builtin.func(function(self) {
			self.usb.end();
		});
		
		$loc.inWaiting = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.usb.available());
		});

		$loc.read = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.usb.readChar());
		});
		
		$loc.peek = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.usb.peekChar());
		});

		$loc.readLine = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.usb.readLine());
		});

		$loc.write = new Sk.builtin.func(function(self, value) {
			value = Sk.ffi.remapToJs(value);
			return Sk.ffi.remapToPy(self.usb.print(value));
		});
	};
	mod.USB = Sk.misceval.buildClass(mod, USB, "USB", []);
	
	
	var PTmata = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self, usbNum, speed) {
			speed = Sk.ffi.remapToJs(speed);
			self.speed = speed;

			usbNum = Sk.ffi.remapToJs(usbNum);
			self.usb = Sk.app.device.getUsbPortAt(usbNum).getController();
			self.usb.begin(self.speed);
			
			self.slotComps = [];
			
			var digitalCount = Sk.app.device.getDigitalSlotsCount();
			var analogCount = Sk.app.device.getAnalogSlotsCount();
			var analogOffset = Sk.app.device.getAnalogSlotsOffset();
			for (var i=0; i<digitalCount; i++) {
				self.slotComps.push({
					digital: true,
					pinMode: -1,
					value: 0,
					customValue: ''
				});
			}
			for (var i=0; i<analogCount; i++) {
				self.slotComps.push({
					digital: false,
					pinMode: -1,
					value: 0,
					customValue: ''
				});
			}
		});

		$loc.close = new Sk.builtin.func(function(self) {
			self.usb.end();
		});
		
		$loc.inWaiting = new Sk.builtin.func(function(self) {
			return Sk.ffi.remapToPy(self.usb.available());
		});

		$loc.processInput = new Sk.builtin.func(function(self) {
			var input = self.usb.readLine();
			if (!input || input.length == 0)
				return;
				
			if (input.charAt(input.length - 1) == '\n')
				input = input.substr(0, input.length - 1);
			
			var cmd = input.split(':');
			if (cmd.length == 0)
				return;
				
			if ((cmd[0] == 'pinMode') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var mode = parseInt(cmd[2]);
				var slotComp = self.slotComps[slot];
				slotComp.pinMode = mode;
				
				var comp = Sk.app.device.getComponentAtSlot(slot);
				if (comp)
					comp.setIsOutputMode(mode != 0);

			} else if ((cmd[0] == 'digitalWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var comp = Sk.app.device.getComponentAtSlot(slot);
				if (comp)
					comp.digitalWrite(value);
				Sk.app.device.digitalWrite(slot, value);
				
			} else if ((cmd[0] == 'analogWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var comp = Sk.app.device.getComponentAtSlot(slot);
				if (comp)
					comp.analogWrite(value);
				Sk.app.device.analogWrite(slot, value);

			} else if ((cmd[0] == 'customWrite') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = cmd[2];
				var comp = Sk.app.device.getComponentAtSlot(slot);
				if (comp)
					comp.customWrite(value);

			} else if ((cmd[0] == 'report') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = parseInt(cmd[2]);
				var slotComp = self.slotComps[slot];
				slotComp.value = value;
				
			} else if ((cmd[0] == 'reportCustom') && (cmd.length == 3)) {
				var slot = parseInt(cmd[1]);
				var value = cmd[2];
				var slotComp = self.slotComps[slot];
				slotComp.customValue = value;

			}
		});

		$loc.readAndReportData = new Sk.builtin.func(function(self) {
			for (var i=0; i<self.slotComps.length; i++) {
				var slotComp = self.slotComps[i];
				var newValue = slotComp.value;
				if (slotComp.digital && slotComp.pinMode == 0) {
					var comp = Sk.app.device.getComponentAtSlot(i);
					if (comp)
						newValue = comp.digitalRead();
				} else if (!slotComp.digital) {
					var comp = Sk.app.device.getComponentAtSlot(i);
					if (comp)
						newValue = comp.analogRead();
				}

				if (newValue != slotComp.value) {
					slotComp.value = newValue;
					self.usb.print('report:' + i + ':' + newValue);
				}
				
				if (slotComp.digital) {
					var comp = Sk.app.device.getComponentAtSlot(i);
					if (comp) {
						var newCustomValue = comp.customRead();
						if (newCustomValue != slotComp.customValue) {
							slotComp.customValue = newCustomValue;
							self.usb.print('reportCustom:' + i + ':' + newCustomValue);
						}
					}
				}
			}
		});

		$loc.pinMode = new Sk.builtin.func(function(self, slot, mode) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "pinMode() expects a slot number >= 0.";
			mode = Sk.ffi.getInt(mode, 0);

			self.usb.print('pinMode:' + slot + ':' + mode + '\n');
		});
		
		$loc.digitalRead = new Sk.builtin.func(function(self, slot) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "digitalRead() expects a slot number >= 0.";
				
			var slotComp = self.slotComps[slot];
			return Sk.ffi.remapToPy(slotComp.value);
		});

		$loc.digitalWrite = new Sk.builtin.func(function(self, slot, value) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "digitalWrite() expects a slot number >= 0.";
			value = Sk.ffi.getInt(value, 0);

			self.usb.print('digitalWrite:' + slot + ':' + value + '\n');
		});
		
		$loc.analogRead = new Sk.builtin.func(function(self, slot) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "analogRead() expects a slot number >= 0.";
				
			var slotComp = self.slotComps[slot];
			return Sk.ffi.remapToPy(slotComp.value);
		});

		$loc.analogWrite = new Sk.builtin.func(function(self, slot, value) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "analogWrite() expects a slot number >= 0.";
			value = Sk.ffi.getInt(value, 0);

			self.usb.print('analogWrite:' + slot + ':' + value + '\n');
		});
		
		$loc.customRead = new Sk.builtin.func(function(self, slot) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "customRead() expects a slot number >= 0.";
				
			var slotComp = self.slotComps[slot];
//			Sk.app.device.addSerialOutputs("customvalue: " + slotComp.customValue);
			return Sk.ffi.remapToPy(slotComp.customValue);
		});

		$loc.customWrite = new Sk.builtin.func(function(self, slot, value) {
			slot = Sk.ffi.getInt(slot, -1);
			if (slot < 0)
				throw "customWrite() expects a slot number >= 0.";
			value = Sk.ffi.remapToJs(value);

			self.usb.print('customWrite:' + slot + ':' + value + '\n');
		});
	};
	mod.PTmata = Sk.misceval.buildClass(mod, PTmata, "PTmata", []);
	
	return mod;
};
