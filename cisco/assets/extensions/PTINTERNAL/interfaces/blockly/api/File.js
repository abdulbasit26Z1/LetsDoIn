
function initBlocklyFile() {

	Blockly.Blocks['file_dir'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('all files in');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_dir'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['FileSystem.exists(' + value_path + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_mkdir'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('make directory');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['file_mkdir'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'FileSystem.mkdir(' + value_path + ');\n';
	};

	Blockly.Blocks['file_rmdir'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('remove directory');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['file_rmdir'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'FileSystem.rmdir(' + value_path + ');\n';
	};	
	
	Blockly.Blocks['file_exists'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('does exist');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_exists'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['FileSystem.exists(' + value_path + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_open'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('open file at');
		this.appendValueInput("mode")
			.appendField('with mode')
			.setCheck("Number");
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_open'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_mode = Blockly.JavaScript.valueToCode(block, 'mode', Blockly.JavaScript.ORDER_ATOMIC);
	  return ['FileSystem.open(' + value_path + ', ' + value_mode + ')', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_remove'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("path")
			.appendField('remove file');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
	  }
	};
	Blockly.JavaScript['file_remove'] = function(block) {
	  var value_path = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'FileSystem.remove(' + value_path + ');\n';
	};	

	Blockly.Blocks['file_file_close'] = {
	  init: function() {
		this.setColour(290);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("file")
			.appendField('close');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['file_file_close'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_file + '.close();\n';
	};
	
	Blockly.Blocks['file_file_name'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('name of');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_name'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.name()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['file_file_dir'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('directory of');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_dir'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.dir()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_file_position'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('position in');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_position'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.position()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_file_seek'] = {
	  init: function() {
		this.setColour(290);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("file")
			.appendField('seek');
		this.appendValueInput("position")
			.appendField('to position')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['file_file_seek'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_position = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_file + '.seek(' + value_position + ');\n';
	};

	Blockly.Blocks['file_file_available'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('bytes available to read in');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_available'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.available()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['file_file_print'] = {
	  init: function() {
		this.setColour(290);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("file")
			.appendField('print to');
		this.appendValueInput("value")
			.appendField('with value');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['file_file_print'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_file + '.print(' + value_value + ');\n';
	};
	
	Blockly.Blocks['file_file_println'] = {
	  init: function() {
		this.setColour(290);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("file")
			.appendField('print line to');
		this.appendValueInput("value")
			.appendField('with value');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['file_file_println'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_file + '.println(' + value_value + ');\n';
	};
	
	Blockly.Blocks['file_file_readln'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('read line from');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_readln'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.readln()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['file_file_readch'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('read character from');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_readch'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.readch()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_file_peekch'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('peek character from');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_peekch'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.peekch()', Blockly.JavaScript.ORDER_NONE];
	};

	Blockly.Blocks['file_file_write'] = {
	  init: function() {
		this.setColour(290);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("file")
			.appendField('write byte to');
		this.appendValueInput("value")
			.appendField('with value')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['file_file_write'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return value_file + '.write(' + value_value + ');\n';
	};	

	Blockly.Blocks['file_file_read'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('read byte from');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_read'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.read()', Blockly.JavaScript.ORDER_NONE];
	};
	
	Blockly.Blocks['file_file_peek'] = {
	  init: function() {
		this.setColour(290);
		this.appendValueInput("file")
			.appendField('peek byte from');
		this.setInputsInline(true);
		this.setOutput(true);
	  }
	};
	Blockly.JavaScript['file_file_peek'] = function(block) {
	  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
	  return [value_file + '.peek()', Blockly.JavaScript.ORDER_NONE];
	};	
}
