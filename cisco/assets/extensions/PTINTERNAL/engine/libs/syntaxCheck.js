var variableArray = [];
var setArray = [];
var sendArray = [];

function getInitValue(param)
{
	if (param.type == "Literal")
	{
		return "\"" + param.value + "\"";
	}
	else if (param.type == "Device")
	{
		return "this.getDeviceData(\"" + param.value + "\")";
	}
	else if (param.type == "Identifier")
	{
		if (param.name != "on" && param.name != "off" && param.name != "now" && param.name != "running" && param.name != "timed" && param.name != "stopped" && param.name != "standby" && param.name != "cooling" && param.name != "heating")
		{
			throw new Error("Unknown identifier:" + param.name);
		}
		return param.name;
	}
	else if (param.type == "PtLiteralWithUnit")
	{
		var re = new RegExp(/[A-Za-z]+/);
		var unit = re.exec(param.value);
		if (unit == null)
			throw new Error("Unknown unit");
			
		var value = param.value.replace(unit, "");
		if (unit == "C")
			return "celsius(" + value + ")";
		else if (unit == "F")
			return "fahrenheit(" + value + ")";
		else if (unit == "in")
			return "inches(" + value + ")";
		else if (unit == "cm")
			return "cm(" + value + ")";
		else if (unit == "kmph")
			return "kmph(" + value + ")";
		else if (unit == "mph")
			return "mph(" + value + ")";
		else if (unit == "mbar")
			return "mbar(" + value + ")";
		else if (unit == "inHg")
			return "inHg(" + value + ")";
		else if (unit == "kg")
			return "kg(" + value + ")";
		else if (unit == "lb")
			return "lb(" + value + ")";
		else
			throw new Error("Unknown unit:" + unit);
	}
	return "";
}

function isPropertyValid(param)
{
	if ((param != "level") &&
		(param != "state") &&
		(param != "temp") &&
		(param != "time") &&
		(param != "isOpened") &&
		(param != "currentTime"))
	{
		return false;
	}
	return true;
}


