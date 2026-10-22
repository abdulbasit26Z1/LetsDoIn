
UserJsApp.prototype.initBasics = function(interpreter, scope) {

    var app = this;
    var wrapper;

    interpreter.getInt = function(obj, def) {
        var n = obj ? Math.floor(obj.toNumber()) : def;
        if (isNaN(n))
            n = def;
        return n;
    };
	
	function getNative(val) {
		if (val.type == 'number') {
			return val.toNumber();
		} else if (val.type == 'boolean') {
			return val.toBoolean();
		} else if (val.type == 'string') {
			return val.toString();
		} else if (val.type == 'object') {
			var obj;
			if (val.length >= 0)
				obj = [];
			else if (val.properties)
				obj = {};
			else
				return null;
			
			for (var i in val.properties) {
				obj[i] = getNative(val.properties[i]);
			}
			return obj;
		}
		return null;
	}
	interpreter.getNative = getNative;
	
	function fromNative(val) {
		var type = typeof(val);

		if (val == null) {
			return interpreter.createPrimitive(val);

		} else if ((type == 'number')
			|| (type == 'boolean')
			|| (type == 'string')) {
			return interpreter.createPrimitive(val);

		} else if (type == 'object') {
			var obj;
			if (val instanceof Array)
				obj = interpreter.createObject(interpreter.ARRAY);
			else
				obj = interpreter.createObject(interpreter.OBJECT);
			
			for (var i in val) {
				interpreter.setProperty(obj, i, fromNative(val[i]));
			}
			return obj;
		}
		
		return interpreter.createPrimitive(val);
	}
	interpreter.fromNative = fromNative;

    interpreter.immediateCall = function(thisExpression, funcName, args) {
        var state = {
            node: {
                type: "ExpressionStatement",
                start: 0,
                end: 0,
                expression: {
                    type: "CallExpression",
                    start: 0,
                    end: 0,
                    callee: {
                        type: "MemberExpression",
                        start: 0,
                        end: 0,
                        object: {
                            type: "ThisExpression",
                            start: 0,
                            end: 0
                        },
                        property: {
                            type: "Identifier",
                            start: 0,
                            end: 0,
                            name: funcName
                        },
                        computed: false

                    },
                    arguments: []
                }
            }
        };

        if (thisExpression) {
            if (typeof thisExpression == 'string') {
            } else {
                state.thisExpression = thisExpression;
            }
        }

//		dprint('immediateCall: ' + funcName);
        var parentScope = null;
        try {
            parentScope = this.getScope();
//			dprint('getScope() returned ' + parentScope);
        } catch (e) {
        }
		if (parentScope == null) {
            parentScope = this.scope;
//			dprint('using this.scope ' + parentScope);
		}

        state.scope = this.createScope({ type: 'FunctionExpression' }, parentScope);

        for (var i = 0; i < args.length; i++) {
            state.node.expression.arguments.push({
                type: 'Literal',
                start: 0,
                end: 0,
                raw: args[i].toString(),
                value: args[i]
            });
        }

        this.stateStack.unshift(state);

        if (app.runningCode) {
//			dprint('running code');
            this.step();
        } else if (!app.nextTimer) {
//			dprint('has no nextTimer');
            app.runCode(null, true);
		} else {
//			dprint('has nextTimer');
		}
    };
	
	interpreter.parseToFront = function(code) {
		this.ast = acorn.parse(code);
		this.stateStack.unshift({node: this.ast, scope: this.scope, thisExpression: this.scope});
		this.populateScope_(this.ast, this.scope);
	};
	
    wrapper = function() {
		// stop running, and then quit later
        app.runningCode = false;
        app.nextTimer = setSimulationTimeout(function() {
            app.cppApp.onQuit();
        }, 0);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'exit', interpreter.createNativeFunction(wrapper));

    wrapper = function(ms) {
        ms = interpreter.getInt(ms, 0);
        app.runningCode = false;
		interpreter.stateStack[0].pauseUntilSimTime = ipc.simulation().getCurrentSimTime() + ms;
        app.nextTimer = setSimulationTimeout(function() {
            app.runCode();
        }, ms);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'delay', interpreter.createNativeFunction(wrapper));

    var serial = interpreter.createObject(interpreter.OBJECT);
    interpreter.setProperty(scope, 'Serial', serial);
    wrapper = function(str) {
		app.cppApp.print(str);
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(serial, 'print', interpreter.createNativeFunction(wrapper));

    wrapper = function(str) {
        if (str == null || (str.data == null && str.toString() == 'null'))
            str = '';
		app.cppApp.print(str + '\n');
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(serial, 'println', interpreter.createNativeFunction(wrapper));
	
    var console = interpreter.createObject(interpreter.OBJECT);
    interpreter.setProperty(scope, 'console', console);
    wrapper = function(str) {
		for (var i=0; i<arguments.length; i++)
			app.cppApp.print(arguments[i]);
		app.cppApp.print('\n');
        return interpreter.UNDEFINED;
    };
    interpreter.setProperty(console, 'log', interpreter.createNativeFunction(wrapper));
	
	wrapper = function(prompt) {
        app.runningCode = false;
		app.cppApp.rawInput(prompt);
		return interpreter.UNDEFINED;
    };
    interpreter.setProperty(scope, 'input', interpreter.createNativeFunction(wrapper));

    wrapper = function(x, inMin, inMax, outMin, outMax) {
        /*		x = interpreter.getInt(x, 0);
        inMin = interpreter.getInt(inMin, 0);
        inMax = interpreter.getInt(inMax, 0);
        outMin = interpreter.getInt(outMin, 0);
        outMax = interpreter.getInt(outMax, 0);*/
        return interpreter.createPrimitive((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
    };
    interpreter.setProperty(scope, 'map', interpreter.createNativeFunction(wrapper));

    wrapper = function(rad) {
        return interpreter.createPrimitive(Math.sin(rad));
    };
    interpreter.setProperty(scope, 'sin', interpreter.createNativeFunction(wrapper));

    wrapper = function(rad) {
        return interpreter.createPrimitive(Math.cos(rad));
    };
    interpreter.setProperty(scope, 'cos', interpreter.createNativeFunction(wrapper));
	
	var isUsingMetric = ipc.options().isUsingMetric();
    wrapper = function() {
        return interpreter.createPrimitive(isUsingMetric);
    };
    interpreter.setProperty(scope, 'isUsingMetric', interpreter.createNativeFunction(wrapper));	
	
	function onOptionsChanged(src, args) {
		var oldIsUsingMetric = isUsingMetric;
		isUsingMetric = ipc.options().isUsingMetric();
		if (isUsingMetric != oldIsUsingMetric) {
			app.runCode('measurementSystemChangeEvent();');
		}
	}
	ipc.options().registerEvent('optionsChanged', null, onOptionsChanged);
	app.finalizers.push({cleanUp: function() {
		ipc.options().unregisterEvent('optionsChanged', null, onOptionsChanged);
	}});
}
