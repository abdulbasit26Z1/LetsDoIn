
function initBlocklyNetworking() {
	Blockly.Blocks['network_localIP'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('local IP');
		this.setColour(65);
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['network_localIP'] = function(block) {
	  return ['Network.localIP()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['network_subnetMask'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('subnet mask');
		this.setColour(65);
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['network_subnetMask'] = function(block) {
	  return ['Network.subnetMask()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['network_gatewayIP'] = {
	  init: function() {
		this.appendDummyInput()
			.appendField('gateway IP');
		this.setColour(65);
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['network_gatewayIP'] = function(block) {
	  return ['Network.gatewayIP()', Blockly.JavaScript.ORDER_NONE];
	};
}
