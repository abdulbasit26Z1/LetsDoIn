
function initBlocklyUDP() {

	Blockly.Blocks['udpsocket_create'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('new UDP socket');
		this.setColour(120);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['udpsocket_create'] = function(block) {
	  return ['new UDPSocket()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['udpsocket_begin'] = {
	  init: function() {
		this.setColour(120);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("socket")
			.appendField('start');
		this.appendValueInput("port")
			.appendField('on port')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['udpsocket_begin'] = function(block) {
	  var value_socket = Blockly.JavaScript.valueToCode(block, 'socket', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_socket + '.begin(' + value_port + ');\n';
	};

	Blockly.Blocks['udpsocket_stop'] = {
	  init: function() {
		this.setColour(120);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("socket")
			.appendField('stop');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['udpsocket_stop'] = function(block) {
	  var value_socket = Blockly.JavaScript.valueToCode(block, 'socket', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_socket + '.stop();\n';
	};
	
	Blockly.Blocks['udpsocket_send'] = {
	  init: function() {
		this.setColour(120);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("socket")
			.appendField('on');
		this.appendValueInput("ip")
			.appendField('send to IP');
		this.appendValueInput("port")
			.appendField('and port')
			.setCheck("Number");
		this.appendValueInput("data")
			.appendField('with data');
	  }
	};
	Blockly.JavaScript['udpsocket_send'] = function(block) {
	  var value_socket = Blockly.JavaScript.valueToCode(block, 'socket', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_ip = Blockly.JavaScript.valueToCode(block, 'ip', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_socket + '.send(' + value_ip + ', ' + value_port + ', ' + value_data + ');\n';
	};
	
	Blockly.Blocks['udp_onReceive'] = {
	  init: function() {
		this.setColour(120);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("socket")
			.appendField('when received data on');
		this.appendValueInput("srcIP")
			.appendField('from IP');
		this.appendValueInput("srcPort")
			.appendField('and port');
		this.appendValueInput("data")
			.appendField('with data');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['udp_onReceive'] = function(block) {
	  var value_socket = Blockly.JavaScript.valueToCode(block, 'socket', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_srcIP = Blockly.JavaScript.valueToCode(block, 'srcIP', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_srcPort = Blockly.JavaScript.valueToCode(block, 'srcPort', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_socket + '.onReceive = function(' + value_srcIP + ', ' + value_srcPort + ', ' + value_data + ') {\n'
			+ statements_commands + '};\n';
	};
}
