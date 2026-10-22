
function UserPyApp(device, cppApp) {
	
	// create a new skulpt instance
	Sk = null;
//	Sk = {};
//	Sk.uuid = guid();
	createSkulpt();
	createSkulptBuiltins();
	modifySkulpt();

	this.device = device;
	this.cppApp = cppApp;
	this.sk = Sk;
	this.finalizers = [];
	Sk.device = device;
	Sk.app = this;
	Sk.uuid = guid();
//	dprint('new uuid: ' + Sk.uuid);
	
	this.runningCode = false;
	this.runStatementCount = 0;
	this.maxRunCount = -1;
	this.files = {};
	
	var self = this;
	function print(str) {
	    self.cppApp.print(str);
	};

	function builtinRead(x) {
//		dprint('builtinRead ' + x);

		// read from local files first
		if (x.indexOf('./') == 0) {
			var localFile = x.substr(2);
			if (self.files[localFile])
				return self.files[localFile];
		}

		// read from script files
		if (self.sm == null)
			self.sm = ipc.ipcManager().thisInstance();
		
		if (self.sm.hasScript('python/skulpt/' + x))
			return self.sm.getScript('python/skulpt/' + x);
			
		if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
			throw "File not found: '" + x + "'";
		return Sk.builtinFiles["files"][x];
	};
	
	function input(prompt) {
		self.cppApp.rawInput(prompt);
		return new Promise(function(resolve, reject) {
			self.inputPromise = {
				resolve: resolve,
				reject: reject
			};
		});
	}
	
	Sk.builtins.input = function() {
		throw new Sk.builtin.NotImplementedError("use raw_input(); input() is not yet implemented");
	};
	
	Sk.configure({
		output: print,
		read: builtinRead,
		inputfun: input,
		retainglobals: true,
		debugging: true
	});
	
	Sk.ffi.getInt = function(n, def) {
		n = Sk.ffi.remapToJs(n);
        if (n == true)
            n = 1;
        else if (n == false)
            n = 0;
        else {
            n = parseInt(n);
            if (isNaN(n))
                n = def;
        }
        return n;
    };
}

UserPyApp.prototype.build = function(file, code) {
	this.files[file] = code;
}

UserPyApp.prototype.start = function() {

	// if same as start file, then run the code
	var startFile = this.cppApp.getStartFile();
	if (startFile != '') {
		var code = this.files[startFile];
		if (typeof(code) === 'string')
			this.runCode(code, false, true);
	}

	this.runningCode = true;
	this.resume();
}

UserPyApp.prototype.resume = function() {
//	dprint('resume');
	Sk = this.sk;
	
	var self = this;
	self.runningCode = true;
	
	self.cppApp.onStartRun();
	self.maxRunCount = self.cppApp.getMaxRunCount() / 10; // python runs slower
//	self.device.addSerialOutputs('* resume');

	// let interactive prompt run more
	if (self.cppApp.isConsoleApp() && (self.cppApp.getStartFile() == '')) {
		self.maxRunCount *= 3;
	}

	// resolve suspension
	if (self.suspension) {
		try {
			self.suspension.resolve(self.suspension.susp.resume());
		} catch (err) {
			if (err instanceof Sk.builtin.SystemExit) {
				self.cppApp.onQuit();
			} else {
				// call the c++ object back to notify the app has error and then stop it
				self.cppApp.onError(err.toString());
				
				if (!self.stopping)
					self.stop();
			}
		}
		self.suspension = null;
	}
}

