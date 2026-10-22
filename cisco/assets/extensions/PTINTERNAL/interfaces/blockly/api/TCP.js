
function initBlocklyTCP() {

	Blockly.Blocks['tcpclient_create'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('new TCP client');
		this.setColour(160);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpclient_create'] = function(block) {
	  return ['new TCPClient()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tcpclient_connect'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('connect');
		this.appendValueInput("ip")
			.appendField('to IP');
		this.appendValueInput("port")
			.appendField('and port')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['tcpclient_connect'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_ip = Blockly.JavaScript.valueToCode(block, 'ip', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_client + '.connect(' + value_ip + ', ' + value_port + ');\n';
	};

	Blockly.Blocks['tcpclient_close'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('close');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['tcpclient_close'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_client + '.close();\n';
	};
	
	Blockly.Blocks['tcpclient_connected'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("client")
			.appendField('is connected');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpclient_connected'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_client + '.connected()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tcpclient_state'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("client")
			.appendField('state of');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpclient_state'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_client + '.state()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['tcpclient_remoteIP'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("client")
			.appendField('remote IP of');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpclient_remoteIP'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_client + '.remoteIP()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tcpclient_remotePort'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("client")
			.appendField('remote port of');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpclient_remotePort'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_client + '.remotePort()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tcpclient_send'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('send to');
		this.appendValueInput("data")
			.appendField('with data');
	  }
	};
	Blockly.JavaScript['tcpclient_send'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_client + '.send(' + value_data + ');\n';
	};
	
	Blockly.Blocks['tcpclient_onConnectionChanged'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('when connection changes on');
		this.appendValueInput("type")
			.appendField('to type');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['tcpclient_onConnectionChanged'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_type = Blockly.JavaScript.valueToCode(block, 'type', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_client + '.onConnectionChange = function(' + value_type + ') {\n'
			+ statements_commands + '};\n';
	};
	
	Blockly.Blocks['tcpclient_onReceive'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('when received data on');
		this.appendValueInput("data")
			.appendField('with data');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['tcpclient_onReceive'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_client + '.onReceive = function(' + value_data + ') {\n'
			+ statements_commands + '};\n';
	};
	
	
	Blockly.Blocks['tcpserver_create'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('new TCP server');
		this.setColour(160);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['tcpserver_create'] = function(block) {
	  return ['new TCPServer()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['tcpserver_listen'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("server")
			.appendField('start');
		this.appendValueInput("port")
			.appendField('on port')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['tcpserver_listen'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_server + '.listen(' + value_port + ');\n';
	};

	Blockly.Blocks['tcpserver_stop'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("server")
			.appendField('stop');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['tcpserver_stop'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_server + '.stop();\n';
	};
	
	Blockly.Blocks['tcpserver_onNewClient'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("server")
			.appendField('when a new client connects to');
		this.appendValueInput("client")
			.appendField('with client');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['tcpserver_onNewClient'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_server + '.onNewClient = function(' + value_client + ') {\n'
			+ statements_commands + '};\n';
	};
}
