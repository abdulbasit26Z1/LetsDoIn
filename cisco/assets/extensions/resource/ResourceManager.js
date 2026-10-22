
function ResourceManager() {

}

ResourceManager.THIS_SM_ID = ipc.ipcManager().thisInstance().getCep().getId();

ResourceManager.prototype.init = function() {
	this.devices = {};
	this.links = {};
	this.deviceAttributes = JSON.parse($getData("devices.json"));
	this.linkAttributes = JSON.parse($getData("links.json"));
	this.moduleAttributes = JSON.parse($getData("modules.json"));
	this.gradingAttributes =  JSON.parse($getData("grading.json"));
	
	this.initListeners();
}

ResourceManager.prototype.cleanUp = function() {
dprint("ResourceManager.prototype.cleanUp");
	this.removeListeners();
	// remove all devices
	for (var deviceId in this.devices) {
		this.onDeviceRemoving(null, {deviceUuid:deviceId});
	}
}

ResourceManager.prototype.initListeners = function() {
	ipc.appWindow().registerEvent("fileNewed", this, this.onFileOpen);
	ipc.appWindow().registerEvent("fileOpened", this, this.onFileOpen);
	ipc.appWindow().registerEvent("enteredActivityWizard", this, this.onEnteredActivityWizard);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().registerEvent("deviceAdded", this, this.onDeviceAdded);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().registerEvent("deviceRemoving", this, this.onDeviceRemoving);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().registerEvent("linkCreated", this, this.onLinkCreated);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().registerEvent("linkDeleted", this, this.onLinkDeleted);
}

ResourceManager.prototype.removeListeners = function() {
	ipc.appWindow().unregisterEvent("fileNewed", this, this.onFileOpen);
	ipc.appWindow().unregisterEvent("fileOpened", this, this.onFileOpen);
	ipc.appWindow().unregisterEvent("enteredActivityWizard", this, this.onEnteredActivityWizard);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().unregisterEvent("deviceAdded", this, this.onDeviceAdded);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().unregisterEvent("deviceRemoving", this, this.onDeviceRemoving);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().unregisterEvent("linkCreated", this, this.onLinkCreated);
	ipc.appWindow().getActiveWorkspace().getLogicalWorkspace().unregisterEvent("linkDeleted", this, this.onLinkDeleted);
}

ResourceManager.prototype.onFileOpen = function() {
	this.devices = {}; // clean up previous devices
	this.links = {};
	this.reloadNetwork();
}

ResourceManager.prototype.onEnteredActivityWizard = function(src, args) {
	if (args.convertedCurrentFile) {
		this.onFileOpen();
	} else {
		this.reloadNetwork();
	}
	ipc.appWindow().getActivityWizard().registerEvent("networkSwitched", this, this.reloadNetwork);
}


ResourceManager.prototype.reloadNetwork = function() {
	var activeFile = ipc.appWindow().getActiveFile();
	var files = [];
	if (activeFile.getClassName() == 'ActivityFile') {
		files = [activeFile.getInitNetworkFile(), activeFile.getAnsNetworkFile(), activeFile.getUserNetworkFile(), activeFile.getVarNetworkFile()];
		activeFile.registerEvent("activityReset", this, this.onActivityReset);
		activeFile.registerEvent("networkSwitched", this, this.reloadNetwork);
		dprint('activity file: ' + activeFile.getObjectUuid());
	} else {
		files = [activeFile];
	}

	for (var n=0; n<files.length; n++) {
		files[n].getWorkspace().getLogicalWorkspace().registerEvent("deviceAdded", this, this.onDeviceAdded);
		files[n].getWorkspace().getLogicalWorkspace().registerEvent("deviceRemoving", this, this.onDeviceRemoving);
		files[n].getWorkspace().getLogicalWorkspace().registerEvent("linkCreated", this, this.onLinkCreated);
		files[n].getWorkspace().getLogicalWorkspace().registerEvent("linkDeleted", this, this.onLinkDeleted);
		// go through all devices
		var network = files[n].getMainNetwork();
		var deviceCount = network.getDeviceCount();
		for (var i=0; i<deviceCount; i++) {	
			var ptDevice = network.getDeviceAt(i);
			this.checkAddedDevice(ptDevice);
			dprint('this.devices.length: ' + getAssociativeArrayLength(this.devices));
			this.getLinks(ptDevice);
		}
	}
}


ResourceManager.prototype.onDeviceAdded = function(src, args) {
	var ptDevice = ipc.network().getDevice(args.name);
	this.checkAddedDevice(ptDevice);
}

