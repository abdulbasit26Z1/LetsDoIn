
function UserJsApp(device, cppApp) {
	this.device = device;
	this.cppApp = cppApp;
	this.code = 'var mouseX=0,mouseY=0,bMouseDown=false;function mouseEvent(pressed,x,y){bMouseDown=pressed;mouseX=x;mouseY=y;};function measurementSystemChangeEvent(){}';
	this.finalizers = [];
}

UserJsApp.prototype.build = function(file, code) {
//	dprint('build');
//	dprint(code);
	
	this.code += '\n' + code;
}

UserJsApp.preprocessors = [];
UserJsApp.addPreprocessor = function(preprocessor) {
	if (this.preprocessors.indexOf(preprocessor) < 0)
		this.preprocessors.push(preprocessor);
}

UserJsApp.prototype.start = function() {

	var self = this;

	function initFuncs(interpreter, scope) {
		self.initBasics(interpreter, scope);
		self.initJSON(interpreter, scope);
		self.initUsb(interpreter, scope);
		self.initGPIO(interpreter, scope);
		self.initNetworking(interpreter, scope);
		self.initUdp(interpreter, scope);
		self.initTcp(interpreter, scope);
		self.initHttp(interpreter, scope);
		self.initEmail(interpreter, scope);
		self.initFile(interpreter, scope);
		self.initPhysical(interpreter, scope);
		self.initIoEClient(interpreter, scope);
		self.initEnvironment(interpreter, scope);
		self.initRealHttp(interpreter, scope);
		self.initRealTcp(interpreter, scope);
		self.initRealUdp(interpreter, scope);
	};

	// preprocess the code
	for (var i=0; i<UserJsApp.preprocessors.length; i++) {
		UserJsApp.preprocessors[i].apply(this);
	}

	try {
		this.interpreter = new Interpreter(this.code, initFuncs);
	} catch (err) {
		// call the c++ object back to notify the app has error and then stop it
		this.cppApp.onError(err.toString());
		this.stop();
	}

//	dprint('UserJsApp.start()');
	this.runCode();

	if (!this.cppApp.isConsoleApp() && this.interpreter.scope.properties.setup) {
	    this.runCode('setup();');
	}
}

UserJsApp.prototype.runCode = function(code, runPreviousParsed, bEval) {
//	dprint('UserJsApp.runCode ' + code);
	var self = this;
	
	if (bEval)
		delete this.interpreter.lastValue;

	try {
		var runTil = -1;
		if (code) {
			runTil = this.interpreter.stateStack.length;
			this.interpreter.parseToFront(code);
		} else if (runPreviousParsed) {
			runTil = this.interpreter.stateStack.length - 1;
		}
		
		if (this.nextTimer) {
			this.nextTimer.cancel();
			this.nextTimer = null;
		}
		
		this.runningCode = true;
		this.runStatementCount = 0;
	
		this.cppApp.onStartRun();
		var maxRunCount = this.cppApp.getMaxRunCount();
		if (code && ((code.indexOf('mouseEvent(') == 0) || (code.indexOf('setup()') == 0) || (code.indexOf('_processInterrupt(') == 0)))
			maxRunCount *= 10;
		var ranOverMax = false;
		
		// run to a limit, resume after a while
		while (this.runningCode && this.interpreter.step()) {
			this.runStatementCount++;
//			dprint("run count: " + this.runStatementCount);

			// run til the state stack length matches before running
			if ((runTil >= 0) && (runTil == this.interpreter.stateStack.length)) {
//				if (runTil > 0)
//					this.device.addSerialOutputs('ran til stack match: ' + runTil + '\n');
				break;
			}

			if (this.runStatementCount > maxRunCount && this.runningCode) {
//				dprint('pausing');
//				this.device.addSerialOutputs('***ran over max: ' + maxRunCount + '\n');
				
				ranOverMax = true;
				this.cppApp.onEndRun(this.runStatementCount);
				
				this.runningCode = false;
				this.nextTimer = setSimulationTimeout(function() {
					self.runCode();
				}, this.cppApp.getNextRunTime());
			}
		}
		
		if (!ranOverMax) {
			this.cppApp.onEndRun(this.runStatementCount);
		}
		
	} catch (err) {
	
		// call the c++ object back to notify the app has error and then stop it
		dprint('js app error: ' + err.toString());
		this.cppApp.onError(err.toString());
		
		if (!this.stopping)
			this.stop();
		
		return false;
	}
	
	var runToEnd = this.runningCode;
	
	var nonEmptyStack = (this.interpreter.stateStack.length > 0);
	if (this.cppApp.isConsoleApp() && !nonEmptyStack) {
		// send the event later
		setSimulationTimeout(function() {
			if (bEval) {
				self.cppApp.print(self.interpreter.lastValue + '\n');
			}
			
			self.cppApp.onFinished();
		}, 0);
		
	} else if (this.runningCode && (nonEmptyStack || this.interpreter.scope.properties.loop)) {
		if (this.nextTimer)
			this.nextTimer.cancel();
		
		var sleepTime;
		// check for sleep calls
		if (nonEmptyStack && this.interpreter.stateStack[0].pauseUntilSimTime) {
			sleepTime = this.interpreter.stateStack[0].pauseUntilSimTime - ipc.simulation().getCurrentSimTime();
		} else {
			sleepTime = this.cppApp.getNextRunTime();
		}
		
		this.nextTimer = setSimulationTimeout(function() {
			self.runCode(nonEmptyStack ? null : 'loop();');
		}, sleepTime);
	}

	this.runningCode = false;
	return runToEnd;
}

