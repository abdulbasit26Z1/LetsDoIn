
var IS_LOCAL_DEVICE = (typeof(device) != 'undefined');

var ws;

var remoteDevices = {};
var rules = [];

$(function() {
	$('#addBtn').click(function() {
		showRuleDialog(null);
	});
	
	$('#addActionBtn').click(function() {
		addAction();
	});

	remoteConnect();
});

function remoteConnect() {
	var url = 'ws' + window.location.origin.substr(4) + '/websocket';
	ws = new WebSocketRPC(url);
	ws.onopen = function() {
		refreshRules();
	};
	
	ws.onclose = function() {
		showAlert('Connection Error', 'Connection to server lost.');
	};
	
	ws.onevent = onRemoteEvent;
}

function onRemoteEvent(event) {
//	console.log(event);

	if (event.eventType == 'keepalive') {
		// do nothing
		return;
	}

	var serialNum = event.params[0];
	var remoteDevice = remoteDevices[serialNum];
	
	if (event.eventType == 'deviceOnline') {
		if (!remoteDevice) {
			var alias = event.params[1];
			remoteDevice = {
				serialNum: serialNum,
				alias: alias,
				online: true,
				type: null,
				states: []
			};
			remoteDevices[serialNum] = remoteDevice;
		} else {
			remoteDevice.online = true;
		}
		return;
	}

	// all following events need a device to exist already
	if (!remoteDevice)
		return;
	
	if (event.eventType == 'deviceOffline') {
		remoteDevice.online = false;
		
	} else if (event.eventType == 'deviceRename') {
		var alias = event.params[1];
		remoteDevice.alias = alias;
		refreshRules();
		
		// if showing rule dialog
		if ($('#ruleDialog').parent().css('display') == 'block') {
			$('.conditionDeviceName option[value="' + serialNum + '"]').text(alias);
			$('.actionDeviceName option[value="' + serialNum + '"]').text(alias);
		}

	} else if (event.eventType == 'deviceRemoteApi') {
		var api = event.params[1];
		remoteDevice.type = api.type;
		remoteDevice.states = api.states;

	}
}

function refreshRules() {
	ws.rpc('getRules', [], function(data) {
		console.log('got rules', data);
		rules = data.rules;
		$('#rules').html('');
		for (var i=0; i<data.rules.length; i++) {
			updateRule(data.rules[i]);
		}
	});
}

function updateRule(rule) {
	
//	console.log("updateRule: ", rule);
	
	rule.id = rule.name.replace(/ /g, '_');
	
	var ruleDiv = $('#rule_' + rule.id);
	var exists = (ruleDiv.length > 0);
	if (!exists) {
		ruleDiv = $('#ruleTemplate').clone();
		ruleDiv.attr('id', 'rule_' + rule.id);
//		ruleDiv.css('display', 'table-row');
		
		ruleDiv.find('.editBtn').click(function() {
			showRuleDialog(rule);
		});
		ruleDiv.find('.removeBtn').click(function() {
			showRemove(rule);
		});
	}
		
	ruleDiv.find('.enabled').html(rule.enabled ? 'Yes' : 'No');
	ruleDiv.find('.name').html(rule.name);
	
//	var ifthen = 'If ' + getConditionString(rule.condition) + '<br/>Then ' + getActionString(rule.actions[0]);
//	ruleDiv.find('.ifthen').html(ifthen);
	ruleDiv.find('.condition').html(getConditionString(rule.condition));
	
	var actionsStr = '';
	for (var i=0; i<rule.actions.length; i++) {
		if (i > 0)
			actionsStr += '<br/>';
		actionsStr += getActionString(rule.actions[i]);
	}
	ruleDiv.find('.actions').html(actionsStr);
	
	if (!exists) {
		ruleDiv.appendTo('#rules');
	}
}

function getDeviceState(serialNum, stateName) {
	var remoteDevice = remoteDevices[serialNum];
	if (!remoteDevice)
		return null;
	for (var i=0; i<remoteDevice.states.length; i++)
		if (remoteDevice.states[i].name == stateName)
			return remoteDevice.states[i];
	return null;
}