ResourceManager.prototype.checkAddedDevice = function(ptDevice) {
	var type = 'default';//ptDevice.getType();
	var tempType = ptDevice.getType();
	var deviceAttributesString = ptDevice.getDeviceExternalAttributes();
	if (deviceAttributesString.length == 0)
	{
		switch(true){
			case (tempType == 0):
				type = 'Routers';
				break;
			case (tempType == 1 || tempType == 3):
				type = 'Switches';
				break;
			case (tempType == 2 || tempType == 13 || tempType == 14):
				type = 'WAN Emulation';
				break;
			case (tempType == 4 || tempType == 5 || tempType == 6):
				type = 'Hubs';
				break;
			case (tempType == 7 || tempType == 11 || tempType == 28 || tempType == 29 || tempType == 30 || tempType == 31 || tempType == 32):
				type = 'Wireless Devices';
				break;
			case (tempType == 8 || tempType == 9 || tempType == 10 || tempType == 11 || tempType == 12 || tempType == 17
				|| tempType == 18 || tempType == 19 || tempType == 20 || tempType == 21 || tempType == 22 || tempType == 22
				|| tempType == 23 || tempType == 24 || tempType == 33):
				type = 'End Devices';
				break;
			case (tempType == 26):
				type = 'Security';
				break;
			case (tempType == 27 || tempType == 34 || tempType == 35 || tempType == 36 || tempType == 37 || tempType == 38):
				type = 'IoE Devices';
				break;
			default:
				type = 'default';
				break;
		}
		var model = ptDevice.getModel();
		var deviceTypeInfo = this.deviceAttributes[type];
		var foundDeviceType = false;
		if (deviceTypeInfo) {
			var deviceModelInfo = deviceTypeInfo[model];
			if (deviceModelInfo) {
				var resourceInfo = this.deviceAttributes[type][model].attributes;
				ptDevice.setDeviceExternalAttributes(JSON.stringify(resourceInfo));
				foundDeviceType = true;
			}
		}
	
	// if the device type does not have values, the use default (if any)
		if (foundDeviceType == false) {
			var resourceInfo = this.deviceAttributes["default"].attributes;
			if (resourceInfo) {
				ptDevice.setDeviceExternalAttributes(JSON.stringify(resourceInfo));
			}
		}
	}

	var deviceUuid = ptDevice.getObjectUuid();
	this.devices[deviceUuid] = ptDevice;
	ptDevice.registerEvent("moduleAdded", this, this.onModuleAdded);
	ptDevice.registerEvent("moduleRemoved", this, this.onModuleRemoved);
	
	// go through device's modules
	var rootModule = ptDevice.getRootModule();
	if (rootModule) {
		this.checkAddedModule(ptDevice, rootModule);
	}
}

ResourceManager.prototype.onDeviceRemoving = function(src, args) {
	var json1 = JSON.stringify(src);
	var json2 = JSON.stringify(args);

	var ptDevice = this.devices[args.deviceUuid];
	if (ptDevice) {
		ptDevice.unregisterEvent("moduleAdded", this, this.onModuleAdded);
		ptDevice.unregisterEvent("moduleRemoved", this, this.onModuleRemoved);
		delete this.devices[args.deviceUuid];
	}
	else {
	}
}

ResourceManager.prototype.onModuleAdded = function(src, args) {
	var json1 = JSON.stringify(src);
	var json2 = JSON.stringify(args);

	var ptDevice = this.devices[src.objectUuid];
	if (ptDevice) {
		var resourceInfo = this.moduleAttributes[args.model];
		if (resourceInfo) {
			ptDevice.addDeviceExternalAttributes(JSON.stringify(resourceInfo.attributes));
		}
		else {
			resourceInfo = this.moduleAttributes["default"];
			if (resourceInfo) {
				ptDevice.addDeviceExternalAttributes(JSON.stringify(resourceInfo.attributes));
			}
		}
	}
	else {

	}
}

ResourceManager.prototype.onModuleRemoved = function(src, args) {
	var json1 = JSON.stringify(src);
	var json2 = JSON.stringify(args);

	var ptDevice = this.devices[src.objectUuid];
	if (ptDevice) {

		var resourceInfo = this.moduleAttributes[args.model];
		if (resourceInfo) {
			ptDevice.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo.attributes));
		}
		else {
			resourceInfo = this.moduleAttributes["default"];
			if (resourceInfo) {
				ptDevice.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo.attributes));
			}
		}
	}
	else {

	}
}

