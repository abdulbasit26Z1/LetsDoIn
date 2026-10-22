var fileSystem;
var currentDir;
var currentFile;
var textEditor;
var fileTextEditorSettings = {};
var isSplitPaneInit = false;

var IS_REMOTE = (typeof(device) == 'undefined');
var IS_IOX_IDE = (typeof(IS_IOX_IDE) != 'undefined');
var IS_DESKTOP_APP = (typeof(IS_DESKTOP_CUSTOM_APP) != 'undefined');
var IS_LOCAL_DEVICE = !IS_REMOTE && !IS_DESKTOP_APP && !IS_IOX_IDE;
var REMOTE_PROJECT_PREFIX = '[REMOTE] ';
var USB_PROJECT_PREFIX = '[USB] ';

var remoteDevices = {};

$(function() {

    $('#files').dblclick(openFile);
    $('#files').change(onFileSelectorChanged);
    $('#open').click(openFile);
    $('#add').click(showAdd);
    $('#remove').click(showRemove);
    $('#rename').click(showRename);
    $('#run').click(runProject);
    $('#stop').click(stopProject);
    $('#clearOutputs').click(function() {
        if (IS_LOCAL_DEVICE) {
            device.clearSerialOutputs();
        } else {
            var serialNum = $('#remoteDevice').val();
            var remoteDevice = remoteDevices[serialNum];
            if (remoteDevice) {
                remoteDevice.outputs = '';
                $('#serialOutputs').val(remoteDevice.outputs);
            }
        }
    });
    $('#help').click(help);
    $(document).keydown(function(key) {
        if (key.which == 112)
            help();
    });

    $('#reload').click(function() {
        var undoMgr = textEditor.getSession().getUndoManager();
        while (undoMgr.hasUndo())
            undoMgr.undo(false);
    });
    $('#zoom_in').click(function() {
        if (textEditor != null) {
            var currentFontSize = $('#textEditor').css('font-size');
            var aceFontSize = $('.ace_search').css('font-size');
            currentFontSize = parseInt(currentFontSize) + 1;
            if (currentFontSize > 25)
                currentFontSize = 25;
            $('#textEditor').css('font-size', currentFontSize + 'px');
            $('.ace_search').css('font-size', aceFontSize);
        }
    });
    $('#zoom_out').click(function() {
        if (textEditor != null) {
            var currentFontSize = $('#textEditor').css('font-size');
            var aceFontSize = $('.ace_search').css('font-size');
            currentFontSize = parseInt(currentFontSize) - 1;
            if (currentFontSize < 8)
                currentFontSize = 8;
            $('#textEditor').css('font-size', currentFontSize + 'px');
            $('.ace_search').css('font-size', aceFontSize);      
        }
    });
    $('#copy').click(function() {
        if (IS_REMOTE)
            _browser.setClipboardText(textEditor.getCopyText());
        else
            ipc.appWindow().setClipboardText(textEditor.getCopyText());
    });
    $('#paste').click(function() {
        if (IS_REMOTE)
            textEditor.insert(_browser.getClipboardText());
        else
            textEditor.insert(ipc.appWindow().getClipboardText());
    });
    $('#undo').click(function() {
        textEditor.undo();
    });
    $('#redo').click(function() {
        textEditor.redo();
    });
    $('#find').click(function() {
        textEditor.execCommand("find");
    });
    $('#replace').click(function() {
        textEditor.execCommand("replace");
    });
    $('#textEditorToolBar').css('display', 'none');
    /*	$('#reload').attr('disabled', true);
    $('#zoom_in').attr('disabled', true);
    $('#zoom_out').attr('disabled', true);
    $('#undo').attr('disabled', true);
    $('#redo').attr('disabled', true);
    $('#find').attr('disabled', true);
    $('#replace').attr('disabled', true);
    */

    $('#serialInputs').keypress(function(event) {
        if (event.which == 13) {
            processInputs();
            event.preventDefault();
        }
    });

    $('#toolbox').load('blockly/api/toolbox.txt', function() {
        // open the file if it was saved before
        if (IS_LOCAL_DEVICE && device.hasCustomVar('PROGRAMMING_CURRENT_DIR')) {
            var dirName = device.getCustomVarStr('PROGRAMMING_CURRENT_DIR');
            var fileName = device.getCustomVarStr('PROGRAMMING_CURRENT_FILE')
            $('#files').val(dirName);
            onFileSelectorChanged();
            if ($('#files').val() == dirName) {
                openFile();
                if (fileName) {
                    $('#files').val(fileName);
                    onFileSelectorChanged();
                    if ($('#files').val() == fileName) {
                        openFile();
                    }
                }
            }
        }
    });

    if (IS_LOCAL_DEVICE || IS_DESKTOP_APP) {
        $('#stop').css('display', 'none');
        fileSystem = device.getProcess("FileManager").getFileSystem("Dev:");
        showFiles(fileSystem);
        if (IS_LOCAL_DEVICE)
            clearSerialOutputs();
    }

    if (IS_DESKTOP_APP) {
        var usbCount = device.getUsbPortCount();
        for (var i = 0; i < usbCount; i++) {
            var usbPort = device.getUsbPortAt(i);
            usbPort.getController().setSerialMonitoring(true);
            onRemoteEvent({
                eventType: 'deviceOnline',
                params: [usbPort.getName(), usbPort.getName()]
            });
        }
    }

    if (IS_REMOTE || IS_DESKTOP_APP) {
        $('#remoteDevice').css('display', 'inline');
        $('#remoteDevice').change(function() {
            changeRemoteDevice(this.value);
        });
    }

    if (IS_REMOTE) {
        $('#navigation').css('display', 'block');
        //		$('#split-pane-divider').css('top', '40px');
        //		$('#contentsSplitPane').css('top', '42px');

        //		remoteRefresh();
        remoteConnect();
    }

    //	$('div.split-pane').splitPane();
});