UserJsApp.prototype.stop = function() {
//    dprint("UserJsApp.js::stop() - called");

	this.stopping = true;
	
	// run cleanUp function when stopping
	if (!this.cppApp.isConsoleApp() && this.interpreter.scope.properties.cleanUp)
		this.runCode('cleanUp()');

	if (this.finalizers) {
//        dprint("UserJsApp.js::stop() - running finalizers...");
		for (var i=0; i<this.finalizers.length; i++) {
			try {
				this.finalizers[i].cleanUp();
			} catch (e) {
			}
		}
	}
	
	if (this.nextTimer) {
		this.nextTimer.cancel();
		this.nextTimer = null;
	}
}

UserJsApp.prototype.interrupt = function() {

	this.runningCode = false;
	
	if (this.nextTimer) {
		this.nextTimer.cancel();
		this.nextTimer = null;
	}
	
	this.cppApp.onFinished();
}

UserJsApp.prototype.inputEnter = function(input) {
	this.interpreter.stateStack[0].value = this.interpreter.createPrimitive(input);
	this.runCode();
}

UserJsApp.prototype.startVmApp = function() {
//    dprint("UserJsApp.js::startVmApp() - called");
	var self = this;
	function initDevice(interpreter, scope) {
	
		self.initBasics(interpreter, scope);
		self.initJSON(interpreter, scope);
		self.initUdp(interpreter, scope);
		self.initTcp(interpreter, scope);
		self.initHttp(interpreter, scope); // probably don't need but avoid preprocessor error
		self.initRealHttp(interpreter, scope);


		var device = interpreter.createObject(interpreter.OBJECT);
		interpreter.setProperty(scope, 'Device', device);
		var wrapper = function() {
			return interpreter.createPrimitive(self.device.getXCoordinate());
		}
		interpreter.setProperty(device, 'getXCoordinate', interpreter.createNativeFunction(wrapper));

		wrapper = function() {
			return interpreter.createPrimitive(self.device.getYCoordinate());
		}
		interpreter.setProperty(device, 'getYCoordinate', interpreter.createNativeFunction(wrapper));

		wrapper = function(xCoord, yCoord) {
			xCoord = xCoord.toNumber() || interpreter.UNDEFINED;
			yCoord = yCoord.toNumber() || interpreter.UNDEFINED;
			self.device.moveToLocation(xCoord, yCoord);
			return interpreter.UNDEFINED;
		}
		interpreter.setProperty(device, 'moveToLocation', interpreter.createNativeFunction(wrapper));
		
		wrapper = function(output) {
			var terminalLine = self.device.getCommandLine();
			terminalLine.println(output);
			terminalLine.flush(-1);
			return interpreter.UNDEFINED;
		}
		interpreter.setProperty(device, 'println', interpreter.createNativeFunction(wrapper));
	};

	// preprocess the code
	for (var i=0; i<UserJsApp.preprocessors.length; i++) {
		UserJsApp.preprocessors[i].apply(this);
	}

	try {
		this.interpreter = new Interpreter(this.code, initDevice);
	} catch (err) {
		// call the c++ object back to notify the app has error and then stop it
		dprint("... app error: " + err.toString());
		this.cppApp.onError(err.toString());
		this.stop();
	}

	this.runCode();

	if (this.interpreter.scope.properties.main) {
		this.runCode('main();');
	}
}

UserJsApp.create = function(device) {
//	dprint('UserJsApp.create ');
	var app = new UserJsApp(device, UserJsApp_tempCppApp);
	UserJsApp_tempCppApp = null;
	return $secreg(app);
}

