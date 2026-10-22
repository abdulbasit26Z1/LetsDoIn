
var IS_LOCAL_DEVICE = (typeof(device) != 'undefined');

var remoteDevices = {};
var ws;

$(function() {
	remoteConnect();
});

function remoteConnect() {
	var url = 'ws' + window.location.origin.substr(4) + '/websocket';
	ws = new WebSocketRPC(url);
	ws.onopen = function() {
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
		
		updateDevice(remoteDevice);
		return;
	}

	// all following events need a device to exist already
	if (!remoteDevice)
		return;
	
	if (event.eventType == 'deviceOffline') {
		remoteDevice.online = false;
		updateDevice(remoteDevice);
		
	} else if (event.eventType == 'deviceRename') {
		var alias = event.params[1];
		remoteDevice.alias = alias;
		updateDevice(remoteDevice);

	} else if (event.eventType == 'deviceRemoteApi') {
		var api = event.params[1];
		remoteDevice.type = api.type;
		remoteDevice.states = api.states;
		updateDevice(remoteDevice, true);
		
	} else if (event.eventType == 'reportStates') {
		var statesStr = event.params[1];
		var stateValues = statesStr.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
		for (var i=0; i<remoteDevice.states.length; i++) {
			if (remoteDevice.states[i].type == 'string')
				remoteDevice.states[i].value = JSON.parse(stateValues[i]);
			else
				remoteDevice.states[i].value = stateValues[i];
		}
		updateDevice(remoteDevice);
		
	}
}

function updateDevice(remoteDevice, bRemoveFirst) {
	
//	console.log("updateDevice: " + remoteDevice.serialNum);
	
	var deviceDiv = $('#device_' + remoteDevice.serialNum);
	var exists = (deviceDiv.length > 0);
	if (exists && bRemoveFirst) {
		deviceDiv.remove();
		exists = false;
	}
	
	if (!exists) {
		deviceDiv = $('#deviceTemplate').clone();
		deviceDiv.attr('id', 'device_' + remoteDevice.serialNum);
		deviceDiv.css('display', 'inline');
		
		deviceDiv.find('.editNameBtn').click(new Function('showRename("' + remoteDevice.serialNum + '")'));
		
		if (remoteDevice.states.length)
			deviceDiv.find('.deviceStates').html('');
		
		for (var i=0; i<remoteDevice.states.length; i++) {
			var state = remoteDevice.states[i];
			var stateDiv;
			if ((state.type == 'bool') && (!state.controllable)) {
				stateDiv = $('#boolStateTemplate').clone();
			} else if ((state.type == 'bool') && (state.controllable)) {
				stateDiv = $('#boolInputStateTemplate').clone();
				stateDiv.find('.stateValue').click(new Function('toggleBoolState("' + remoteDevice.serialNum + '",' + i + ')'));
			} else if ((state.type == 'number') && (!state.controllable)) {
				stateDiv = $('#numberStateTemplate').clone();
				if (state.unit)
					stateDiv.find('.stateUnit').html(getUnit(state.unit, state.imperialUnit));
			} else if ((state.type == 'number') && (state.controllable)) {
				stateDiv = $('#numberInputStateTemplate').clone();
				if (state.unit)
					stateDiv.find('.stateUnit').html(getUnit(state.unit, state.imperialUnit));
				stateDiv.find('.setStateValue').click(new Function('setNumberState("' + remoteDevice.serialNum + '",' + i + ')'));				
			} else if ((state.type == 'string') && (!state.controllable)) {
				stateDiv = $('#stringStateTemplate').clone();
			} else if ((state.type == 'string') && (state.controllable)) {
				stateDiv = $('#stringInputStateTemplate').clone();
				stateDiv.find('.setStateValue').click(new Function('setStringState("' + remoteDevice.serialNum + '",' + i + ')'));				
			} else if (state.type == 'options') {
				stateDiv = $('#optionsStateTemplate').clone();
				for (var j in state.options) {
					var optionValueDiv = $('#optionStateValueTemplate').clone();
					optionValueDiv.attr('id', 'stateValue_' + remoteDevice.serialNum + '_' + i + '_' + j);
					optionValueDiv.attr('class', 'stateValue' + j);
					optionValueDiv.html(state.options[j]);
					optionValueDiv.css('display', 'inline-block');
					if (state.controllable)
						optionValueDiv.click(new Function('setOptionsState("' + remoteDevice.serialNum + '",' + i + ',"' + j + '")'));
					else
						optionValueDiv.prop('disabled', true);
					optionValueDiv.appendTo(stateDiv.find('.options'));
				}
			} else if (state.type == 'image') {
				stateDiv = $('#imageStateTemplate').clone();
			} else {
			}
			
			stateDiv.attr('id', 'state_' + remoteDevice.serialNum + '_' + i);
			stateDiv.attr('class', 'state' + i);
			stateDiv.find('.stateName').html(state.name);
			stateDiv.css('display', 'block');
			stateDiv.appendTo(deviceDiv.find('.deviceStates'));
		}
	}
		
	deviceDiv.find('.deviceAlias').html(remoteDevice.alias);
	deviceDiv.find('.deviceSerialNum').html(remoteDevice.serialNum);
	deviceDiv.find('.deviceType').html(remoteDevice.type ? remoteDevice.type : '');
	deviceDiv.find('.deviceConnected').css('background', remoteDevice.online ? 'green' : 'red');
	
	for (var i=0; i<remoteDevice.states.length; i++) {
		var state = remoteDevice.states[i];
		var stateDiv = deviceDiv.find('.state' + i);
		if (state.type == 'bool') {
			state.value = parseInt(state.value);
			stateDiv.find('.stateValue').css('background', (state.value == 1) ? 'green' : 'red');
		} else if (state.type == 'number') {
			state.value = parseFloat(state.value);
			if (!state.controllable)
				stateDiv.find('.stateValue').html(getConvertedValue(state.value, state.toImperialConversion, state.decimalDigits));
			else if (!stateDiv.find('.stateValue').is(':focus'))
				stateDiv.find('.stateValue').val(getConvertedValue(state.value, state.toImperialConversion, state.decimalDigits));
		} else if (state.type == 'string') {
			if (!state.controllable)
				stateDiv.find('.stateValue').html(state.value);
			else if (!stateDiv.find('.stateValue').is(':focus'))
				stateDiv.find('.stateValue').val(state.value);
		} else if (state.type == 'options') {
			for (var j in state.options) {
				var optionValueDiv = stateDiv.find('.stateValue' + j);
				if (state.value == j) {
					optionValueDiv.css('background', 'blue');
					optionValueDiv.prop('disabled', true);
				} else {
					optionValueDiv.css('background', 'lightgray');
					if (state.controllable)
						optionValueDiv.prop('disabled', false);
					else
						optionValueDiv.prop('disabled', true);
				}
			}
		} else if (state.type == 'image') {
			stateDiv.find('.stateValue').attr('src', _browser.getLocalImageData(state.value));
			stateDiv.css('height', stateDiv.find('.stateValue')[0].height);
		}
	}
	
	if (!remoteDevice.online) {
		deviceDiv.find('.deviceStates').html('Device is offline.');
	}
	
	if (!exists) {
		deviceDiv.appendTo('#devicesDiv');
		deviceDiv.accordion({ header: "h3", collapsible: true, active:false, heightStyle:"content" });
	}
}