ResourceManager.prototype.checkAddedModule = function(ptDevice, ptModule) {
	var moduleName = ptModule.getDescriptor().getModel();
	var resourceInfo = this.moduleAttributes[moduleName];
	if (resourceInfo) {

		ptDevice.addDeviceExternalAttributes(JSON.stringify(resourceInfo.attributes));
	}
	
	for (var i=0; i<ptModule.getModuleCount(); i++) {
		var newModule = ptModule.getModuleAt(i);
		if (newModule) {
			this.checkAddedModule(ptDevice, newModule);
		}
	}
}

ResourceManager.prototype.onLinkCreated = function(src, args){
	/*
	src.className
	src.objectUuid
	src.eventName
	*/
	/*
	args.connType
	args.deviceName1
	args.deviceName2
	args.portName1
	args.portName2
	*/
	var connType = 0;
	switch(args.connType){
		case 8100:
		case 8101:
		case 8102:	
			connType = 'Ethernet';
			break;
		case 8103:
			connType = 'Fiber';
			break;
		case 8104:
			connType = 'Phone';
			break;
		case 8105:
			connType = 'Cable';
			break;
		case 8106:
			connType = 'Serial';
			break;
		case 8107:
			connType = 'Auto';
			break;
		case 8108:
			connType = 'Console';
			break;
		case 8109:
			connType = 'Wireless';
			break;
		case 8110:
			connType = 'Coaxial';
			break;
		case 8111:
			connType = 'Octal';
			break;
		case 8112:
			connType = 'USB';
			break;
		case 8113:
			connType = 'IoE Custom Cable';
			break;
		default:
			connType = 'default';
			break;
	}

	if (args.connType == 8114){//If IoE cable
		var link = ipc.network().getDevice(args.deviceName1).getComponentByName(args.portName1).getLink();
	}
	else{
		var link = ipc.network().getDevice(args.deviceName1).getPort(args.portName1).getLink();
	}
	var cableTypeInfo = this.linkAttributes[connType];
	var foundCableType = false;
	if (cableTypeInfo) {
		var resourceInfo = this.linkAttributes[connType].attributes;
dprint(args);
		var dev1 = ipc.network().getDevice(args.deviceName1);
		var dev2 = ipc.network().getDevice(args.deviceName2);

		// Prevent an error when using a 819, etc that has an invisible cable.
		if(null == dev1 || null == dev2)
			return;

		dev1.addDeviceExternalAttributes(JSON.stringify(resourceInfo));
		dev2.addDeviceExternalAttributes(JSON.stringify(resourceInfo));
		foundCableType = true;
	}
	
	// if the device type does not have values, the use default (if any)
	if (foundCableType == false) {
		var resourceInfo = this.linkAttributes["default"];
		var dev1 = ipc.network().getDevice(args.deviceName1);
		var dev2 = ipc.network().getDevice(args.deviceName2);
		dev1.addDeviceExternalAttributes(JSON.stringify(resourceInfo));
		dev2.addDeviceExternalAttributes(JSON.stringify(resourceInfo));
		}

	var linkUuid = link.getObjectUuid();
	this.links[linkUuid] = link;
}

ResourceManager.prototype.onLinkDeleted = function(src, args){
	/*
	src.className
	src.objectUuid
	src.eventName
	*/
	/*
	args.connType
	args.deviceName1
	args.deviceName2
	args.portName1
	args.portName2
	*/
	switch(args.connType){
		case 8100:
		case 8101:
		case 8102:	
			connType = 'Ethernet';
			break;
		case 8103:
			connType = 'Fiber';
			break;
		case 8104:
			connType = 'Phone';
			break;
		case 8105:
			connType = 'Cable';
			break;
		case 8106:
			connType = 'Serial';
			break;
		case 8107:
			connType = 'Auto';
			break;
		case 8108:
			connType = 'Console';
			break;
		case 8109:
			connType = 'Wireless';
			break;
		case 8110:
			connType = 'Coaxial';
			break;
		case 8111:
			connType = 'Octal';
			break;
		case 8112:
			connType = 'USB';
			break;
		case 8113:
			connType = 'USB';
			break;
		case 8114:
			connType = 'IoE Custom Cable';
			break;
		default:
			connType = 'default';
			break;
	}
	if (args.connType == 8114){//If IoE cable
		var link = ipc.network().getDevice(args.deviceName1).getComponentByName(args.portName1).getLink();
	}
	else{
		var link = ipc.network().getDevice(args.deviceName1).getPort(args.portName1).getLink();
	}
	var cableTypeInfo = this.linkAttributes[connType];
	var foundCableType = false;
	if (cableTypeInfo) {
		var resourceInfo = this.linkAttributes[connType].attributes;
		var dev1 = ipc.network().getDevice(args.deviceName1);
		var dev2 = ipc.network().getDevice(args.deviceName2);
		dev1.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo));
		dev2.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo));
		foundCableType = true;
	}
	
	// if the device type does not have values, the use default (if any)
	if (foundCableType == false) {
		var resourceInfo = this.linkAttributes["default"];
		var dev1 = ipc.network().getDevice(args.deviceName1);
		var dev2 = ipc.network().getDevice(args.deviceName2);
		dev1.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo));
		dev2.subtractDeviceExternalAttributes(JSON.stringify(resourceInfo));
	}
	if (this.links[link.getObjectUuid()]){
		delete this.links[link.getObjectUuid()];
	}
}

