
function initBlocklyGPIO() {

	Blockly.Blocks['ioe_pinMode'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('pinMode');
		this.setColour(20);
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
	Blockly.JavaScript['ioe_pinMode'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_mode = block.getFieldValue('mode');
	  return 'pinMode(' + value_slot + ', ' + value_mode + ');\n';
	};

	Blockly.Blocks['ioe_digitalWrite'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('digitalWrite');
		this.setColour(20);
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
	Blockly.JavaScript['ioe_digitalWrite'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'digitalWrite(' + value_slot + ', ' + value_value + ');\n';
	};

	Blockly.Blocks['ioe_digitalRead'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('digitalRead');
		this.setColour(20);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.setOutput(true);
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ioe_digitalRead'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['digitalRead(' + value_slot + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['ioe_analogWrite'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('analogWrite');
		this.setColour(20);
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
	Blockly.JavaScript['ioe_analogWrite'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'analogWrite(' + value_slot + ', ' + value_value + ');\n';
	};

	Blockly.Blocks['ioe_analogRead'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('analogRead');
		this.setColour(20);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.setOutput(true);
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ioe_analogRead'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['analogRead(' + value_slot + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['ioe_customWrite'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('customWrite');
		this.setColour(20);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.appendValueInput("value")
			.appendField('value');
	   this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ioe_customWrite'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'customWrite(' + value_slot + ', ' + value_value + ');\n';
	};

	Blockly.Blocks['ioe_customRead'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('customRead');
		this.setColour(20);
		this.appendValueInput("slot")
			.appendField('slot')
			.setCheck("Number");
		this.setOutput(true);
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ioe_customRead'] = function(block) {
	  var value_slot = Blockly.JavaScript.valueToCode(block, 'slot', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['customRead(' + value_slot + ')', Blockly.JavaScript.ORDER_NONE];
	};
}
