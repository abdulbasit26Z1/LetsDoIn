
function initBlocklyUSB() {

	Blockly.Blocks['usb_begin'] = {
	  init: function() {
		this.setColour(260);
		this.appendValueInput("speed")
			.appendField('start USB with speed')
			.setCheck("Number");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['usb_begin'] = function(block) {
	  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'USB0.begin(' + value_speed + ');\n';
	};

	Blockly.Blocks['usb_end'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('stop USB');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['usb_end'] = function(block) {
	  return 'USB0.end();\n';
	};	

	Blockly.Blocks['usb_available'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('bytes available to read on USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_available'] = function(block) {
	  return ['USB0.available()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['usb_print'] = {
	  init: function() {
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("value")
			.appendField('print to USB with value');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['usb_print'] = function(block) {
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'USB0.print(' + value_value + ');\n';
	};
	
	Blockly.Blocks['usb_println'] = {
	  init: function() {
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("value")
			.appendField('print line to USB with value');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['usb_println'] = function(block) {
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'USB0.println(' + value_value + ');\n';
	};
	
	Blockly.Blocks['usb_readln'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('read line from USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_readln'] = function(block) {
	  return ['USB0.readln()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['usb_readch'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('read character from USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_readch'] = function(block) {
	  return ['USB0.readch()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['usb_peekch'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('peek character from USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_peekch'] = function(block) {
	  return ['USB0.peekch()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['usb_write'] = {
	  init: function() {
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("value")
			.appendField('write byte to USB with value')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['usb_write'] = function(block) {
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'USB0.write(' + value_value + ');\n';
	};	

	Blockly.Blocks['usb_read'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('read byte from USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_read'] = function(block) {
	  return ['USB0.read()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['usb_peek'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('peek byte from USB');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['usb_peek'] = function(block) {
	  return ['USB0.peek()', Blockly.JavaScript.ORDER_NONE];
	};
	
	
	Blockly.Blocks['ptmata_begin'] = {
	  init: function() {
		this.setColour(260);
		this.appendValueInput("speed")
			.appendField('start PTmata with speed')
			.setCheck("Number");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['ptmata_begin'] = function(block) {
	  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'PTmata0.begin(' + value_speed + ');\n';
	};

	Blockly.Blocks['ptmata_end'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('stop PTmata');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['ptmata_end'] = function(block) {
	  return 'PTmata0.end();\n';
	};	

	Blockly.Blocks['ptmata_available'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('bytes available to read on PTmata');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['ptmata_available'] = function(block) {
	  return ['PTmata0.available()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['ptmata_processInput'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('process input from PTmata');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['ptmata_processInput'] = function(block) {
	  return 'PTmata0.processInput();\n';
	};	

	Blockly.Blocks['ptmata_readAndReportData'] = {
	  init: function() {
		this.setColour(260);
		this.appendDummyInput()
			.appendField('read and report data to PTmata');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['ptmata_readAndReportData'] = function(block) {
	  return 'PTmata0.readAndReportData();\n';
	};	
	
	Blockly.Blocks['ptmata_pinMode'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('PTmata pinMode');
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.appendDummyInput().appendField("mode").appendField(new Blockly.FieldDropdown([
			["INPUT", "0"],
			["OUTPUT", "1"]
		]), "mode");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ptmata_pinMode'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_mode = block.getFieldValue('mode');
	  return 'PTmata0.pinMode(' + value_slot + ', ' + value_mode + ');\n';
	};

	Blockly.Blocks['ptmata_digitalWrite'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('PTmata digitalWrite');
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.appendValueInput("value")
			.appendField('value')
			.setCheck("Number");
	   this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ptmata_digitalWrite'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'PTmata0.digitalWrite(' + value_slot + ', ' + value_value + ');\n';
	};

	Blockly.Blocks['ptmata_digitalRead'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('PTmata digitalRead');
		this.setColour(260);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.setOutput(true);
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ptmata_digitalRead'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['PTmata0.digitalRead(' + value_slot + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['ptmata_analogWrite'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('PTmata analogWrite');
		this.setColour(260);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.appendValueInput("value")
			.appendField('value')
			.setCheck("Number");
	   this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ptmata_analogWrite'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'PTmata0.analogWrite(' + value_slot + ', ' + value_value + ');\n';
	};

	Blockly.Blocks['ptmata_analogRead'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('PTmata analogRead');
		this.setColour(260);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.setOutput(true);
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ptmata_analogRead'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['PTmata0.analogRead(' + value_slot + ')', Blockly.JavaScript.ORDER_NONE];
	};	

}