ResourceManager.prototype.getGradingNodes = function() {
	var gradingNodes = this.gradingAttributes.join();
	return gradingNodes;
}

ResourceManager.prototype.getLinks = function(ptDevice){
	var link;
	var ports = [];
	/*
	*Get regular links and add them
	*/
	for (var i = 0; i < ptDevice.getPortCount(); ++i){
		if (ptDevice.getPortAt(i)){
			ports.push(i);
		}
	}
	for (var j = 0; j < ports.length; ++j){
		link = ptDevice.getPortAt(ports[j]).getLink();
		if (link){
			var src = {};
			src['className'] = null;
			src['objectUuid'] = null;
			src['eventName'] = null;
			var args = {};
			args['connType'] = link.getConnectionType();
			if (args.connType == 8109){
				continue;
			}
			var port1 = link.getPort1();
			if (port1){
				args['portName1'] = link.getPort1().getName();
				args['portName2'] = link.getPort2().getName();
				args['deviceName1'] = link.getPort1().getOwnerDevice().getName();
				args['deviceName2'] = link.getPort2().getOwnerDevice().getName();
				this.onLinkCreated(src, args);
			}
		}
		else{
		}
	}
	/*
	*Get ioe links and add them
	*/
	if (ptDevice.getSlotsCount){
		for (var j = 0; j < ptDevice.getSlotsCount(); ++j){
			var component = ptDevice.getComponentAtSlot(j);
			if (component) {
			link = ptDevice.getComponentAtSlot(j).getLink();
			if (link){
				var src = {};
				src['className'] = null;
				src['objectUuid'] = null;
				src['eventName'] = null;
				var args = {};
				args['connType'] = 8114;//link.getConnectionType();
				var port1 = link.getPort1();
				if (port1){
					args['portName1'] = link.getPort1().getName();
					args['portName2'] = link.getPort2().getName();
					args['deviceName1'] = link.getPort1().getOwnerDevice().getName();
					args['deviceName2'] = link.getPort2().getOwnerDevice().getName();
					this.onLinkCreated(src, args);
				}
			}
			else{
			}
			}
		}
	}
	/*
	*Get usb links and add them
	*/
	if (ptDevice.getUsbPort){
		if (ptDevice.getUsbPort()){
			link = ptDevice.getUsbPort().getLink();
			if (link){
				var src = {};
				src['className'] = null;
				src['objectUuid'] = null;
				src['eventName'] = null;
				var args = {};
				args['connType'] = link.getConnectionType();
				var port1 = link.getPort1();
				if (port1){
					args['portName1'] = link.getPort1().getName();
					args['portName2'] = link.getPort2().getName();
					args['deviceName1'] = link.getPort1().getOwnerDevice().getName();
					args['deviceName2'] = link.getPort2().getOwnerDevice().getName();
					this.onLinkCreated(src, args);
				}
			}
		}
	}
	/*
	*Get console links and add them
	*/
	if (ptDevice.getConsole){
		if (ptDevice.getConsole()){
			link = ptDevice.getConsole().getLink();
			if (link){
				var src = {};
				src['className'] = null;
				src['objectUuid'] = null;
				src['eventName'] = null;
				var args = {};
				args['connType'] = link.getConnectionType();
				var port1 = link.getPort1();
				if (port1){
					args['portName1'] = link.getPort1().getName();
					args['portName2'] = link.getPort2().getName();
					args['deviceName1'] = link.getPort1().getOwnerDevice().getName();
					args['deviceName2'] = link.getPort2().getOwnerDevice().getName();
					this.onLinkCreated(src, args);
				}
			}	
		}
	}
}


//This function is just for debugging
function getAssociativeArrayLength(obj){
	count = 0;
	for (var item in obj){
		count++;
	}
	return count;
}