UserPyApp.prototype.stop = function() {
	Sk = this.sk;
	
	this.stopping = true;
	
	// run cleanUp function when stopping
	if (!this.cppApp.isConsoleApp())
		this.runCode('try:\n  cleanUp()\nexcept:\n  pass');

	if (this.finalizers) {
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

UserPyApp.prototype.interrupt = function() {

	this.runningCode = false;
	
	if (this.nextTimer) {
		this.nextTimer.cancel();
		this.nextTimer = null;
	}
	
	this.cppApp.onFinished();
}

UserPyApp.prototype.callSim = function() {
	try {
		Sk.misceval.callsim.apply(null, arguments);
	} catch (err) {
		if (err instanceof Sk.builtin.SystemExit) {
			this.cppApp.onQuit();
		} else {
			this.cppApp.onError(err.toString());
			if (!this.stopping)
				this.stop();
		}
	}
}
/*
UserPyApp.prototype.runCode2 = function(func) {
	// find function
	func = Sk.globals[func];
	
	if (func && (func instanceof Sk.builtin.func)) {
		// change first arg from func name to func object
		arguments[0] = func;
		
		// convert args to python
		for (var i=1; i<arguments.length; i++)
			arguments[i] = Sk.ffi.remapToPy(arguments[i]);
		
		this.callSim.apply(this, arguments);
		return true;
	}
	return false;
}
*/
UserPyApp.prototype.runCode = function(code, bEval, bAsync) {
	this.runningCode = true;
	
	if (bEval) {
		//split lines on linefeed
        var lines = code.split('\n'), index = -1, line = 0;
		
		//finds lines starting with "print" 
        var re = new RegExp("\\s*print"),
        //finds import statements
        importre = new RegExp("\\s*import"),
        //finds multuline string constants
        mls = new RegExp("'''"),
        //finds defining statements
        defre = new RegExp("def.*|class.*"),
        //test for empty line.
        emptyline = new RegExp("^\\s*$"),
        //a regex to check if a line is an assignment
        //this regex checks whether or not a line starts with 
        //an identifier followed with some whitspace and then an = and then some more white space.
        //it also checks if the identifier is a tuple.
        assignment = /^((\s*\(\s*(\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*,)*\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*\)\s*)|(\s*\s*(\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*,)*\s*((\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*)|(\s*\(\s*(\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*,)*\s*((\s*[_a-zA-Z]\w*\s*)|(\s*\(\s*(\s*[_a-zA-Z]\w*\s*,)*\s*[_a-zA-Z]\w*\s*\)\s*))\s*\)\s*))\s*\s*))=/;

        //it's a onliner
        if (lines.length === 1) {
            //if it's a statement that should be printed (not containing an = or def or class or an empty line)
            if (!assignment.test(lines[0]) && !defre.test(lines[0]) && !importre.test(lines[0]) && lines[0].length > 0) {
                //if it doesn't contain print make sure it doesn't print None
                if (!re.test(lines[0])) {
                    //remove the statement
                    //evaluate it if nessecary
                    lines.push("_evaluationresult = " + lines.pop());
                    //print the result if not None
					lines.push("try:");
                    lines.push("  if not _evaluationresult == None: print repr(_evaluationresult)");
					lines.push("except: pass");
                }
            }
        }
		
		code = lines.join('\n');
	}
	
	// skulpt doesn't execute if code is empty
	if (code.length == 0)
		code = ' ';
	
	if (!bAsync) {
		try {
			Sk.importMainWithBody('repl', false, code);
		} catch (err) {
			if (err instanceof Sk.builtin.SystemExit) {
				this.cppApp.onQuit();
			} else {
				this.cppApp.onError(err.toString());
				if (!bEval) {
					if (!this.stopping)
						this.stop();
				}
			}
		}
		return;
	}
	
	var self = this;
	var promise = Sk.misceval.asyncToPromise(function() {
//			self.device.addSerialOutputs('* import main');
		Sk = self.sk;
		return Sk.importMainWithBody("<stdin>", false, code, true);
		
	}, {"*":function(susp) {
		Sk = self.sk;

		// limit number of suspensions, and resolve after 100ms of sim time
		self.runStatementCount++;
//			self.device.addSerialOutputs('* susp ' + self.runStatementCount + ", " + self.maxRunCount + ", " + self.nextTimer + "\n");
		if (self.maxRunCount < 0) {
			// do nothing
		} else if ((self.runStatementCount < self.maxRunCount) || (self.nextTimer)) {
			// if code is still running, then don't suspend
			if (self.runningCode) {
				return null;
			} else {
				self.cppApp.onEndRun(self.runStatementCount);
			}
		} else {
			self.cppApp.onEndRun(self.runStatementCount);
			self.runStatementCount = 0;
//				dprint('* starting timer');
			self.nextTimer = setSimulationTimeout(function() {
//					dprint('* timer done');
				// put back the saved sk instance
				Sk = self.sk;
				self.nextTimer = null;
				self.resume();
			}, self.cppApp.getNextRunTime());
		}
		
//			dprint('* susp return promise');
		var suspPromise = new Promise(function(resolve, reject) {
//				dprint('promise');
			Sk = self.sk;
			self.suspension = {
				susp: susp,
				resolve: resolve,
				reject: reject
			};
		});
		return suspPromise;
	}});

	promise.then(function(mod) {
		Sk = self.sk;
		// call the c++ app back to notify the app is done running
		self.cppApp.onFinished();
		
	}, function(err) {
		Sk = self.sk;
		
		if (err instanceof Sk.builtin.SystemExit) {
			self.cppApp.onQuit();
		} else {
			// call the c++ object back to notify the app has error and then stop it
			self.cppApp.onError(err.toString());
			if (!bEval) {
				if (!self.stopping)
					self.stop();
			}
		}
	});
}

UserPyApp.prototype.inputEnter = function(input) {
	var resolve = this.inputPromise.resolve;
	this.inputPromise = null;
	resolve(Sk.builtin.str(input));
}

UserPyApp.create = function(device) {
	var app = new UserPyApp(device, UserPyApp_tempCppApp);
	UserPyApp_tempCppApp = null;
	return $secreg(app);
}
