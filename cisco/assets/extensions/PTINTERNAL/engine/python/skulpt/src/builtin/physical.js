var $builtinmodule = function(name) {
	var mod = {};

	mod.move = new Sk.builtin.func(function(x,y) {
        x = Sk.ffi.remapToJs(x);
        y = Sk.ffi.remapToJs(y);
	
		if (ipc.appWindow().getActiveWorkspace().isLogicalView())
            Sk.app.device.moveToLocationCentered(x, y);
        else if (ipc.appWindow().getActiveWorkspace().isGeoView())
            Sk.app.device.moveToLocInPhysicalWS(x, y);
	});

	mod.moveBy = new Sk.builtin.func(function(x,y) {
        x = Sk.ffi.remapToJs(x);
        y = Sk.ffi.remapToJs(y);
		
        if (ipc.appWindow().getActiveWorkspace().isLogicalView())
        	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().getComponentItem(Sk.app.device.getName()).moveBy(x,y);
        else if (ipc.appWindow().getActiveWorkspace().isGeoView())
			Sk.app.device.moveByInPhysicalWS(x, y);
	});

	mod.getX = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(Sk.app.device.getAreaLeftX());
	});

	mod.getY = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(Sk.app.device.getAreaTopY());
	});

	mod.devicesAt = new Sk.builtin.func(function(x, y, w, h) {
	x =  Sk.ffi.remapToJs(x);
	y =  Sk.ffi.remapToJs(y);
	w =  Sk.ffi.remapToJs(w);
	h =  Sk.ffi.remapToJs(h);
        var devices = ipc.appWindow().getActiveWorkspace().devicesAt(x, y, w, h, false);

        return Sk.ffi.remapToPy(devices);
	});


    mod.getName = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(Sk.app.device.getName());
	});

    mod.getDeviceProperty = new Sk.builtin.func(function(deviceName, property) {
        var value = "";
        deviceName = Sk.ffi.remapToJs(deviceName);
        property = Sk.ffi.remapToJs(property);
        if (ipc.network().getDevice(deviceName)) {
            value = ipc.network().getDevice(deviceName).getCustomVarStr(property);
        }
        return Sk.ffi.remapToPy(value);
	});

    mod.setDeviceProperty = new Sk.builtin.func(function(deviceName, property, value) {
        deviceName = Sk.ffi.remapToJs(deviceName);
        property = Sk.ffi.remapToJs(property);
        value = Sk.ffi.remapToJs(value);
        if (ipc.network().getDevice(deviceName)) {
            ipc.network().getDevice(deviceName).addCustomVar(property, value);
        }
	});

    mod.setComponentOpacity = new Sk.builtin.func(function(componentName, value) {
        componentName = Sk.ffi.remapToJs(componentName);
        value = Sk.ffi.remapToJs(value);
        ipc.appWindow().getActiveWorkspace()
            .setComponentOpacity(Sk.app.device.getName(), componentName, value);
	});

    mod.fillColor = new Sk.builtin.func(function(componentName, red, green, blue) {
        componentName = Sk.ffi.remapToJs(componentName);
        red = Sk.ffi.remapToJs(red);
        green = Sk.ffi.remapToJs(green);
        blue = Sk.ffi.remapToJs(blue);
        ipc.appWindow().getActiveWorkspace()
            .fillColor(Sk.app.device.getName(), componentName, red, green, blue);
	});

    mod.setComponentRotation = new Sk.builtin.func(function(componentName, value) {
        componentName = Sk.ffi.remapToJs(componentName);
        value = Sk.ffi.remapToJs(value);
        ipc.appWindow().getActiveWorkspace()
            .setComponentRotation(Sk.app.device.getName(), componentName, value);
	});

    mod.setThingRotation = new Sk.builtin.func(function(value) {
        value = Sk.ffi.remapToJs(value);
        ipc.appWindow().getActiveWorkspace()
            .setThingRotation(Sk.app.device.getName(), value);
	});

    mod.getSerialNumber = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy(Sk.app.device.getSerialNumber());
	});

    mod.setCustomText = new Sk.builtin.func(function(x, y, w, h, text) {
        x = Sk.ffi.remapToJs(x);
        y = Sk.ffi.remapToJs(y);
        w = Sk.ffi.remapToJs(w);
        h = Sk.ffi.remapToJs(h);
        text = Sk.ffi.remapToJs(text);
        ipc.appWindow().getActiveWorkspace().setThingCustomText(Sk.app.device.getName(), x,y,w,h,text);

	});

    mod.addSound = new Sk.builtin.func(function(soundID, soundPath) {
        soundID = Sk.ffi.remapToJs(soundID);
		soundPath = Sk.ffi.remapToJs(soundPath);
        Sk.app.device.addSound(soundPath, soundID);

	});
	
    mod.playSound = new Sk.builtin.func(function(soundID, duration) {
        soundID = Sk.ffi.remapToJs(soundID);
		duration = Sk.ffi.remapToJs(duration);
        Sk.app.device.playSound(soundID, duration);
	});			
	
    mod.stopSound = new Sk.builtin.func(function(soundID) {
        soundID = Sk.ffi.remapToJs(soundID);
        Sk.app.device.stopSound(soundID);
	});	

    mod.destroySounds = new Sk.builtin.func(function() {
        Sk.app.device.destroySounds();
	});



	mod.moveItemInWorkspace = new Sk.builtin.func(function(name, x, y) {
	    name = Sk.ffi.remapToJs(name);
	    x = Sk.ffi.remapToJs(x);
	    y = Sk.ffi.remapToJs(y);

	    Sk.ffi.remapToPy(ipc.appWindow().getActiveWorkspace().moveItemInWorkspace(name, x, y));
	    
	});
	
	
	
	
	return mod;
};