function getConditionString(condition) {
	var str = '';
	if (condition.type == 'logicalGroup') {
		if (condition.conditions.length == 1)
			return getConditionString(condition.conditions[0]);
		
/*		for (var i=0; i<condition.conditions.length; i++) {
			if (i > 0)
				str += ' ' + condition.operator + ' ';
			str += '(' + getConditionString(condition.conditions[i]) + ')';
		}*/
		
		str = 'Match ' + ((condition.operator == 'and') ? 'all' : 'any') + ':<ul style="padding-left: 10px; margin-left: 5px">';
		for (var i=0; i<condition.conditions.length; i++) {
			str += '<li>' + getConditionString(condition.conditions[i]) + '</li>';
		}
		str += '</ul>';
		return str;
	}
	
	var remoteDevice = remoteDevices[condition.serialNum];
	var state = null;
	if (remoteDevice) {
		str = remoteDevice.alias;
		state = getDeviceState(condition.serialNum, condition.stateName);
	} else {
		str = condition.serialNum;
	}
	str += ' ' + condition.stateName + ' ';
	
	if (condition.type == 'deviceBoolState') {
		str += 'is ' + (condition.value == '1');
	} else if (condition.type == 'deviceNumberState') {
		if (state && (state.type == 'number')) {
			if (condition.operator == 'between') {
				str += 'is between ' + getConvertedValue(condition.num1, state.toImperialConversion, state.decimalDigits)
					+ ' ' + getUnit(state.unit, state.imperialUnit) + ' and '
					+ getConvertedValue(condition.num2, state.toImperialConversion, state.decimalDigits)
					+ ' ' + getUnit(state.unit, state.imperialUnit);
			} else {
				str += condition.operator + ' ' + getConvertedValue(condition.num1, state.toImperialConversion, state.decimalDigits) + ' ' + getUnit(state.unit, state.imperialUnit);
			}
		} else {
			if (condition.operator == 'between')
				str += 'is between ' + condition.num1 + ' and ' + condition.num2;
			else
				str += condition.operator + ' ' + condition.num1;
		}
	} else if (condition.type == 'deviceStringState') {
		if (condition.operator == 'notContains')
			str += 'not contains "' + condition.value + '"';
		else
			str += condition.operator + ' "' + condition.value + '"';
	} else if (condition.type == 'deviceOptionsState') {
		str += (condition.operator == '=') ? 'is ' : 'is not ';
		if (state && (state.type == 'options'))
			str += state.options[condition.value];
		else
			str += condition.value;
	}
	
	return str;
}

function getActionString(action) {
	var str = 'Set ';
	var remoteDevice = remoteDevices[action.serialNum];
	var state = null;
	if (remoteDevice) {
		str += remoteDevice.alias;
		state = getDeviceState(action.serialNum, action.stateName);
	} else {
		str += action.serialNum;
	}
	
	str += ' ' + action.stateName + ' to ';
	
	if (state) {
		if (state.type == 'bool')
			str += (action.stateValue == '1');
		else if (state.type == 'options')
			str += state.options[action.stateValue];
		else if (state.type == 'string')
			str += '"' + action.stateValue + '"';
		else {
			str += getConvertedValue(action.stateValue, state.toImperialConversion, state.decimalDigits)
				+ ' ' + getUnit(state.unit, state.imperialUnit);
		}
	} else {
		str += action.stateValue;
	}
	
	return str;
}

function getConvertedValue(x, conversion, decimalDigits) {
	if (isNaN(x))
		return 'N/A';
	if (!IS_USING_METRIC && conversion) {
		x = eval(conversion);
	}
	if (decimalDigits >= 0)
		return parseFloat(x).toFixed(decimalDigits);
	return x;
}

function getUnit(metricUnit, imperialUnit) {
	if (!IS_USING_METRIC && imperialUnit)
		return imperialUnit;
	return metricUnit;
}

