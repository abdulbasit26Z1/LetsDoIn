var $builtinmodule = function(name) {
	var mod = {};
	var app = Sk;

	mod.localIP = new Sk.builtin.func(function() {
		var port = app.device.getPortAt(0);
		if (port)
			return Sk.builtin.str(port.getIpAddress());
		return Sk.builtin.str('0.0.0.0');
	});

	mod.subnetMask = new Sk.builtin.func(function() {
		var port = app.device.getPortAt(0);
		if (port)
			return Sk.builtin.str(port.getSubnetMask());
		return Sk.builtin.str('0.0.0.0');
	});

	mod.gatewayIP = new Sk.builtin.func(function() {
		return Sk.builtin.str(app.device.getProcess('HostIp').getDefaultGateway());
	});

	return mod;
};