//HACK: need init the split pane when anywhere on the page is first clicked
// when the split pane is init in body load, it doesn't display correctly
function initSplitPane() {
	$('html').unbind('click', initSplitPane);
	$('div.split-pane').splitPane();
}
$('html').bind('click', initSplitPane);


$(window).unload(function() {
	saveCurrentFile();
	
	// save so next time can open to same one
	if (IS_LOCAL_DEVICE) {
		if (currentDir != fileSystem)
			device.addCustomVar('PROGRAMMING_CURRENT_DIR', currentDir.getName());
		else
			device.removeCustomVar('PROGRAMMING_CURRENT_DIR');
		
		if (currentFile)
			device.addCustomVar('PROGRAMMING_CURRENT_FILE', currentFile.getName());
		else
			device.removeCustomVar('PROGRAMMING_CURRENT_FILE');
	}
	else if (IS_DESKTOP_APP) {
		var usbCount = device.getUsbPortCount();
		for (var i=0; i<usbCount; i++) {
			var usbPort = device.getUsbPortAt(i);
			usbPort.getController().setSerialMonitoring(false);
		}
	}
});

var ws;

function remoteConnect() {
	var url = 'ws' + window.location.origin.substr(4) + '/websocket';
	ws = new WebSocketRPC(url);
	ws.onopen = function() {
		remoteRefresh();
	};
	
	ws.onclose = function() {
		showAlert('Connection Error', 'Connection to server lost.');
	};
	
	ws.onevent = onRemoteEvent;
}

function onRemoteEvent(event) {
	if (event.eventType == 'deviceOnline') {
		var serialNum = event.params[0];
		var alias = event.params[1];
		var remoteDevice = remoteDevices[serialNum];
		if (!remoteDevice) {
			remoteDevice = {
				serialNum: serialNum,
				alias: alias,
				online: true,
				outputs: ''
			};
			remoteDevices[serialNum] = remoteDevice;
			
			$('#remoteDevice').append('<option value="' + serialNum + '">' + alias + '</option>');
		} else {
			remoteDevice.online = true;
			appendOutputsToDevice(serialNum, '** Device came online.\n');
		}
		
	} else if (event.eventType == 'deviceOffline') {
		var serialNum = event.params[0];
		var remoteDevice = remoteDevices[serialNum];
		if (remoteDevice) {
			remoteDevice.online = false;
			appendOutputsToDevice(serialNum, '** Device went offline.\n');
		}
		
	} else if (event.eventType == 'deviceRename') {
		var serialNum = event.params[0];
		var alias = event.params[1];
		var remoteDevice = remoteDevices[serialNum];
		if (remoteDevice) {
			remoteDevice.alias = alias;
			$('#remoteDevice option[value="' + serialNum + '"]').text(alias);
		}

	} else if (event.eventType == 'deviceOutputs') {
		var serialNum = event.params[0];
		var outputs = event.params[1];
		appendOutputsToDevice(serialNum, outputs);

	} else if (event.eventType == 'keepalive') {
		// do nothing
	}
}

function changeRemoteDevice(serialNum) {
	var remoteDevice = remoteDevices[serialNum];
	if (remoteDevice) {
		$('#serialOutputs').val(remoteDevice.outputs);
	}
}

function appendOutputsToDevice(serialNum, outputs) {
	var remoteDevice = remoteDevices[serialNum];
	if (remoteDevice) {
		remoteDevice.outputs += outputs;
		
		// cut output buffer to 4000 chars after hitting 10000
		if (remoteDevice.outputs.length > 10000) {
			var nIndex = remoteDevice.outputs.indexOf('\n', 4000);
			if (nIndex >= 0)
				remoteDevice.outputs = remoteDevice.outputs.substr(nIndex);
			else
				remoteDevice.outputs = remoteDevice.outputs.substr(4000);
		}
		
		if ($('#remoteDevice').val() == serialNum) {
			updateSerialOutputs(outputs);
		}
	}
}