function getVariables(param, originalCommandObject, devices)
{
	var output = "";
	if (param.hasOwnProperty('left'))
	{
		output += getVariables(param.left, originalCommandObject, devices);
	}
	if (param.hasOwnProperty('right'))
	{
		output += getVariables(param.right, originalCommandObject, devices);
	}
	if (param.hasOwnProperty('type'))
	{
		if (param.type == "Identifier")
		{
			getInitValue(param);
			//no need to support identifier now.
			//output += "var " + param.name + ";\n";
			//variableArray.push({key:param.name, value:"undefined"});
		}
		else if (param.type == "SetDeclaration")
		{
			if (param.declarations.id.type == "Device")
			{
				var bFoundDevice = false;
				var deviceId = param.declarations.id.value;
				for (var id in devices) {
					var deviceInfo = devices[id];
					if ((deviceInfo.deviceId == deviceId) || (deviceInfo.alias == deviceId)) {
						deviceId = deviceInfo.deviceId;
						bFoundDevice = true;
						break;
					}
				}
				if (!bFoundDevice)
					throw new Error("Unknown device:" + deviceId);
				output += "this.setDeviceValue(\"" + deviceId + "\", " + getInitValue(param.declarations.init) + ")";
			}
			else if (param.declarations.id.type == "Identifier")
			{
				output += "set variable(\"" + param.declarations.id.name + "\") to " + getInitValue(param.declarations.init) + "\n";
				variableArray.push({key:param.declarations.id.name, value:10});
			}
		}
		else if (param.type == "SendDeclaration")
		{
			if (param.declarations.id.type == "Device")
			{
				throw new Error ("Device must be qualified with an attribute in send");
			}
			else if (param.declarations.id.type == "MemberExpression")
			{
				var bFoundDevice = false;
				var deviceId = param.declarations.id.object.value;
				for (var id in devices) {
					var deviceInfo = devices[id];
					if ((deviceInfo.deviceId == deviceId) || (deviceInfo.alias == deviceId)) {
						deviceId = deviceInfo.deviceId;
						bFoundDevice = true;
						break;
					}
				}
				if (!bFoundDevice)
					throw new Error("Unknown device in send:" + deviceId);
					
				if (isPropertyValid(param.declarations.id.property.name) == false)
					throw new Error("Unknown device attribute in send:" + param.declarations.id.property.name);
				output += "this.setDeviceData(\"" + deviceId + "\", \"" + param.declarations.id.property.name + "\", " + getInitValue(param.declarations.init) + ");";
			}
		}
		else if (param.type == "MemberExpression")
		{
			// supported members go here
			/*
			if ((param.property.name != "level") &&
				(param.property.name != "state") &&
				(param.property.name != "temp") &&
				(param.property.name != "time") &&
				(param.property.name != "currentTime"))
			*/
			if (isPropertyValid(param.property.name) == false)
				throw new Error("Unknown device attribute:" + param.property.name);
		}
		else if (param.type == "PtLiteralWithUnit")
		{
		/*
			var re = new RegExp(/[A-Za-z]+/);
			var unit = re.exec(param.value);
			if (unit == null)
				throw new Error("Unknown unit");
				
			var value = param.value.replace(unit, "");
			if (unit == "C")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "celsius(" + value + ")");
			else if (unit == "F")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "fahrenheit(" + value + ")");
			else if (unit == "in")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "inches(" + value + ")");
			else if (unit == "cm")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "cm(" + value + ")");
			else if (unit == "kmph")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "kmph(" + value + ")");
			else if (unit == "mph")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "mph(" + value + ")");
			else if (unit == "mbar")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "mbar(" + value + ")");
			else if (unit == "inHg")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "inHg(" + value + ")");
			else if (unit == "kg")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "kg(" + value + ")");
			else if (unit == "lb")
				originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, "lb(" + value + ")");
			else
				throw new Error("Unknown unit:" + unit);
			*/
			originalCommandObject.syntax = originalCommandObject.syntax.replace(param.value, getInitValue(param));
		}
		else if (param.type == "ExpressionStatement")
		{
			throw new Error("Unknown expression:" + param.expression.name);
		}
		else if (param.type == "Device")
		{
			// if device is specified with an attribute, MemberExpression would have process it.
			throw new Error("Device must be qualified with an attribute");
		}
	}
	return output;
}

// convert a device name to device() format
function toDevices(expression, devices)
{
	var n1 = 0;
	var n2 = 0;
	while (true)
	{
		n1 = expression.indexOf("'", n1);
		n2 = expression.indexOf("'", n1+1);
		if ((n1 != -1) && (n2 != -1))
		{
			var deviceId = expression.substr(n1+1, n2-n1-1);
			var bFoundDevice = false;
			for (var id in devices) {
				var deviceInfo = devices[id];
				if ((deviceInfo.deviceId == deviceId) || (deviceInfo.alias == deviceId)) {
					deviceId = deviceInfo.deviceId;
					bFoundDevice = true;
					break;
				}
			}
dprint("toDevices==>"+deviceId);			
			if (!bFoundDevice)
				throw new Error("Unknown device: " + deviceId);
			expression = expression.substr(0, n1) + "this.getDeviceData(\"" + deviceId + "\")" + expression.substr(n2+1);
			n1 = 0;
		}
		else
		{
			break;
		}
	}
	return expression;
}

function checkSyntax(descriptionText, conditionText, actionText, conditions, userDevices)
{
	var output = "";
	var variableStrings = "";
	var testString = "if (" + conditionText + ") {}";
	var conditionString = "";
	try
	{
		// conditional statement
		var conditionObject = {};
		conditionObject.syntax = conditionText;
		var result = jsparser.parse(testString);
		getVariables(result.body[0].test, conditionObject, userDevices);
		conditionString = toDevices(conditionObject.syntax, userDevices);


		// block statement within condition
		var actionObject = {};
		actionObject.syntax = actionText;
		result = jsparser.parse(actionText);
		for (var i=0; i<result.body.length; i++)
		{
			output += getVariables(result.body[i], actionObject, userDevices);
		}
	}
	catch(err)
	{
		return err+"";
	}
	
	var deviceInfo = { condition:conditionString,
		action:output
	};
	conditions[descriptionText] = deviceInfo;
	return "";
}
