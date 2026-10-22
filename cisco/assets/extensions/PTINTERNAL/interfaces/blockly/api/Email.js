
function initBlocklyEmail() {

	Blockly.Blocks['email_setup'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("address")
			.appendField('setup email client with address');
		this.appendValueInput("server")
			.appendField('server');
		this.appendValueInput("user")
			.appendField('user name');
		this.appendValueInput("password")
			.appendField('password');
	  }
	};
	Blockly.JavaScript['email_setup'] = function(block) {
	  var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_user = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_password = Blockly.JavaScript.valueToCode(block, 'password', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'EmailClient.setup(' + value_address + ', ' + value_server + ', ' + value_user + ', ' + value_password + ');\n';
	};

	Blockly.Blocks['email_send'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("address")
			.appendField('send email to address');
		this.appendValueInput("subject")
			.appendField('subject');
		this.appendValueInput("body")
			.appendField('body');
	  }
	};
	Blockly.JavaScript['email_send'] = function(block) {
	  var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_subject = Blockly.JavaScript.valueToCode(block, 'subject', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_body = Blockly.JavaScript.valueToCode(block, 'body', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'EmailClient.send(' + value_address + ', ' + value_subject + ', ' + value_body + ');\n';
	};
	
	Blockly.Blocks['email_receive'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField('check email');
	  }
	};
	Blockly.JavaScript['email_receive'] = function(block) {
	  return 'EmailClient.receive();\n';
	};
	
	Blockly.Blocks['email_onSend'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("status")
			.appendField('when email is sent with status');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['email_onSend'] = function(block) {
	  var value_status = Blockly.JavaScript.valueToCode(block, 'status', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return 'EmailClient.onSend = function(' + value_status + ') {\n'
			+ statements_commands + '};\n';
	};

	Blockly.Blocks['email_onReceive'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("sender")
			.appendField('when receiving email from');
		this.appendValueInput("subject")
			.appendField('subject');
		this.appendValueInput("body")
			.appendField('body');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['email_onReceive'] = function(block) {
	  var value_sender = Blockly.JavaScript.valueToCode(block, 'sender', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_subject = Blockly.JavaScript.valueToCode(block, 'subject', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_body = Blockly.JavaScript.valueToCode(block, 'body', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return 'EmailClient.onReceive = function(' + value_sender + ', ' + value_subject + ', ' + value_body + ') {\n'
			+ statements_commands + '};\n';
	};
}