function showRuleDialog(rule) {

	// check if the condition/action device and state are available
	if (rule) {
		if ((!getDeviceState(rule.condition.serialNum, rule.condition.stateName))
			|| (!getDeviceState(rule.actions[0].serialNum, rule.actions[0].stateName))) {
//			showAlert('Edit Rule Error', 'Cannot edit rule because the condition or action device and state are not online.');
//			return;
		}
	}
	
	// get all available devices
	var conditionDeviceOptions = '';
	for (var i in remoteDevices) {
		var remoteDevice = remoteDevices[i];
		if (remoteDevice.type)
			conditionDeviceOptions += '<option value="' + remoteDevice.serialNum + '">' + remoteDevice.alias + '</option>';
	}
	$('.conditionDeviceName').html(conditionDeviceOptions);
	
	var actionDeviceOptions = '';
	for (var i in remoteDevices) {
		var remoteDevice = remoteDevices[i];
		if (remoteDevice.type) {
			for (var j=0; j<remoteDevice.states.length; j++) {
				if (remoteDevice.states[j].controllable) {
					actionDeviceOptions += '<option value="' + remoteDevice.serialNum + '">' + remoteDevice.alias + '</option>';
					break;
				}
			}
		}
	}
	$('.actionDeviceName').html(actionDeviceOptions);
	
	// reset the others
	$('#rootLogicalGroup').html('');
	$('#actions').html('');

	// open dialog
	$('#ruleDialog').dialog({
		autoOpen: true,
		height: 480,
		width: 600,
		modal: true,
		title: rule ? 'Edit Rule' : 'Add Rule',
		buttons: {
			'OK': function() {
				var newName = $('#newName').val();
				var enabled = $('#enabled').prop('checked');
				
				var condition = getCondition($('#rootLogicalGroup > div'));
				if (condition == null)
					return;
					
				var actions = getActions();
				if (actions == null)
					return;
				
				var params = [];
				if (rule)
					params.push(rule.name);
				params.push({
					name: newName,
					enabled: enabled,
					condition: condition,
					actions: actions
				});
				
				// send it to server
				var dialog = this;
				ws.rpc(rule ? 'editRule' : 'addRule', params, function(data) {
					if (data.done) {
						refreshRules();
						$(dialog).dialog('close');
					} else {
						showAlert('Error', data.error);
					}
				});
			},
			'Cancel': function() {
				$(this).dialog('close');
			}
		}
	});
	
	if (!rule) {
		$('#newName').val('');
		$('#enabled').prop('checked', true);

		addLogicalGroup($('#rootLogicalGroup'), false);
		
		addAction();

//		$('.conditionDeviceName').prop('selectedIndex', -1);
//		$('.actionDeviceName').prop('selectedIndex', -1);
	} else {
		// populate edit
		$('#newName').val(rule.name);
		$('#enabled').prop('checked', rule.enabled);
		
		if (!loadCondition(rule.condition, $('#rootLogicalGroup'), false)) {
			$('#ruleDialog').dialog('close');
			showAlert('Edit Rule Error', 'Cannot edit rule because the conditions devices are not online.');
			return;
		}
		
		if (!loadActions(rule.actions)) {
			$('#ruleDialog').dialog('close');
			showAlert('Edit Rule Error', 'Cannot edit rule because the actions devices are not online.');
			return;
		}
	}
}

function addLogicalGroup(parentDiv, canRemove) {
	var groupDiv = $('#logicalGroupConditionTemplate').clone();
	groupDiv.css('display', 'block');
	groupDiv.attr('id', 'logicalGroup');
	
	groupDiv.children().children('.addGroupBtn').click(function() {
		addLogicalGroup(groupDiv, true);
	});
	
	groupDiv.children().children('.addConditionBtn').click(function() {
		addCondition(groupDiv);
	});
	
	if (canRemove) {
		groupDiv.css('margin-left', '20px');
		groupDiv.children().children('.removeConditionBtn').click(function() {
			groupDiv.remove();
		});
	} else {
		groupDiv.children().children('.removeConditionBtn').css('display', 'none');
	}
	
	var conditionsDiv = parentDiv.children('.conditions');
	if (conditionsDiv.length > 0)
		conditionsDiv.append(groupDiv);
	else
		parentDiv.append(groupDiv);

	addCondition(groupDiv);
	
	return groupDiv;
}