function toggleBoolState(serialNum, stateNum) {
	var remoteDevice = remoteDevices[serialNum];
	if (!remoteDevice)
		return;

	var state = remoteDevice.states[stateNum];
	var value = (state.value == 1) ? 0 : 1;
	
	sendSetState(serialNum, stateNum, value);
}

function setOptionsState(serialNum, stateNum, value) {
	var remoteDevice = remoteDevices[serialNum];
	if (!remoteDevice)
		return;

	var state = remoteDevice.states[stateNum];
	
	sendSetState(serialNum, stateNum, value);
}

function setNumberState(serialNum, stateNum) {
	var remoteDevice = remoteDevices[serialNum];
	if (!remoteDevice)
		return;

	var state = remoteDevice.states[stateNum];
	var valueDiv = $('#state_' + serialNum + '_' + stateNum).find('.stateValue');
	var value = parseFloat(valueDiv.val());
	value = getConvertedValue(value, state.toMetricConversion);
	if (isNaN(valueDiv.val()) || (value < state.minValue) || (value > state.maxValue)) {
		showAlert('Invalid value', 'The entered value is outside of the range of '
			+ getConvertedValue(state.minValue, state.toImperialConversion, state.decimalDigits)
			+ ' and ' + getConvertedValue(state.maxValue, state.toImperialConversion, state.decimalDigits) + '.');
	} else {
		sendSetState(serialNum, stateNum, value);
	}
}

function setStringState(serialNum, stateNum) {
	var remoteDevice = remoteDevices[serialNum];
	if (!remoteDevice)
		return;

	var valueDiv = $('#state_' + serialNum + '_' + stateNum).find('.stateValue');
	var value = valueDiv.val();
	sendSetState(serialNum, stateNum, value);
}

function sendSetState(serialNum, stateNum, value) {
	ws.rpc('setState', [serialNum, stateNum, value], function(data) {
	});
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

function showRename(serialNum) {
	var oldName = $('#files').val();
	if (oldName == null)
		return;

	if (currentDir == fileSystem) {
		var extension = oldName.match(/( \([^\)]+\)$)/)[0];
		var name = oldName.substr(0, oldName.length - extension.length);
		$('#projectTypeDiv').css('display', 'none');
		$('#nameDialogMsg').html('Enter a new project name.');
		$('#newName').val(name);
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 200,
			width: 300,
			modal: true,
			title: 'Rename Project',
			buttons: {
				'Rename': function() {
					var newName = $('#newName').val() + extension;
					if (newName.indexOf(REMOTE_PROJECT_PREFIX) == 0) {
						showAlert('Invalid Name', 'A project name cannot start with "' + REMOTE_PROJECT_PREFIX + '".');
					} else if (currentDir.fileExist(newName)) {
						showAlert('Same Name Exists', 'A project with the same name already exists.');
					} else {
						currentDir.renameFile(oldName, newName, false);
						showFiles(currentDir);
						$(this).dialog('close');
						
						if (!IS_LOCAL_DEVICE)
							remoteRenameFile(currentDir, oldName, newName);
					}
				},
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	} else {
		var extension = oldName.match(/(\.[^\.]+$)/)[0];
		$('#projectTypeDiv').css('display', 'none');
		$('#nameDialogMsg').html('Enter a new file name.');
		$('#newName').val(oldName);
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 200,
			width: 300,
			modal: true,
			title: 'Rename File',
			buttons: {
				'Rename': function() {
					var newName = $('#newName').val();
					if (newName.search(new RegExp(extension + '$')) < 0) {
						showAlert('Cannot Change Extension', 'You cannot change the extension of a file.');
						return;
					}
						
					if (currentDir.fileExist(newName)) {
						showAlert('Same Name Exists', 'A file with the same name already exists.');
					} else {
						currentDir.renameFile(oldName, newName, false);
						showFiles(currentDir);
						$('#files').val(newName);
						$(this).dialog('close');
						
						if (!IS_LOCAL_DEVICE)
							remoteRenameFile(currentDir, oldName, newName);
					}
				},
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	}
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
