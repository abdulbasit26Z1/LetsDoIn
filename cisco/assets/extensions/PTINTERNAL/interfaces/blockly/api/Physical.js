
function initBlocklyPhysical() {



	Blockly.Blocks['physical_addSound'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("soundPath")
			.appendField('Add sound');
		this.appendValueInput("soundID")
			.appendField('with path');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_addSound'] = function(block) {
	  var soundID = Blockly.JavaScript.valueToCode(block, 'soundID', Blockly.JavaScript.ORDER_ATOMIC);
	  var soundPath = Blockly.JavaScript.valueToCode(block, 'soundPath', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'addSound(' + soundPath + ', ' + soundID + ')\n';
	};   


	Blockly.Blocks['physical_playSound'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("soundID")
			.appendField('Play sound');
		this.appendValueInput("duration")
			.appendField('this many times');
		this.setInputsInline(true);
	  }
	};
	
	Blockly.JavaScript['physical_playSound'] = function(block) {
	  var soundID = Blockly.JavaScript.valueToCode(block, 'soundID', Blockly.JavaScript.ORDER_ATOMIC);
	  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'playSound(' + soundID + ', ' + duration + ')\n';
	};   
	
	Blockly.Blocks['physical_stopSound'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("soundID")
			.appendField('Stop sound');
		this.setInputsInline(true);
	  }
	};
	
	Blockly.JavaScript['physical_stopSound'] = function(block) {
	  var soundID = Blockly.JavaScript.valueToCode(block, 'soundID', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'stopSound(' + soundID + ');\n';
	};   

	Blockly.Blocks['physical_destroySounds'] = {
	  init: function() {
		this.setColour(230);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput()
			.appendField('Destroy sounds');
	  }
	};
	Blockly.JavaScript['physical_destroySounds'] = function(block) {
	  return 'destroySounds();\n';
	};
	
	Blockly.Blocks['physical_move'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("x")
			.appendField('Move to position x')
            .setCheck("Number");
		this.appendValueInput("y")
			.appendField('and y')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_move'] = function(block) {
	  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
	  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'move(' + x + ', ' + y + ');\n';
	};

	Blockly.Blocks['physical_moveBy'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("x")
			.appendField('Move by x')
            .setCheck("Number");
		this.appendValueInput("y")
			.appendField('and y')
			.setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_moveBy'] = function(block) {
	  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
	  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'moveBy(' + x + ', ' + y + ');\n';
	};    
    
	Blockly.Blocks['physical_getX'] = {
	  init: function() {
		this.setColour(160);
		this.appendDummyInput()
			.appendField('get x position');
        this.setOutput(true);          
	  }
	};
	Blockly.JavaScript['physical_getX'] = function(block) {
        return ['getX()', Blockly.JavaScript.ORDER_NONE];
	};    
    
	Blockly.Blocks['physical_getY'] = {
	  init: function() {
		this.setColour(160);
		this.appendDummyInput()
			.appendField('get y position');
        this.setOutput(true);          
	  }
	};
	Blockly.JavaScript['physical_getY'] = function(block) {
        return ['getY()', Blockly.JavaScript.ORDER_NONE];
	};        
    
	Blockly.Blocks['physical_devicesAt'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("x")
			.appendField('Get devices at position x')
            .setCheck("Number");
		this.appendValueInput("y")
			.appendField('y')
			.setCheck("Number");
		this.appendValueInput("w")
			.appendField('inside width')
			.setCheck("Number");
        this.appendValueInput("h")
			.appendField('and height')
			.setCheck("Number");      
		this.setInputsInline(true);
        this.setOutput(true);          

	  }
	};
	Blockly.JavaScript['physical_devicesAt'] = function(block) {
	  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
	  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
	  var w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
      var h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC); 
      return ['devicesAt(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + 'false' +')', Blockly.JavaScript.ORDER_NONE];

	};    
    
    Blockly.Blocks['physical_getName'] = {
	  init: function() {
		this.setColour(160);
		this.appendDummyInput()
			.appendField('get name');
        this.setOutput(true);          
	  }
	};
	Blockly.JavaScript['physical_getName'] = function(block) {
        return ['getName()', Blockly.JavaScript.ORDER_NONE];
	};    
    
	Blockly.Blocks['physical_getDeviceProperty'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("property")
			.appendField('Get property');
		this.appendValueInput("deviceName")
			.appendField('from device named');
		this.setInputsInline(true);
        this.setOutput(true);          
  
	  }
	};
	Blockly.JavaScript['physical_getDeviceProperty'] = function(block) {
	  var deviceName = Blockly.JavaScript.valueToCode(block, 'deviceName', Blockly.JavaScript.ORDER_ATOMIC);
	  var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);   
      return ['getDeviceProperty(' + deviceName + ', ' + property + ')', Blockly.JavaScript.ORDER_NONE];
	};  
    

	Blockly.Blocks['physical_setDeviceProperty'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("property")
			.appendField('Set property');
		this.appendValueInput("deviceName")
			.appendField('on device named');
		this.appendValueInput("value")
			.appendField('with value');
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_setDeviceProperty'] = function(block) {
	  var deviceName = Blockly.JavaScript.valueToCode(block, 'deviceName', Blockly.JavaScript.ORDER_ATOMIC);
	  var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
	  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	  return 'setDeviceProperty(' + deviceName + ', ' + property + ', ' + value + ')\n';
	};    
    

	Blockly.Blocks['physical_setComponentOpacity'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("componentName")
			.appendField('Set opacity of component');
		this.appendValueInput("value")
			.appendField('to')
            .setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_setComponentOpacity'] = function(block) {
	  var componentName = Blockly.JavaScript.valueToCode(block, 'componentName', Blockly.JavaScript.ORDER_ATOMIC);
	  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);   
      return 'setComponentOpacity(' + componentName + ', ' + value + ')\n';
	};     
    
	Blockly.Blocks['physical_setComponentRotation'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("componentName")
			.appendField('Set rotation of component');
		this.appendValueInput("value")
			.appendField('to')
            .setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_setComponentRotation'] = function(block) {
	  var componentName = Blockly.JavaScript.valueToCode(block, 'componentName', Blockly.JavaScript.ORDER_ATOMIC);
	  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);   
      return 'setComponentRotation(' + componentName + ', ' + value + ')\n';
	};      
    
	Blockly.Blocks['physical_setRotation'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("value")
			.appendField('Set rotation to')
            .setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_setRotation'] = function(block) {
	  var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);   
      return 'setRotation(' + value + ')\n';
	};       

    Blockly.Blocks['physical_getSerialNumber'] = {
	  init: function() {
		this.setColour(160);
		this.appendDummyInput()
			.appendField('get serial number');
        this.setOutput(true);          
	  }
	};
	Blockly.JavaScript['physical_getSerialNumber'] = function(block) {
        return ['getSerialNumber()', Blockly.JavaScript.ORDER_NONE];
	};    
        
    
	Blockly.Blocks['physical_setCustomText'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("text")
			.appendField('Write text');                
		this.appendValueInput("x")
			.appendField('on position x')
            .setCheck("Number");
		this.appendValueInput("y")
			.appendField('y')
            .setCheck("Number");
		this.appendValueInput("w")
			.appendField('with width')
            .setCheck("Number");
		this.appendValueInput("h")
			.appendField('and height')
            .setCheck("Number");
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['physical_setCustomText'] = function(block) {
	  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
	  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
	  var w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
      var h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC); 
      var text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC); 
      return 'setCustomText(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + text + ')\n';
    };

    Blockly.Blocks['physical_moveItemInWorkspace'] = {
        init: function() {
            this.setColour(160);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendValueInput("itemName")
			.appendField('Move item with name')            
            this.appendValueInput("x")
			.appendField('to position x')
            .setCheck("Number");
            this.appendValueInput("y")
			.appendField('and y')
			.setCheck("Number");
            this.setInputsInline(true);
        }
    };
    Blockly.JavaScript['physical_moveItemInWorkspace'] = function(block) {
        var name = Blockly.JavaScript.valueToCode(block, 'itemName', Blockly.JavaScript.ORDER_ATOMIC);
        var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        return 'moveItemInWorkspace(' + name + ',' + x + ', ' + y + ');\n';
    };	
	       
}