function addCondition(parentDiv) {
	var conditionDiv = $('#conditionTemplate').clone();
	conditionDiv.attr('id', '_condition');
	conditionDiv.css('display', 'block');
	
	var deviceNameDiv = conditionDiv.find('.conditionDeviceName');
	var stateNameDiv = conditionDiv.find('.conditionStateName');
	var detailsParentDiv = conditionDiv.find('.details');
	
	deviceNameDiv.change(function() {
		var serialNum = deviceNameDiv.val();
		var remoteDevice = remoteDevices[serialNum];
		var conditionStateOptions = '';
		for (var i=0; i<remoteDevice.states.length; i++) {
			if (remoteDevice.states[i].type != 'image')
				conditionStateOptions += '<option value="' + remoteDevice.states[i].name + '">' + remoteDevice.states[i].name + '</option>';
		}
		stateNameDiv.html(conditionStateOptions);
		stateNameDiv.prop('selectedIndex', -1);
		detailsParentDiv.html('');
	});
	
	stateNameDiv.change(function() {
		detailsParentDiv.html('');
		
		var serialNum = deviceNameDiv.val();
		var stateName = stateNameDiv.val();
		var state = getDeviceState(serialNum, stateName);
		
		var detailsDiv;
		if (state.type == 'bool') {
			detailsDiv = $('#deviceBoolStateConditionTemplate').clone();
		} else if (state.type == 'number') {
			detailsDiv = $('#deviceNumberStateConditionTemplate').clone();
			detailsDiv.find('.stateUnit').html(getUnit(state.unit, state.imperialUnit));
			detailsDiv.find('.operator').change(function() {
				detailsDiv.find('.num2Div').css('display', (detailsDiv.find('.operator').val() == 'between') ? 'inline' : 'none');
			});
		} else if (state.type == 'string') {
			detailsDiv = $('#deviceStringStateConditionTemplate').clone();
		} else if (state.type == 'options') {
			detailsDiv = $('#deviceOptionsStateConditionTemplate').clone();
			
			var optionsStateOptions = '';
			for (var i in state.options) {
				optionsStateOptions += '<option value="' + i + '">' + state.options[i] + '</option>';
			}
			detailsDiv.find('.stateValue').html(optionsStateOptions);
		}

		detailsDiv.attr('id', 'deviceStateCondition');
		detailsDiv.css('display', 'inline');
		detailsParentDiv.append(detailsDiv);
	});
	
	conditionDiv.find('.removeConditionBtn').click(function() {
		conditionDiv.remove();
	});
	
	parentDiv.children('.conditions').append(conditionDiv);

	// change it after it's shown
	deviceNameDiv.prop('selectedIndex', -1);
	
	return conditionDiv;
}

function getCondition(conditionDiv) {
	var condition = {};
	if (conditionDiv.attr('logicalGroup')) {
		condition.type = 'logicalGroup';
		condition.operator = conditionDiv.children('.operator').val();
		
		condition.conditions = [];
		var children = conditionDiv.children('.conditions').children();
		if (children.length == 0) {
			showAlert('Error', 'Incomplete condition.');
			return null;
		}
		
		for (var i=0; i<children.length; i++) {
			var childCondition = getCondition($(children[i]));
			if (childCondition == null)
				return null;
			condition.conditions.push(childCondition);
		}
	} else {
		var detailsDiv = conditionDiv.find('.conditionDetails');
		if (detailsDiv.length == 0) {
			showAlert('Error', 'Incomplete condition.');
			return null;
		}
			
		condition.type = detailsDiv.attr('stateType');
		condition.serialNum = conditionDiv.children('.conditionDeviceName').val();
		condition.stateName = conditionDiv.children('.conditionStateName').val();
		var conditionState = getDeviceState(condition.serialNum, condition.stateName);

		// get the condition
		if (condition.type == 'deviceBoolState') {
			condition.value = detailsDiv.find('.stateValue').val();
		} else if (condition.type == 'deviceNumberState') {
			condition.operator = detailsDiv.find('.operator').val();
			condition.num1 = getConvertedValue(parseFloat(detailsDiv.find('.num1').val()), conditionState.toMetricConversion);
			if (condition.operator == 'between')
				condition.num2 = getConvertedValue(parseFloat(detailsDiv.find('.num2').val()), conditionState.toMetricConversion);
			else
				condition.num2 = condition.num1;
				
			if (isNaN(condition.num1) || isNaN(condition.num2) || (condition.num1 > condition.num2)) {
				showAlert('Error', 'Invalid number input.');
				return null;
			}
		} else if (condition.type == 'deviceStringState') {
			condition.operator = detailsDiv.find('.operator').val();
			condition.value = detailsDiv.find('.stateValue').val();
		} else if (condition.type == 'deviceOptionsState') {
			condition.operator = detailsDiv.find('.operator').val();
			condition.value = detailsDiv.find('.stateValue').val();
		}
	}
	
	return condition;
}

