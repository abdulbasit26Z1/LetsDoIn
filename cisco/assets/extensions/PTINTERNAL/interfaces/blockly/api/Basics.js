
function initBlocklyBasics() {
	Blockly.JavaScript['text_print'] = function(block) {
	  // Print statement.
	  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
		  Blockly.JavaScript.ORDER_NONE) || '\'\'';
	  return 'Serial.println(' + argument0 + ');\n';
	};

	Blockly.Blocks['ioe_delay'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('delay');
		this.setColour(Blockly.Blocks.texts.HUE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("ms")
			.appendField('ms')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['ioe_delay'] = function(block) {
	  var value_ms = Blockly.JavaScript.valueToCode(block, 'ms', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'delay(' + value_ms + ');\n';
	};
}
