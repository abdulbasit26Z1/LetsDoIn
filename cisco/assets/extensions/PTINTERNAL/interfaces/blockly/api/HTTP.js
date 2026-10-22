
function initBlocklyHTTP() {

	Blockly.Blocks['httpclient_create'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('new HTTP client');
		this.setColour(210);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['httpclient_create'] = function(block) {
	  return ['new HTTPClient()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['httpclient_open'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('use');
		this.appendValueInput("url")
			.appendField('to go to URL');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpclient_open'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_client + '.open(' + value_url + ');\n';
	};

	Blockly.Blocks['httpclient_stop'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('stop');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpclient_stop'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_client + '.stop();\n';
	};
	
	Blockly.Blocks['httpclient_onDone'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("client")
			.appendField('when done loading on');
		this.appendValueInput("status")
			.appendField('with status');
		this.appendValueInput("data")
			.appendField('and data');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['httpclient_onDone'] = function(block) {
	  var value_client = Blockly.JavaScript.valueToCode(block, 'client', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_status = Blockly.JavaScript.valueToCode(block, 'status', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_client + '.onDone = function(' + value_status + ', ' + value_data + ') {\n'
			+ statements_commands + '};\n';
	};
	
	
	Blockly.Blocks['httpserver_create'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('new HTTP server');
		this.setColour(210);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['httpserver_create'] = function(block) {
	  return ['new HTTPServer()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['httpserver_start'] = {
	  init: function() {
		this.setColour(210);
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
	Blockly.JavaScript['httpserver_start'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_server + '.start(' + value_port + ');\n';
	};

	Blockly.Blocks['httpserver_stop'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("server")
			.appendField('stop');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpserver_stop'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_server + '.stop();\n';
	};
	
	Blockly.Blocks['httpserver_route'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("server")
			.appendField('when receiving on');
		this.appendValueInput("path")
			.appendField('at path');
		this.appendValueInput("url")
			.appendField('with url');
		this.appendValueInput("response")
			.appendField('and response');
		this.appendStatementInput("commands").appendField("Do");
	  }
	};
	Blockly.JavaScript['httpserver_route'] = function(block) {
	  var value_server = Blockly.JavaScript.valueToCode(block, 'server', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_response = Blockly.JavaScript.valueToCode(block, 'response', Blockly.JavaScript.ORDER_ATOMIC);
	  var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
	  return value_server + '.route(' + value_path + ', function(' + value_url + ', ' + value_response + ') {\n'
			+ statements_commands + '});\n';
	};
	
	Blockly.Blocks['httpserver_response_send'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("response")
			.appendField('send to');
		this.appendValueInput("content")
			.appendField('with data');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpserver_response_send'] = function(block) {
	  var value_response = Blockly.JavaScript.valueToCode(block, 'response', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_response + '.send(' + value_content + ');\n';
	};
	
	Blockly.Blocks['httpserver_response_setContentType'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("response")
			.appendField('set');
		this.appendValueInput("type")
			.appendField('content type to');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpserver_response_setContentType'] = function(block) {
	  var value_response = Blockly.JavaScript.valueToCode(block, 'response', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_type = Blockly.JavaScript.valueToCode(block, 'type', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_response + '.setContentType(' + value_type + ');\n';
	};
	
	Blockly.Blocks['httpserver_response_sendFile'] = {
	  init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("response")
			.appendField('send file to');
		this.appendValueInput("filePath")
			.appendField('from path');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['httpserver_response_sendFile'] = function(block) {
	  var value_response = Blockly.JavaScript.valueToCode(block, 'response', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_filePath = Blockly.JavaScript.valueToCode(block, 'filePath', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_response + '.sendFile(' + value_filePath + ');\n';
	};
}