function remoteRefresh() {
	ws.rpc('getFiles', null, function(data) {
		fileSystem = data;
		initRemoteFile(fileSystem);

		showFiles(fileSystem);
	});
/*	$.getJSON('/get_files.php')
	.done(function(data) {
		fileSystem = data;
		initRemoteFile(fileSystem);

		showFiles(fileSystem);
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function initRemoteFile(file) {
	file.getName = function() {
		return this.name;
	};

	if (file.files) {
		file.fileExist = function(name) {
			for (var i=0; i<this.files.length; i++) {
				if (this.files[i].name == name)
					return true;
			}
			return false;
		};
		file.getFile = function(name) {
			for (var i=0; i<this.files.length; i++) {
				if (this.files[i].name == name)
					return this.files[i];
			}
			return null;
		};
		file.getFileCount = function() {
			return this.files.length;
		};
		file.getFileAt = function(i) {
			return this.files[i];
		};
		file.addDirectory = function(name) {
			var newDir = {name:name, files:[]};
			this.files.push(newDir);
			initRemoteFile(newDir);
		};
		file.addTextFile = function(name, content) {
			var newFile = {name:name, content:content};
			this.files.push(newFile);
			initRemoteFile(newFile);
		};
		file.removeFile = function(name) {
			for (var i=0; i<this.files.length; i++) {
				if (this.files[i].name == name)
					this.files.splice(i, 1);
			}
		}
		file.renameFile = function(oldName, newName) {
			for (var i=0; i<this.files.length; i++) {
				if (this.files[i].name == oldName)
					this.files[i].name = newName;
			}
		}
		
		for (var i=0; i<file.files.length; i++) {
			initRemoteFile(file.files[i]);
		}
	} else {
		file.getContent = function() {
			return {text:this.content};
		};
		file.setTextContent = function(content) {
			this.content = content;
		};
	}
}

function remoteCreateProject(dir) {
	ws.rpc('createProject', [dir.getName(), dir.files], function(data) {
		if (data.done) {
			showFiles(dir);
		} else {
			showAlert('Error', data.error);
			fileSystem.removeFile(dir.getName());
			showFiles(fileSystem);
		}
	});
/*	
	var url = '/create_project.php?projectName=' + encodeURIComponent(dir.getName())
		+ '&files=' + encodeURIComponent(JSON.stringify(dir.files));

	$.getJSON(url)
	.done(function(data) {
		if (data.done) {
			showFiles(dir);
		} else {
			showAlert('Error', data.error);
			fileSystem.removeFile(dir.getName());
			showFiles(fileSystem);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteCreateFile(projectName, fileName) {
	ws.rpc('createFile', [projectName, fileName], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	});
	
/*	var url = '/create_file.php?projectName=' + encodeURIComponent(projectName)
		+ '&fileName=' + encodeURIComponent(fileName);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteSaveFile(projectName, fileName, content) {
	ws.rpc('saveFile', [projectName, fileName, content], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	});

/*	var url = '/save_file.php?projectName=' + encodeURIComponent(projectName)
		+ '&fileName=' + encodeURIComponent(fileName)
		+ '&content=' + encodeURIComponent(content);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteRemoveFile(projectName, fileName) {
	ws.rpc('removeFile', [projectName, fileName], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	});

/*	var url = '/remove_file.php?projectName=' + encodeURIComponent(projectName)
		+ '&fileName=' + encodeURIComponent(fileName);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteRenameFile(dir, oldName, newName) {
	ws.rpc('renameFile', [(dir == fileSystem) ? "" : dir.getName(), oldName, newName], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
			dir.getFile(newName).name = oldName;
			showFiles(dir);
		}
	});

/*	var url = '/rename_file.php?dirName=' + encodeURIComponent((dir == fileSystem) ? "" : dir.getName())
		+ '&oldName=' + encodeURIComponent(oldName)
		+ '&newName=' + encodeURIComponent(newName);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
			dir.getFile(newName).name = oldName;
			showFiles(dir);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteRunProject(name, deviceSerialNum, deployPTmataToUsb) {
	ws.rpc('runProject', [name, deviceSerialNum, deployPTmataToUsb], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	});

/*	var url = '/run_project.php?projectName=' + encodeURIComponent(name)
		+ '&deviceSerialNum=' + encodeURIComponent(deviceSerialNum);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function remoteStopProject(name, deviceSerialNum) {
	ws.rpc('stopProject', [name, deviceSerialNum], function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	});

/*	var url = '/stop_project.php?projectName=' + encodeURIComponent(name)
		+ '&deviceSerialNum=' + encodeURIComponent(deviceSerialNum);

	$.getJSON(url)
	.done(function(data) {
		if (data.error) {
			showAlert('Error', data.error);
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		showAlert('Server Error', error);
	});*/
}

function showDeployPTmata(projectName, serialNum) {
	$('#deployPTmataDialog').dialog({
		autoOpen: true,
		height: 250,
		width: 300,
		modal: true,
		title: 'Run Project',
		buttons: {
			'Run': function() {
				var deploy = $('#deployPtmata').prop('checked');
				remoteRunProject(projectName, serialNum, deploy);

				$(this).dialog('close');
			},
			'Cancel': function() {
				$(this).dialog('close');
			}
		}
	});
	
	$('#deployPtmata').prop('checked', false);
}

