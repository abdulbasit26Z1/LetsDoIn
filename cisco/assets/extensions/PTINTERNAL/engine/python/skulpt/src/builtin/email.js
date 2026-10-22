var $builtinmodule = function(name) {
	var mod = {};
	
	var EmailClient = function ($gbl, $loc) {
	
		$loc.__init__ = new Sk.builtin.func(function(self) {
			self.inited = false;
		});

		$loc.setup = new Sk.builtin.func(function(self, email, server, username, password) {
			self.email = Sk.ffi.remapToJs(email);
			self.server = Sk.ffi.remapToJs(server);
			self.username = Sk.ffi.remapToJs(username);
			self.password = Sk.ffi.remapToJs(password);
			
			var emailUser = Sk.app.device.getProcess('EmailClient').getEmailUser();
			emailUser.setUser(self.username);
			emailUser.setMailId(self.email);
			emailUser.setPassword(self.password);
			emailUser.setSmtpServer(self.server);
			emailUser.setPop3Server(self.server);
			
			if (!self.inited) {
				self.inited = true;
				
				var processMailReceived = function(src, args) {
					if (self.onReceive && self.onReceive instanceof Sk.builtin.func) {
						Sk.app.callSim(self.onReceive, Sk.builtin.str(args.sender), Sk.builtin.str(args.subject), Sk.builtin.str(args.body));
					}
				};
				Sk.app.device.getProcess('Pop3Client').registerEvent('mailReceived', null, processMailReceived);
				
				var processMailSent = function(src, args) {
					if (self.onSend && self.onSend instanceof Sk.builtin.func) {
						Sk.app.callSim(self.onSend, Sk.builtin.assk$(args.responseType));
					}
				};
				Sk.app.device.getProcess('SmtpClient').registerEvent('mailSent', null, processMailSent);

				Sk.app.finalizers.push({cleanUp: function() {
					Sk.app.device.getProcess('Pop3Client').unregisterEvent('mailReceived', null, processMailReceived);
					Sk.app.device.getProcess('SmtpClient').unregisterEvent('mailSent', null, processMailSent);
				}});
			}
		});

		$loc.send = new Sk.builtin.func(function(self, address, subject, body) {
			if (!self.inited)
				throw 'EmailClient not setup.';

			address = Sk.ffi.remapToJs(address);
			subject = Sk.ffi.remapToJs(subject);
			body = Sk.ffi.remapToJs(body);
			
			Sk.app.device.getProcess('SmtpClient').sendMail(self.email, address, subject, body, self.password, self.server);
		});
		
		$loc.receive = new Sk.builtin.func(function(self) {
			if (!self.inited)
				throw 'EmailClient not setup.';

			Sk.app.device.getProcess('Pop3Client').getMailIpc();
		});
		
		$loc.onSend = new Sk.builtin.func(function(self, callback) {
			self.onSend = callback;
		});

		$loc.onReceive = new Sk.builtin.func(function(self, callback) {
			self.onReceive = callback;
		});
	};
	mod.EmailClient = Sk.misceval.callsim(Sk.misceval.buildClass(mod, EmailClient, "EmailClient", []));
	
	return mod;
};
