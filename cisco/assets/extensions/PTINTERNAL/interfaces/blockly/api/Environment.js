
/*
setContribution                   
removeCumulativeContribution
setTransferenceMultiplier
getTotalContributions
getCumulativeContribution
get
getMetricValue
getValueWithUnit
getUnit
getVolume
setGlobalProperty
getGlobalProperty
hasGlobalProperty
getTimeInSeconds
getElapsedTime
*/
function initBlocklyEnvironment() {

 	Blockly.Blocks['environment_set_contribution'] = {
	  init: function() {
		this.setColour(160);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("environment")
			.appendField('Set environment named')
		this.appendValueInput("rate")
			.appendField('with rate')
			.setCheck("Number");
		this.appendValueInput("limit")
			.appendField('and limit')
			.setCheck("Number");
		this.appendValueInput("bCumulative")
			.appendField('cumulatively')			
			
		this.setInputsInline(true);
	  }
	};
	Blockly.JavaScript['environment_set_contribution'] = function(block) {
	    var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
	  var rate = Blockly.JavaScript.valueToCode(block, 'rate', Blockly.JavaScript.ORDER_ATOMIC);
	  var limit = Blockly.JavaScript.valueToCode(block, 'limit', Blockly.JavaScript.ORDER_ATOMIC);
	  var bCumulative = Blockly.JavaScript.valueToCode(block, 'bCumulative', Blockly.JavaScript.ORDER_ATOMIC);

	  return 'Environment.setContribution(' + env + ', ' + rate + ', ' + limit + ', ' + bCumulative + ');\n';
    };


    Blockly.Blocks['environment_remove_contribution'] = {
        init: function() {
            this.setColour(160);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendValueInput("environment")
			    .appendField('Remove contribution from')
            
            this.setInputsInline(true);
        }
    };
    Blockly.JavaScript['environment_remove_contribution'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return 'Environment.removeCumulativeContribution(' + env + ');\n';
    };


    Blockly.Blocks['environment_set_transference_multiplier'] = {
        init: function() {
            this.setColour(160);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendValueInput("environment")
			    .appendField('Set')
            this.appendValueInput("multiplier")
			    .appendField('with transference multiplier as')
            this.setInputsInline(true);
        }
    };
    Blockly.JavaScript['environment_set_transference_multiplier'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        var multiplier = Blockly.JavaScript.valueToCode(block, 'multiplier', Blockly.JavaScript.ORDER_ATOMIC);
        return 'Environment.setTransferenceMultiplier(' + env + ', ' + multiplier + ');\n';
    }; 
    
    
    
    
    
	
	
    
	Blockly.Blocks['environment_get_total_contributions'] = {
	  init: function() {
		this.setColour(160);
		this.appendValueInput("environment")
			.appendField('Get total contributions for');
		this.setInputsInline(true);
        this.setOutput(true);          
  
	  }
	};
	Blockly.JavaScript['environment_get_total_contributions'] = function(block) {
	    var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
	    return ['Environment.getTotalContributions(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.Blocks['environment_get_cumulative_contributions'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("environment")
			.appendField('Get cumulative contributions for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_cumulative_contributions'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getCumulativeContribution(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.Blocks['environment_get'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("environment")
			.appendField('Get environment value for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.get(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.Blocks['environment_get_metric'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("environment")
			.appendField('Get environment value in metric for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_metric'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getMetricValue(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.Blocks['environment_get_value_with_unit'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("environment")
			.appendField('Get environment value with unit for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_value_with_unit'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getValueWithUnit(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.Blocks['environment_get_unit'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("environment")
			.appendField('Get unit for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_unit'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getUnit(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };


    Blockly.Blocks['environment_get_volume'] = {
        init: function() {
            this.setColour(160);
            this.appendDummyInput()
			    .appendField('Get volume');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_volume'] = function(block) {
        var env = Blockly.JavaScript.valueToCode(block, 'environment', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getVolume(' + env + ')', Blockly.JavaScript.ORDER_NONE];
    };



    Blockly.Blocks['environment_set_global_property'] = {
        init: function() {
            this.setColour(160);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.appendValueInput("property")
			    .appendField('Set global property')
            this.appendValueInput("value")
			    .appendField('with')
            this.setInputsInline(true);
        }
    };
    Blockly.JavaScript['environment_set_global_property'] = function(block) {
        var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
        var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        return 'Environment.setGlobalProperty(' + property + ', ' + value + ');\n';
    };


    Blockly.Blocks['environment_get_global_property'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("property")
			.appendField('Get global property for');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_global_property'] = function(block) {
        var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getGlobalProperty(' + property + ')', Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.Blocks['environment_has_global_property'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("property")
			.appendField('Has global property');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_has_global_property'] = function(block) {
        var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.hasGlobalProperty(' + property + ')', Blockly.JavaScript.ORDER_NONE];
    };



    Blockly.Blocks['environment_get_time_in_seconds'] = {
        init: function() {
            this.setColour(160);
            this.appendDummyInput()
			    .appendField('Get time in seconds');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_time_in_seconds'] = function(block) {
        var property = Blockly.JavaScript.valueToCode(block, 'property', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getTimeInSeconds()', Blockly.JavaScript.ORDER_NONE];
    };

    Blockly.Blocks['environment_get_elapsed_time'] = {
        init: function() {
            this.setColour(160);
            this.appendValueInput("lastTime")
			.appendField('Get elapsed time since');
            this.setInputsInline(true);
            this.setOutput(true);

        }
    };
    Blockly.JavaScript['environment_get_elapsed_time'] = function(block) {
        var lastTime = Blockly.JavaScript.valueToCode(block, 'lastTime', Blockly.JavaScript.ORDER_ATOMIC);
        return ['Environment.getElapsedTime(' + property + ')', Blockly.JavaScript.ORDER_NONE];
    };    
}