function loadCondition(condition, parentDiv, canRemove) {
	var conditionDiv;
	if (condition.type == 'logicalGroup') {
		conditionDiv = addLogicalGroup(parentDiv, canRemove);
		conditionDiv.children('.operator').val(condition.operator);
		
		conditionDiv.children('.conditions').html('');
		for (var i=0; i<condition.conditions.length; i++) {
			if (!loadCondition(condition.conditions[i], conditionDiv, true))
				return false;
		}
	} else {
		var conditionState = getDeviceState(condition.serialNum, condition.stateName);
		if (conditionState == null)
			return false;

		conditionDiv = addCondition(parentDiv);

		// set condition device and state
		conditionDiv.children('.conditionDeviceName').val(condition.serialNum);
		conditionDiv.children('.conditionDeviceName').change();
		conditionDiv.children('.conditionStateName').val(condition.stateName);
		conditionDiv.children('.conditionStateName').change();		
		
		// set condition state type
		if (condition.type == 'deviceBoolState') {
			conditionDiv.find('.stateValue').val(condition.value);
		} else if (condition.type == 'deviceNumberState') {
			conditionDiv.find('.operator').val(condition.operator);
			conditionDiv.find('.operator').change();
			conditionDiv.find('.num1').val(getConvertedValue(condition.num1, conditionState.toImperialConversion, conditionState.decimalDigits));
			conditionDiv.find('.num2').val(getConvertedValue(condition.num2, conditionState.toImperialConversion, conditionState.decimalDigits));
		} else if (condition.type == 'deviceStringState') {
			conditionDiv.find('.operator').val(condition.operator);
			conditionDiv.find('.stateValue').val(condition.value);
		} else if (condition.type == 'deviceOptionsState') {
			conditionDiv.find('.operator').val(condition.operator);
			conditionDiv.find('.stateValue').val(condition.value);
		}
	}
	
	return true;
}

function addAction() {
	var actionDiv = $('#actionTemplate').clone();
	actionDiv.attr('id', '_action');
	actionDiv.css('display', 'block');
	
	var deviceNameDiv = actionDiv.find('.actionDeviceName');
	var stateNameDiv = actionDiv.find('.actionStateName');
	var detailsParentDiv = actionDiv.find('.details');
	
	deviceNameDiv.change(function() {
		var serialNum = deviceNameDiv.val();
		var remoteDevice = remoteDevices[serialNum];
		var actionStateOptions = '';
		for (var i=0; i<remoteDevice.states.length; i++) {
			if (remoteDevice.states[i].controllable)
				actionStateOptions += '<option value="' + remoteDevice.states[i].name + '">' + remoteDevice.states[i].name + '</option>';
		}
		stateNameDiv.html(actionStateOptions);
		stateNameDiv.prop('selectedIndex', -1);
		detailsParentDiv.html('');
	});
	
	stateNameDiv.change(function() {
		detailsParentDiv.html('');
		
		var serialNum = deviceNameDiv.val();
		var stateName = stateNameDiv.val();
		var state = getDeviceState(serialNum, stateName);
		
		var detailsDiv;
		if (state.type == 'bool') {
			detailsDiv = $('#deviceBoolStateActionTemplate').clone();
		} else if (state.type == 'number') {
			detailsDiv = $('#deviceNumbersStateActionTemplate').clone();
			detailsDiv.find('.stateUnit').html(getUnit(state.unit, state.imperialUnit));
		} else if (state.type == 'string') {
			detailsDiv = $('#deviceStringStateActionTemplate').clone();
		} else if (state.type == 'options') {
			detailsDiv = $('#deviceOptionsStateActionTemplate').clone();
			
			var optionsStateOptions = '';
			for (var i in state.options) {
				optionsStateOptions += '<option value="' + i + '">' + state.options[i] + '</option>';
			}
			detailsDiv.find('.stateValue').html(optionsStateOptions);
		}

		detailsDiv.attr('id', 'deviceStateAction');
		detailsDiv.css('display', 'inline');
		detailsParentDiv.append(detailsDiv);
	});
	
	actionDiv.find('.removeActionBtn').click(function() {
		actionDiv.remove();
	});
	
	$('#actions').append(actionDiv);

	// change it after it's shown
	deviceNameDiv.prop('selectedIndex', -1);
	
	return actionDiv;
}

