
UserJsApp.prototype.initEmail = function(interpreter, scope) {

	var app = this;
	var wrapper;

	var EmailClient = interpreter.createObject(interpreter.OBJECT);
	interpreter.setProperty(scope, 'EmailClient', EmailClient);

	interpreter.setProperty(EmailClient, 'setup', interpreter.createNativeFunction(function(email, server, username, password) {
		this.email = email.toString();
		this.server = server.toString();
		this.username = username.toString();
		this.password = password.toString();
		
		var emailUser = app.device.getProcess('EmailClient').getEmailUser();
		emailUser.setUser(this.username);
		emailUser.setMailId(this.email);
		emailUser.setPassword(this.password);
		emailUser.setSmtpServer(this.server);
		emailUser.setPop3Server(this.server);
		
		if (!this.inited) {
			this.inited = true;
			
			var processMailReceived = function(src, args) {
				if (EmailClient.properties.onReceive && EmailClient.properties.onReceive.type == 'function') {
					interpreter.immediateCall(EmailClient, 'onReceive', [args.sender, args.subject, args.body]);
				}
			};
			app.device.getProcess('Pop3Client').registerEvent('mailReceived', null, processMailReceived);
			
			var processMailSent = function(src, args) {
				if (EmailClient.properties.onSend && EmailClient.properties.onSend.type == 'function') {
					interpreter.immediateCall(EmailClient, 'onSend', [args.responseType]);
				}
			};
			app.device.getProcess('SmtpClient').registerEvent('mailSent', null, processMailSent);

			app.finalizers.push({cleanUp: function() {
				app.device.getProcess('Pop3Client').unregisterEvent('mailReceived', null, processMailReceived);
				app.device.getProcess('SmtpClient').unregisterEvent('mailSent', null, processMailSent);
			}});
		}
	}));
	
	interpreter.setProperty(EmailClient, 'send', interpreter.createNativeFunction(function(address, subject, body) {
		if (!this.inited)
			throw 'EmailClient not setup.';

		app.device.getProcess('SmtpClient').sendMail(this.email, address, subject, body, this.password, this.server);
		return interpreter.UNDEFINED;
	}));

	interpreter.setProperty(EmailClient, 'receive', interpreter.createNativeFunction(function() {
		if (!this.inited)
			throw 'EmailClient not setup.';

		app.device.getProcess('Pop3Client').getMailIpc();
		return interpreter.UNDEFINED;
	}));

}
