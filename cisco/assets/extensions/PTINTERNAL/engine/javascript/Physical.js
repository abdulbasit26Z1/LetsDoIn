
UserJsApp.prototype.initPhysical = function(interpreter, scope) {

    var app = this;
    var wrapper;


    wrapper = function(x, y) {
        if (ipc.appWindow().getActiveWorkspace().isLogicalView())
            app.device.moveToLocationCentered(x, y);
        else if (ipc.appWindow().getActiveWorkspace().isGeoView())
            app.device.moveToLocInPhysicalWS(x, y);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'move', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(app.device.getAreaLeftX());
    };
    interpreter.setProperty(scope, 'getX', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(app.device.getAreaTopY());
    };
    interpreter.setProperty(scope, 'getY', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(app.device.getCenterXCoordinate());
    };
    interpreter.setProperty(scope, 'getCenterX', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(app.device.getCenterYCoordinate());
    };
    interpreter.setProperty(scope, 'getCenterY', interpreter.createNativeFunction(wrapper));



    wrapper = function(x, y, w, h) {
        var devices = ipc.appWindow().getActiveWorkspace().devicesAt(x, y, w, h, false);

        var arr = interpreter.createObject(interpreter.ARRAY);
        for (var i = 0; i < devices.length; i++) {
            interpreter.setProperty(arr, i, interpreter.createPrimitive(devices[i]));
        }

        return arr;
    };
    interpreter.setProperty(scope, 'devicesAt', interpreter.createNativeFunction(wrapper));

    wrapper = function(x, y, w, h) {
        var devices = ipc.appWindow().getActiveWorkspace().devicesAt(x, y, w, h, true);

        var arr = interpreter.createObject(interpreter.ARRAY);
        for (var i = 0; i < devices.length; i++) {
            interpreter.setProperty(arr, i, interpreter.createPrimitive(devices[i]));
        }

        return arr;
    };
    interpreter.setProperty(scope, 'devicesIncludingClustersAt', interpreter.createNativeFunction(wrapper));


    wrapper = function() {
        return interpreter.createPrimitive(app.device.getName());
    };
    interpreter.setProperty(scope, 'getName', interpreter.createNativeFunction(wrapper));

    wrapper = function(deviceName, property) {
        var value = "";
        if (ipc.network().getDevice(deviceName)) {
            value = ipc.network().getDevice(deviceName).getCustomVarStr(property);
        }
        return interpreter.createPrimitive(value);
    };
    interpreter.setProperty(scope, 'getDeviceProperty', interpreter.createNativeFunction(wrapper));

    wrapper = function(deviceName, property, value) {
        if (ipc.network().getDevice(deviceName)) {
            ipc.network().getDevice(deviceName).addCustomVar(property, value);
        }
    };
    interpreter.setProperty(scope, 'setDeviceProperty', interpreter.createNativeFunction(wrapper));

    wrapper = function(componentName, red, green, blue) {
        ipc.appWindow().getActiveWorkspace().fillColor(app.device.getName(), componentName, red, green, blue);
    };
    interpreter.setProperty(scope, 'fillColor', interpreter.createNativeFunction(wrapper));

    wrapper = function(componentName, value) {
        ipc.appWindow().getActiveWorkspace().setComponentOpacity(app.device.getName(), componentName, value);
    };

    interpreter.setProperty(scope, 'setComponentOpacity', interpreter.createNativeFunction(wrapper));

    wrapper = function(componentName, value) {
        ipc.appWindow().getActiveWorkspace().setComponentRotation(app.device.getName(), componentName, value);
    };
    interpreter.setProperty(scope, 'setComponentRotation', interpreter.createNativeFunction(wrapper));

    wrapper = function(value) {
        ipc.appWindow().getActiveWorkspace().setThingRotation(app.device.getName(), value);
    };
    interpreter.setProperty(scope, 'setRotation', interpreter.createNativeFunction(wrapper));

    wrapper = function(x, y) {
        if (ipc.appWindow().getActiveWorkspace().isLogicalView())
            ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().getComponentItem(app.device.getName()).moveBy(x, y);
        else if (ipc.appWindow().getActiveWorkspace().isGeoView())
            app.device.moveByInPhysicalWS(x, y);
        //	ipc.appWindow().getActiveWorkspace().getGV().findGeoIconByDeviceName(app.device.getName()).moveBy(x, y);
        //return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'moveBy', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return interpreter.createPrimitive(app.device.getSerialNumber());
    };
    interpreter.setProperty(scope, 'getSerialNumber', interpreter.createNativeFunction(wrapper));

    wrapper = function(x, y, width, height, text) {
        ipc.appWindow().getActiveWorkspace().setThingCustomText(app.device.getName(), x, y, width, height, text);
    };
    interpreter.setProperty(scope, 'setCustomText', interpreter.createNativeFunction(wrapper));

    wrapper = function(text) {
        ipc.appWindow().getActiveWorkspace().setLogicalBackgroundPath(text, false);
    };
    interpreter.setProperty(scope, 'setLogicalBackgroundPath', interpreter.createNativeFunction(wrapper));

    wrapper = function(soundID, soundPath) {
        app.device.addSound(soundPath, soundID);
    };
    interpreter.setProperty(scope, 'addSound', interpreter.createNativeFunction(wrapper));


    wrapper = function(soundID, numLoops) {
        app.device.playSound(soundID, numLoops);
    };
    interpreter.setProperty(scope, 'playSound', interpreter.createNativeFunction(wrapper));


    wrapper = function(soundID) {
        app.device.stopSound(soundID);
    };
    interpreter.setProperty(scope, 'stopSound', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        app.device.destroySounds();
    };
    interpreter.setProperty(scope, 'destroySounds', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        app.device.stopSounds();
    };
    interpreter.setProperty(scope, 'stopSounds', interpreter.createNativeFunction(wrapper));

    wrapper = function(attribute, slot) {
        var component = app.device.getComponentAtSlot(slot);
        if (!component)
            return 0;
        var link = component.getLink();
        if (!link)
            return 0;

        var port1 = link.getPort1();
        var port2 = link.getPort2();

        // dprint('Link: ' + link);
        // dprint('Port1: ' + port1);
        // dprint('Port2: ' + port2);
        var otherPort = null;
        if (port1) {
            if (port1.getOwnerDevice().getName() == app.device.getName()) {
                otherPort = port2;
                // dprint('Using port2');
            }
            else {
                otherPort = port1;
                // dprint('Using port1');
            }
        }
        if (otherPort) {
            var attributeValue = otherPort.getOwnerDevice().getDeviceExternalAttributeValue(attribute);
            // dprint(attributeValue);
            return attributeValue;
        }
        // dprint('Returning NULL');
        return '0';
    }
    interpreter.setProperty(scope, 'getAttributeOfDeviceAtSlot', interpreter.createNativeFunction(wrapper));

    wrapper = function(attribute) {
        return app.device.getDeviceExternalAttributeValue(attribute);
    }
    interpreter.setProperty(scope, 'getAttributeOfDevice', interpreter.createNativeFunction(wrapper));

    wrapper = function() {
        return app.device.getSlotsCount();
    }
    interpreter.setProperty(scope, 'getSlotsCount', interpreter.createNativeFunction(wrapper));


    wrapper = function(path) {
        ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().getCurrentCluster().setIconPathAndUpdate(path);
    }
    interpreter.setProperty(scope, 'setParentGraphic', interpreter.createNativeFunction(wrapper));

    wrapper = function(path) {
        ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().getCurrentCluster().setIconPathAndUpdate(path);
    }
    interpreter.setProperty(scope, 'setParentGraphic', interpreter.createNativeFunction(wrapper));


    wrapper = function(componentName, index) {
        ipc.appWindow().getActiveWorkspace().setParentGraphicFromComponent(app.device.getName(), componentName, index, true, true);
    }
    interpreter.setProperty(scope, 'setParentGraphicFromComponent', interpreter.createNativeFunction(wrapper));

    wrapper = function(componentName, index) {
        ipc.appWindow().getActiveWorkspace().setParentGraphicFromComponent(app.device.getName(), componentName, index, true, false);
    }
    interpreter.setProperty(scope, 'setLogicalParentGraphicFromComponent', interpreter.createNativeFunction(wrapper));

    wrapper = function(componentName, index) {
        ipc.appWindow().getActiveWorkspace().setParentGraphicFromComponent(app.device.getName(), componentName, index, false, true);
    }
    interpreter.setProperty(scope, 'setPhysicalParentGraphicFromComponent', interpreter.createNativeFunction(wrapper));


    wrapper = function(name, x, y) {
        return ipc.appWindow().getActiveWorkspace().moveItemInWorkspace(name, x, y);
    };
    interpreter.setProperty(scope, 'moveItemInWorkspace', interpreter.createNativeFunction(wrapper));

}