function getActions() {
	var actions = [];

	var children = $('#actions').children();
	if (children.length == 0) {
		showAlert('Error', 'Incomplete actions.');
		return null;
	}
		
	for (var i=0; i<children.length; i++) {
		var actionDiv = $(children[i]);
		var detailsDiv = actionDiv.find('.details');
		if (detailsDiv.children().length == 0) {
			showAlert('Error', 'Incomplete actions.');
			return null;
		}
		
		var action = {};
		action.type = 'deviceState';
		action.serialNum = actionDiv.children('.actionDeviceName').val();
		action.stateName = actionDiv.children('.actionStateName').val();
		action.stateValue = actionDiv.find('.stateValue').val();
		
		var state = getDeviceState(action.serialNum, action.stateName);
		if (state == null)
			return null;
			
		if (state.type == 'number') {
			action.stateValue = getConvertedValue(parseFloat(action.stateValue), state.toMetricConversion);
			if (isNaN(action.stateValue) || (action.stateValue < state.minValue) || (action.stateValue > state.maxValue)) {
				showAlert('Error', 'The entered value is outside of the range of '
					+ getConvertedValue(state.minValue, state.toImperialConversion, state.decimalDigits)
					+ ' and ' + getConvertedValue(state.maxValue, state.toImperialConversion, state.decimalDigits) + '.');
				return null;
			}
		}
		
		actions.push(action);
	}

	return actions;
}

function loadActions(actions) {
	for (var i=0; i<actions.length; i++) {
		var action = actions[i];
		var actionDiv = addAction();
		
		var actionState = getDeviceState(action.serialNum, action.stateName);
		if (actionState == null)
			return false;
			
		// set action device and state
		actionDiv.find('.actionDeviceName').val(action.serialNum);
		actionDiv.find('.actionDeviceName').change();
		actionDiv.find('.actionStateName').val(action.stateName);
		actionDiv.find('.actionStateName').change();
		
		if (actionState.type == 'number')
			actionDiv.find('.stateValue').val(getConvertedValue(action.stateValue, actionState.toImperialConversion, actionState.decimalDigits));
		else
			actionDiv.find('.stateValue').val(action.stateValue);
	}
	
	return true;
}

function showRemove(rule) {
	showConfirm('Remove Rule', 'Are you sure you want to remove<br/>' + rule.name + '?', {
		'Yes': function() {
			ws.rpc('removeRule', [rule.name], function(data) {
				refreshRules();
			});
			$(this).dialog('close');
		},
		'No': function() {
			$(this).dialog('close');
		}
	});
}

function showAlert(title, msg, buttons, options) {
	buttons = buttons || {
		'OK': function() {
			$(this).dialog('close');
		}
	};
	
	$('#alertMsg').html(msg);
	$('#alertDialog').dialog($.extend({}, {
		autoOpen: true,
		height: 'auto',
		width: 'auto',
		position: { my: "center", at: "center", of: window },
		modal: true,
		title: title,
		buttons: buttons
	}, options));
}

function showConfirm(title, msg, buttons, options) {
	buttons = buttons || {
		'OK': function() {
			$(this).dialog('close');
		}
	};
	
	$('#confirmMsg').html(msg);
	$('#confirmDialog').dialog($.extend({}, {
		autoOpen: true,
		height: 'auto',
		width: 'auto',
		position: { my: "center", at: "center", of: window },
		modal: true,
		title: title,
		buttons: buttons
	}, options));
}