function showDeviceSelect(projectName, isRun) {
	if (isRun) {
		$('#deviceSelectDialog').dialog({
			autoOpen: true,
			height: 250,
			width: 300,
			modal: true,
			title: 'Run Project',
			buttons: {
				'Run': function() {
					var deviceSerialNum = $('#deviceSerialNum').val();
					remoteRunProject(projectName, deviceSerialNum);

					$(this).dialog('close');
				},
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	} else {
		$('#deviceSelectDialog').dialog({
			autoOpen: true,
			height: 250,
			width: 300,
			modal: true,
			title: 'Stop Project',
			buttons: {
				'Stop': function() {
					var deviceSerialNum = $('#deviceSerialNum').val();
					remoteStopProject(projectName, deviceSerialNum);

					$(this).dialog('close');
				},
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	}
}

function showAdd() {
	if (currentDir == fileSystem) {
		loadTemplates();
		
		$('#projectTypeDiv').css('display', 'block');
		$('#nameDialogMsg').html('Enter a project name and select the project type.');
		$('#newName').val('New Project');
		
		var createFunc = function() {
			var template = templates[$('#newProjectType').val()];
			var name = $('#newName').val() + ' ' + template.language;
			if ($('#newName').val().trim().length == 0) {
				showAlert('Invalid Name', 'A project name cannot be empty or containing only of white spaces.');
			} else if (name.indexOf(REMOTE_PROJECT_PREFIX) == 0) {
				showAlert('Invalid Name', 'A project name cannot start with "' + REMOTE_PROJECT_PREFIX + '".');
			} else if (name.indexOf(USB_PROJECT_PREFIX) == 0) {
				showAlert('Invalid Name', 'A project name cannot start with "' + USB_PROJECT_PREFIX + '".');
			} else if (currentDir.fileExist(name)) {
				showAlert('Same Name Exists', 'A project with the same name already exists.');
			} else {
				currentDir.addDirectory(name, false);
				currentDir = currentDir.getFile(name);
				addTemplateFiles(currentDir, template);

				$('#nameDialog').dialog('close');
			}
		};
		$('#newName').off('keypress');
		$('#newName').keypress(function(event) {
			if (event.which == 13)
				createFunc();
		});
		
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 250,
			width: 300,
			modal: true,
			title: 'Create Project',
			buttons: {
				'Create': createFunc,
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	} else {
		var extension;
		var projectName = currentDir.getName();
		if (projectName.search(/\(JavaScript\)$/) >= 0)
			extension = '.js';
		else if (projectName.search(/\(Visual\)$/) >= 0)
			extension = '.visual';
		else if (projectName.search(/\(Arduino\)$/) >= 0)
			extension = '.ino';
		else if (projectName.search(/\(Python\)$/) >= 0)
			extension = '.py';
		
		$('#projectTypeDiv').css('display', 'none');
		$('#nameDialogMsg').html('Enter a file name.');
		$('#newName').val('newFile' + extension);
		
		var createFunc = function() {
			var name = $('#newName').val();
			if (name.search(new RegExp(extension + '$')) < 0)
				name += extension;
			
			if (name.substr(0, name.length - extension.length).trim().length == 0) {
				showAlert('Invalid Name', 'A file name cannot be empty or containing only of white spaces.');
			} else if (currentDir.fileExist(name)) {
				showAlert('Same Name Exists', 'A file with the same name already exists.');
			} else {
				currentDir.addTextFile(name, '', false);
				if (IS_REMOTE)
					remoteCreateFile(currentDir.getName(), name);
					
				showFiles(currentDir);
				$('#files').val(name);
				onFileSelectorChanged();
				openFile();
				$('#nameDialog').dialog('close');
			}
		};
		$('#newName').off('keypress');
		$('#newName').keypress(function(event) {
			if (event.which == 13)
				createFunc();
		});
		
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 200,
			width: 300,
			modal: true,
			title: 'Create File',
			buttons: {
				'Create': createFunc,
				'Cancel': function() {
					$(this).dialog('close');
				}
			}
		});
	}
}

function loadTemplates() {
	if ($('#newProjectType').val() == null) {
		var options = '';
		
		for (var i=0; i<templates.length; i++) {
			var language = templates[i];
			options += '<option disabled>' + language.name + '</option>';
			for (var j=0; j<language.templates.length; j++) {
				var temp = language.templates[j];
				var value = temp.name;
				if (IS_LOCAL_DEVICE && (device.getType() == 35)) {
					if (value == 'Empty - Python')
						temp.selected = true;
				} else {
					if (value == 'Empty - JavaScript')
						temp.selected = true;
				}
				options += '<option value="' + value + '"' + (temp.selected ? ' selected' : '') + '>&nbsp;&nbsp;' + value + '</option>';

				if (language.name != 'Empty') {
					temp.language = '(' + language.name + ')';
				} else {
					temp.language = '(' + value.substr(value.lastIndexOf(' ') + 1) + ')';
				}
				
				// save it for later use
				templates[value] = temp;
			}
		}
		
		$('#newProjectType').html(options);
	}
}

function addTemplateFiles(dir, template) {

	// load files
	var ajaxes = [];
	for (var i=0; i<template.files.length; i++) {
		ajaxes.push($.ajax('templates/' + template.files[i].file));
	}
	
	$.when.apply($, ajaxes).then(function() {
		if (template.files.length == 1)
			arguments = [arguments];

		for (var i=0; i<template.files.length; i++) {
			dir.addTextFile(template.files[i].name, arguments[i][0], false);
		}
	}, function(e) {
		console.log(e);
	})
	.always(function() {
		if (IS_REMOTE)
			remoteCreateProject(dir);
		else
			showFiles(dir);
	});
}

function showRemove() {
	var name = $('#files').val();
	if (name == null || name === '..')
		return;

	if (currentDir == fileSystem) {
		showConfirm('Delete Project', 'Are you sure you want to delete<br/>' + name + '?', {
			'Yes': function() {
				if (IS_LOCAL_DEVICE) {
					device.stopProject(name);
				} else if (IS_REMOTE) {
					remoteRemoveFile(name, "");
				}
				
				currentDir.removeFile(name, false);
				showFiles(currentDir);
				$(this).dialog('close');
			},
			'No': function() {
				$(this).dialog('close');
			}
		});
	} else {
		showConfirm('Delete File', 'Are you sure you want to delete<br/>' + name + '?', {
			'Yes': function() {
				if (currentFile && currentFile.getName() == name) {
					currentFile = null;
					closeEditors();
				}
				
				if (IS_REMOTE)
					remoteRemoveFile(currentDir.getName(), name);
				
				currentDir.removeFile(name, false);
				showFiles(currentDir);
				$(this).dialog('close');
			},
			'No': function() {
				$(this).dialog('close');
			}
		});
	}
}

function showRename() {
	var oldName = $('#files').val();
	if (oldName == null)
		return;

	if (currentDir == fileSystem) {
		var extension = oldName.match(/( \([^\)]+\)$)/)[0];
		var name = oldName.substr(0, oldName.length - extension.length);
		$('#projectTypeDiv').css('display', 'none');
		$('#nameDialogMsg').html('Enter a new project name.');
		$('#newName').val(name);
		
		var renameFunc = function() {
			var newName = $('#newName').val() + extension;
			if ($('#newName').val().trim().length == 0) {
				showAlert('Invalid Name', 'A project name cannot be empty or containing only of white spaces.');
			} else if (newName.indexOf(REMOTE_PROJECT_PREFIX) == 0) {
				showAlert('Invalid Name', 'A project name cannot start with "' + REMOTE_PROJECT_PREFIX + '".');
			} else if (newName.indexOf(USB_PROJECT_PREFIX) == 0) {
				showAlert('Invalid Name', 'A project name cannot start with "' + USB_PROJECT_PREFIX + '".');
			} else if (currentDir.fileExist(newName)) {
				showAlert('Same Name Exists', 'A project with the same name already exists.');
			} else {
				currentDir.renameFile(oldName, newName, false);
				showFiles(currentDir);
				$('#nameDialog').dialog('close');
				
				if (IS_REMOTE)
					remoteRenameFile(currentDir, oldName, newName);
			}
		};
		$('#newName').off('keypress');
		$('#newName').keypress(function(event) {
			if (event.which == 13)
				renameFunc();
		});
		
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 200,
			width: 300,
			modal: true,
			title: 'Rename Project',
			buttons: {
				'Rename': {text: "Rename", id: "nameDialogRename", click:renameFunc},
				'Cancel': {text: "Cancel", id: "nameDialogCancel", click:function() {
					$(this).dialog('close');
				}}
			}
		});
	} else {
		var extension = oldName.match(/(\.[^\.]+$)/)[0];
		$('#projectTypeDiv').css('display', 'none');
		$('#nameDialogMsg').html('Enter a new file name.');
		$('#newName').val(oldName);
		
		var renameFunc = function() {
			var newName = $('#newName').val();
			if (newName.search(new RegExp(extension + '$')) < 0) {
				showAlert('Cannot Change Extension', 'You cannot change the extension of a file.');
				return;
			}
				
			if (newName.substr(0, newName.length - extension.length).trim().length == 0) {
				showAlert('Invalid Name', 'A file name cannot be empty or containing only of white spaces.');
			} else if (currentDir.fileExist(newName)) {
				showAlert('Same Name Exists', 'A file with the same name already exists.');
			} else {
				currentDir.renameFile(oldName, newName, false);
				showFiles(currentDir);
				$('#files').val(newName);
				onFileSelectorChanged();
				$('#nameDialog').dialog('close');
				
				if (IS_REMOTE)
					remoteRenameFile(currentDir, oldName, newName);
			}
		};
		$('#newName').off('keypress');
		$('#newName').keypress(function(event) {
			if (event.which == 13)
				renameFunc();
		});
		
		$('#nameDialog').dialog({
			autoOpen: true,
			height: 200,
			width: 300,
			modal: true,
			title: 'Rename File',
			buttons: {
				'Rename': {text: "Rename", id: "nameDialogRename", click:renameFunc},
				'Cancel': {text: "Cancel", id: "nameDialogCancel", click:function() {
					$(this).dialog('close');
				}}
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

function showTitle() {
	var title;
	if (currentDir == fileSystem) {
		title = 'No Project Opened';
	} else {
		title = currentDir.getName();
		if (currentFile)
			title += ' - ' + currentFile.getName();
	}
	
	$('#title').html(title);
}

function showFiles(dir) {
	currentDir = dir;
	var filesList = '';
	
	if (currentDir != fileSystem) {
		filesList += '<option value="..">..</option>';
		
		if (isProjectRunning(currentDir.getName())) {
			$('#run').html('Stop');
			$('#serialInputs').attr('disabled', false);
		} else {
			$('#run').html('Run');
			$('#serialInputs').attr('disabled', true);
		}
	} else {
		$('#run').html('Run');
		$('#serialInputs').attr('disabled', true);
	}

	var filesCount = currentDir.getFileCount();
	if (currentDir != fileSystem) {
		for (var i=0; i<filesCount; i++) {
			var name = currentDir.getFileAt(i).getName();
			filesList += '<option value="' + name + '">' + name + '</option>';
		}
	} else {
		for (var i=0; i<filesCount; i++) {
			var name = currentDir.getFileAt(i).getName();
			if ((name.indexOf(REMOTE_PROJECT_PREFIX) == 0) || (name.indexOf(USB_PROJECT_PREFIX) == 0))
				continue;
				
			filesList += '<option value="' + name + '">' + (isProjectRunning(name) ? '* ' : '') + name + '</option>';
		}
	}	

	$('#files').html(filesList);
	onFileSelectorChanged();
	
	showTitle();
}

function onFileSelectorChanged() {
	var val = $('#files').val();
	if ((val == null) || (val == '..')) {
		$('#remove').attr('disabled', true);
		$('#rename').attr('disabled', true);
	} else {
		$('#remove').attr('disabled', false);
		$('#rename').attr('disabled', false);
	}
	
	if (val == null) {
		$('#open').attr('disabled', true);
	} else {
		$('#open').attr('disabled', false);
	}
	
	if ((val != null) || (currentDir != fileSystem)) {
		$('#run').attr('disabled', false);
	} else {
		$('#run').attr('disabled', true);
		$('#run').html('Run');
	}
	
	if (val && currentDir == fileSystem) {
		if (isProjectRunning(val))
			$('#run').html('Stop');
		else
			$('#run').html('Run');
	}
}

function openFile() {
	// check selected
	var name = $('#files').val();
	if (name == null)
		return;
	
	// if root, then just show folders
	if (currentDir == fileSystem) {
		var dir = currentDir.getFile(name);
		showFiles(dir);
		return;
	}

	saveCurrentFile();

	// go back to root
	if (name == '..') {
		currentFile = null;
		showFiles(fileSystem);
		closeEditors();
		return;
	}

	currentFile = currentDir.getFile(name);
	showTitle();
	
	if (name.search(/.visual$/) < 0) {
		openTextFile();
	} else {
		openVisualFile();
	}
}

function openTextFile() {
	// hide blockly
	$('#blocklyDiv').css('display', 'none');

	// create ace
	if (textEditor == null) {
		ace.require("ace/ext/language_tools");
		textEditor = ace.edit("textEditor");
		textEditor.getSession().setUseSoftTabs(false);
		textEditor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false,
			dragEnabled: false
		});
		textEditor.$blockScrolling = Infinity;		
	}

	// set mode
	var name = currentFile.getName();
	if (name.search(/.js$/) >= 0)
		textEditor.getSession().setMode("ace/mode/javascript");
	else if (name.search(/.py$/) >= 0)
		textEditor.getSession().setMode("ace/mode/python");
	else
		textEditor.getSession().setMode("ace/mode/c_cpp");
	
	// load file content
	var content = currentFile.getContent(false).text;
	textEditor.setValue(content);
	
	var settings = fileTextEditorSettings[currentDir.getName() + '/' + currentFile.getName()];
	if (settings) {
		textEditor.scrollToLine(settings.firstVisibleRow);
		textEditor.getSelection().addRange(settings.selectionRange);
	} else {
		textEditor.gotoLine(1);
	}
	
	$('#textEditor').css('display', 'block');
	$('#textEditorToolBar').css('display', 'block');
/*	$('#reload').attr('disabled', false);
	$('#zoom_in').attr('disabled', false);
	$('#zoom_out').attr('disabled', false);
	$('#undo').attr('disabled', false);
	$('#redo').attr('disabled', false);
	$('#find').attr('disabled', false);
	$('#replace').attr('disabled', false);
*/	
	textEditor.focus();

	//HACK: not sure why calling it immediately doesn't work
	setTimeout(function() {
		textEditor.getSession().getUndoManager().reset();
	}, 100);
}

function openVisualFile() {
	// hide the text editor
	$('#textEditor').css('display', 'none');
	$('#textEditorToolBar').css('display', 'none');
/*	$('#reload').attr('disabled', true);
	$('#zoom_in').attr('disabled', true);
	$('#zoom_out').attr('disabled', true);
	$('#undo').attr('disabled', true);
	$('#redo').attr('disabled', true);
	$('#find').attr('disabled', true);
	$('#replace').attr('disabled', true);
*/
	// create or clear blockly
	if (Blockly.getMainWorkspace() == null) {
		initBlockly();
	} else {
		Blockly.mainWorkspace.clear();
	}
	
	$('#blocklyDiv').css('display', 'block');

	// load file content
	var content = currentFile.getContent(false).text;
	if (content) {
		var xml = Blockly.Xml.textToDom(content);
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
	}
}

function isProjectRunning(name) {
	if (IS_LOCAL_DEVICE)
		return device.isProjectRunning(name);
	return false;
}

function initBlockly() {
	initBlocklyBasics();
	initBlocklyGPIO();
	initBlocklyNetworking();
	initBlocklyUDP();
	initBlocklyTCP();
	initBlocklyFile();
	initBlocklyUSB();
	initBlocklyHTTP();
	initBlocklyEmail();
    initBlocklyPhysical();
    initBlocklyEnvironment();

	Blockly.Scrollbar.scrollbarThickness = 20;
	Blockly.inject(
		document.getElementById('blocklyDiv'),
		{toolbox: document.getElementById('toolbox')}
	);
}

function saveCurrentFile() {
	if (!currentFile)
		return;
	
	var content;
	if ($('#textEditor').css('display') != 'none') {
		// save from text editor
		content = textEditor.getValue();
		
		// save text editor settings for file
		fileTextEditorSettings[currentDir.getName() + '/' + currentFile.getName()] = {
			firstVisibleRow: textEditor.getFirstVisibleRow(),
			selectionRange: textEditor.getSelectionRange()
		};
		
	} else {
		// save from blockly
		var code = Blockly.JavaScript.workspaceToCode();
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		
		var xmParser = new DOMParser();
		var codeXml = xmParser.parseFromString('<jscode><![CDATA[' + code + ']]></jscode>', 'text/xml');
		xml.appendChild(codeXml.childNodes[0]);
		
		content = Blockly.Xml.domToText(xml);
	}
	
	currentFile.setTextContent(content, false);
	
	if (IS_REMOTE)
		remoteSaveFile(currentDir.getName(), currentFile.getName(), content);
}

function closeEditors() {
	$('#textEditor').css('display', 'none');
	$('#blocklyDiv').css('display', 'none');

	$('#textEditorToolBar').css('display', 'none');
/*	$('#reload').attr('disabled', true);
	$('#zoom_in').attr('disabled', true);
	$('#zoom_out').attr('disabled', true);
	$('#undo').attr('disabled', true);
	$('#redo').attr('disabled', true);
	$('#find').attr('disabled', true);
	$('#replace').attr('disabled', true);*/
}

function runProject() {
	var projectName = currentDir.getName();

	if (currentDir == fileSystem) {
		projectName = $('#files').val();
		if (projectName == null)
			return;
	}

	// save file first
	saveCurrentFile();
	
	if (IS_LOCAL_DEVICE) {
		if (isProjectRunning(projectName)) {
			device.stopProject(projectName);
		} else {
			try {
				var extraCode = '';

				//COMMENTED because the js code of blockly is saved to file
				// convert blockly to js
		/*			if (projectName.search(/\(Visual\)$/) >= 0) {
					var previousFile = currentFile;
					
					// open all visual files and convert to js
					var filesCount = currentDir.getFileCount();
					for (var i=0; i<filesCount; i++) {
						var file = currentDir.getFileAt(i);
						if ((currentFile == null) || (file.getName() != currentFile.getName())) {
							$('#files').val(file.getName());
							openFile();
						}
						extraCode += Blockly.JavaScript.workspaceToCode();
					}
					
					if (previousFile) {
						if (previousFile.getName() != currentFile.getName()) {
							$('#files').val(previousFile.getName());
							openFile();
						}
					} else {
						closeEditors();
					}
				}
		*/			
				device.runProject(projectName, extraCode);
			} catch (e) {
				showAlert('Error Running Project', e);
			}
		}
	} else if (IS_REMOTE) {
//		showDeviceSelect(projectName, true);
		var serialNum = $('#remoteDevice').val();
		var remoteDevice = remoteDevices[serialNum];
		if (remoteDevice) {
			if (!remoteDevice.online) {
				showAlert('Project Run Error', 'Device is offline.');
			} else {
//				remoteRunProject(projectName, serialNum);
				showDeployPTmata(projectName, serialNum);
			}
		} else {
			showAlert('Project Run Error', 'No device selected.');
		}
	} else if (IS_DESKTOP_APP) {
		var usbName = $('#remoteDevice').val();
		var usbPort = device.getPort(usbName);
		if (usbPort && usbPort.isPortUp()) {
			usbPort.getController().deployProjectFromFileSystem(USB_PROJECT_PREFIX + projectName, fileSystem.getName() + '/' + projectName);
		} else {
			showAlert('Project Run Error', 'Device is not connected.');
		}
	}
}

function stopProject() {
	if (currentDir == fileSystem)
		return;
	
	var projectName = currentDir.getName();
	if (IS_LOCAL_DEVICE) {
		device.stopProject(projectName);
	} else if (IS_REMOTE) {
//		showDeviceSelect(projectName, false);
		var serialNum = $('#remoteDevice').val();
		var remoteDevice = remoteDevices[serialNum];
		if (remoteDevice) {
			if (!remoteDevice.online) {
				showAlert('Project Stop Error', 'Device is offline.');
			} else {
				remoteStopProject(projectName, serialNum);
			}
		} else {
			showAlert('Project Stop Error', 'No device selected.');
		}
	}
}

function updateSerialOutputs(output) {
	var textArea = $('#serialOutputs');
	var newOutput = textArea.val() + output;
	
	// cut output buffer to 4000 chars after hitting 10000
	if (newOutput.length > 10000) {
		var nIndex = newOutput.indexOf('\n', 6000);
		if (nIndex >= 0)
			newOutput = newOutput.substr(nIndex);
		else
			newOutput = newOutput.substr(6000);
	}
	
	textArea.val(newOutput);
	textArea.scrollTop(textArea[0].scrollHeight);
}

function clearSerialOutputs() {
	$('#serialOutputs').val(device.getSerialOutputs());
}


function isJavascriptBalanced(code) {
    var length = code.length;
    var delimiter = '';
    var brackets = [];
    var matching = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (var i = 0; i < length; i++) {
        var char = code.charAt(i);

        switch (delimiter) {
        case "'":
        case '"':
        case '/':
            switch (char) {
            case delimiter:
                delimiter = "";
                break;
            case "\\":
                i++;
            }

            break;
        case "//":
            if (char === "\n") delimiter = "";
            break;
        case "/*":
            if (char === "*" && code.charAt(++i) === "/") delimiter = "";
            break;
        default:
            switch (char) {
            case "'":
            case '"':
                delimiter = char;
                break;
            case "/":
                var lookahead = code.charAt(++i);
                delimiter = char;

                switch (lookahead) {
                case "/":
                case "*":
                    delimiter += lookahead;
                }

                break;
            case "(":
            case "[":
            case "{":
                brackets.push(char);
                break;
            case ")":
            case "]":
            case "}":
                if (!brackets.length || matching[char] !== brackets.pop()) {
                    repl.print(new SyntaxError("Unexpected closing bracket: '" + char + "'"), "error");
                    return null;
                }
            }
        }
    }

    return brackets.length ? false : true;
}

function isPythonBalanced(code) {
	var lines = code.split('\n'),
		depth = 0,
		mlsopened = false,
		l;
	
	for (l = 0; l < lines.length; l = l + 1) {
		if (lines[l].match(/'''/) !== null && lines[l].match(/'''/).length === 1) {
			mlsopened = !mlsopened;
		}
		if (!mlsopened && lines[l].substr(lines[l].length - 1) === ":") {
			depth = depth + 1;
		}
		if (!mlsopened && lines[l] === "" && depth > 0) {
			depth = 0   ;
		}
	}
	return depth === 0 && !mlsopened;
}

function processInputs() {
	if (currentDir == fileSystem) {
		return;
	}
	
	var projectName = currentDir.getName();
	var code = $('#serialInputs').val();
	if (code.trim().length == 0)
		return;
	
	var isBalanced = (projectName.search(/\(Python\)$/) >= 0) ? isPythonBalanced : isJavascriptBalanced;
	if (isBalanced(code)) {
		device.addSerialOutputs('> ' + code.replace(/\n/g, '\n  ') + '\n');
		device.runCodeInProject(projectName, code);
		$('#serialInputs').val('');
		$('#serialInputs').attr('rows', 1);
	} else {
		$('#serialInputs').val(code + '\n');
		$('#serialInputs').attr('rows', parseInt($('#serialInputs').attr('rows')) + 1);
	}
}

function updateProjectState(projectName, state) {
	if (currentDir && ((currentDir.getName() == projectName) || ($('#files').val() == projectName))) {
		$('#run').html(state ? 'Stop' : 'Run');
		$('#serialInputs').attr('disabled', !state);
	}
	
	if (currentDir == fileSystem) {
		showFiles(fileSystem);
	}
}


function showIoxIde(projectName) {
	document.getElementById('titlePane').style.display='none';
	document.getElementById('split-pane-divider').style.display='none';
	document.getElementById('contentsSplitPane').style.top='0px';
	document.getElementById('leftPane').style.display='none';
	document.getElementById('vertical-divider').style.display='none';
	document.getElementById('horizontal-divider').style.display='none';
	document.getElementById('bottomPane').style.display='none';
	document.getElementById('rightPane').style["left"] = '0px';
	document.getElementById('rightPane').style["margin-left"] = '0px';
	document.getElementById('topPane').style["bottom"] = '0px';
	document.getElementById('topPane').style["margin-bottom"] = '0px';
	fileSystem = device.getProcess("FileManager").getFileSystem("c:");
	currentDir = fileSystem.getFile(projectName);
	currentFile = currentDir.getFile(projectName+".js");
	openTextFile();
	textEditor.getSession().on('change', function(e) {ioxIde.fileChanged(); });	
}

function help() {
	var path = 'programming.htm';
	if (currentDir != fileSystem) {
		var projectName = currentDir.getName();
		if (projectName.search(/\(JavaScript\)$/) >= 0)
			path = 'programming_javascript.htm';
		else if (projectName.search(/\(Visual\)$/) >= 0)
			path = 'programming_visual.htm';
		else if (projectName.search(/\(Python\)$/) >= 0)
			path = 'programming_python.htm';
	}
	
	if (IS_REMOTE)
		_browser.helpPath(path);
	else
		ipc.appWindow().helpPath(path);
}
