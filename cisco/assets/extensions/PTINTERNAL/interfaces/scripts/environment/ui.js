var static_colors = ["#dbca5c","#2d7391","#bbe24f","#34d33f","#04a1d6","#48e83a","#4011fc","#b7e572","#d104ae","#0a07ed","#d84bd6","#9ab4ed","#a8ffbb","#b8b3ef","#29910d","#f9d7b8","#8394f7","#f450de","#28af45","#0524af","#2c6d99","#318706","#ed8090","#ff11b7","#2a7491","#c4f28c","#2da812","#7df2e4","#98aff9","#53e086","#f9cc36","#d6f282","#077741","#a1abed","#30ba47","#18a513","#eefc50","#fce7bf","#52d384","#6ea31a","#e26c68","#d80673","#e2c6ff","#8b69e0","#95badb","#e023aa","#ffd989","#30b7c9","#e2e544","#f44af7","#8df257","#28ba6c","#1daf53","#d1ff68","#db23d5","#ffbfe9","#78edc4","#8dd628","#b5ea81","#9ff4b8","#0766af","#e2967f","#6916c9","#ef81c5","#f74275","#efdb02","#0be5de","#f7b4ef","#44dd7c","#6786d3","#e146f2","#4cdb66","#d95add","#f970be","#672aa8","#c111e0","#f3ccff","#d2e23b","#267ccc","#72ffde","#4e69b7","#cc950c","#53db92","#ff9391","#9778ed","#e0d91a","#7857c1","#c17f15","#d35028","#fce2c4","#7ed356","#cc29f4","#e100ed","#1d518c","#d6dd68","#374dc6","#3597b2","#fcdbba","#7df263","#99e87a"];

var gExpandedTreeNodes = new Array();
var tree, viewTree = null;
gLastSelectedEnvironmentID = "";

function getRootNodes()
{
    /*
  return [
      "Light (Sun)",
      "Temperature",
      "Sound",
      "Wind",
      "Water",
      "Motion",
      "Soil",
      "Gases",
      "Radiation",
      "Gravity",
      "Energy",
      "Electricity",
  ];
  */
    return gEnvironmentCategories;
}

function getEnvironmentsForCategory(name)
{
  var cats = gEnvironmentOptions;
  if ( $.isArray(cats[name]) )
      return cats[name];
}

function setInterpolate(name)
{
    if (event.target.type != "checkbox")
        return;  
    
    gEnvironment.setAllInterpolate(name, event.target.checked);
//    gEnvironmentOptionsMap[name].setInterpolate(event.target.checked);
}

function setShow(name)
{
console.log("set show", name);
    if (event.target.type != "checkbox")
        return;    
    gEnvironment.setAllShow(name, event.target.checked);
    
//    gEnvironmentOptionsMap[name].setShow(event.target.checked);
}

function setValue(name)
{
    event.target.style.color = "black";
    
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getValue();
        return;
    }
    

    gEnvironmentOptionsMap[name].setValue(event.target.value);
}

function setMin(name)
{
    event.target.style.color = "black";
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getMin();
        return;
    }    
    gEnvironment.setAllMin(name, event.target.value);
}

function setMax(name)
{
    event.target.style.color = "black";
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getMax();
        return;
    }    
    gEnvironment.setAllMax(name, event.target.value);
}



function setMinRate(name)
{
    event.target.style.color = "black";
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getMinRate();
        return;
    }    
    gEnvironment.setAllMinRate(name, event.target.value);
}

function setMaxRate(name)
{
    event.target.style.color = "black";
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getMaxRate();
        return;
    }    
    gEnvironment.setAllMaxRate(name, event.target.value);
}

function setManualAdjustment(name)
{
    event.target.style.color = "black";
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  "";
        return;
    }    
    gEnvironment.setManualAdjustment(name, event.target.value);
}


function setTransference(name)
{
    event.target.style.color = "black";
    
    if ( !$.isNumeric(event.target.value) )
    {
        alert("Please enter a number.");
        event.target.value =  gEnvironmentOptionsMap[name].getTransference();
        return;
    }
    
    
    gEnvironment.setAllTransference(name, event.target.value);    
//    gEnvironmentOptionsMap[name].setTransference(event.target.value);
}

function setActive(name, bChecked)
{
    gEnvironment.setKeyframeActive(gCurrentKeyframeIndex, name, bChecked);
//    gEnvironmentOptionsMap[name].setActive(bChecked);
}

function highlightRed()
{
     event.target.style.color = "blue";
}

function highlightReset()
{
    event.target.style.color = "black";
}

function getItemTemplate(env)
{
    var title = $("<div class='title'><span title='ID: "+env.getID()+"'>"+env.getName()+"</span></div>");
    var id = $("<ID style='display:none'>").append(env.getID());
    var settings = $("<div class='settings'></div>") 
        .append("<label>Init Value: &nbsp;</label>")
        .append($("<input class='textInput'></input>")
                .attr("onchange", "setValue('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getValue()))
        .append(" &nbsp;" + gEnvironment.getUnit(env.getID()));
    var globalSettings = $("<div class='globalSettings'></div>")
        .append("<label> &nbsp;Transference: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setTransference('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getTransference()))
        .append($("<label>")
                .append($("<input class='checkbox' type='checkbox' />")
                    .attr("checked", env.isInterpolate()))
                    .attr("onclick", "setInterpolate('"+env.getID()+"')")         // tree eats jquery events
                .append("Interpolate"))
        .append($("<label>")
                .append($("<input class='checkbox' type='checkbox' />")
                    .attr("checked", env.isShow()))
                    .attr("onclick", "setShow('"+env.getID()+"')")
                .append("Show"));
       var advanced_settings = $("<div class='advancedSettings'></div>")
        .append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        .append("<label>Min Value: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setMin('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getMin()))
        .append(" &nbsp;<label>Max Value: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setMax('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getMax()))
                
        .append("<label title='min rate of change per second due to transference'>&nbsp;Min Rate: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setMinRate('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getMinRate()))
        .append(" &nbsp;<label title='max rate of change per second due to transference'>Max Rate: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setMaxRate('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getMaxRate()))
        .append(" &nbsp;<label title='add or subtract a particular value from the calculated values'>Manual Adjustment: &nbsp;</label>")
        .append($("<input class='textInput'>")
                .attr("onchange", "setManualAdjustment('"+env.getID()+"')")
                .attr("onfocus", "highlightRed()")
                .attr("onfocusout", "highlightReset()")
                .attr("value", env.getManualAdjustment()));
                                
    var value = "";//$("<div id='value_"+env.getID()+"'>33</div>");
    var template = $("<div/>").append(title).append(id).append(value).append(settings).append(globalSettings).append(advanced_settings);
    var out = "<div class='item'>"+template.html()+"</div>";
    return out;
}


function constructTree()
{

    saveExpanded();

		
    $("#tree").fancytree({
        
        extensions: ["filter"],
	    quicksearch: true,
        source: [],
        checkbox: true,
        icons: false,
        keyboard: false,
        selectMode: 3,
        
        expand: function(event, data)
        {
            showHideAdvancedSettings();
        },
        select: function(event, data){
 
            if ( data.node.getParent().title == "root")
            {
                var envNodes = data.node.getChildren();
                for(var i=0; i<envNodes.length; i++)
                {
                    var env = $(envNodes[i].title).find("ID").html();
                    setActive(env, data.node.isSelected());
                }
                return;
            }
            
            var env = $(data.node.title).find("ID").html();
            setActive(env, data.node.isSelected());
        },
        click: function(event, data)
        {
           if ( data.node.getParent().title == "root"){
             return;
           }
           gLastSelectedEnvironmentID = $(data.node.title).find("ID").html();
            
        }, 
        filter: {
			autoApply: false,  // Re-apply last filter if lazy data is loaded
			counter: false,  // Show a badge with number of matching child nodes near parent icons
			fuzzy: false,  // Match single characters in order, e.g. 'fb' will match 'FooBar'
			hideExpandedCounter: true,  // Hide counter badge, when parent is expanded
			highlight: false,  // Highlight matches by wrapping inside <mark> tags
			mode: "hide"  // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
		},
    });

    tree = $("#tree").fancytree("getTree");


    
    var rootNodes = getRootNodes();
    for (var i=0; i<rootNodes.length; i++)
    {
        tree = $("#tree").fancytree("getTree");

        var category = tree.getRootNode().addChildren({
            title: rootNodes[i], folder: true
        });

        var environments = getEnvironmentsForCategory(rootNodes[i]);

        for(var j=0; j<environments.length; j++)
        {
            category.addChildren(
                {
                    title: getItemTemplate(environments[j]),
                    selected: environments[j].isActive(),
                    
           
                }
            );
        }
    }
    
    restoreExpanded();
    
//    doTreeVisibility(); 
    
    $("#tree").fancytree("getRootNode").sortChildren(null, true);
    
    
    
    $("#editSearchBtn").click(function()
    {
        editSearch($("input[name=editSearch]").val());
    });
    
    $("#editResetBtn").click(function()
    {
        $("input[name=editSearch]").val("");
        editSearch($("input[name=editSearch]").val());
    });
    
    
    $("input[name=editSearch]").keyup(function(e){ 
    
    
        var key = event.keyCode || event.which;

        if (key !== 13) {
            return false;
        }
               
        editSearch($(this).val());
			
    });    
    
    
    
    $("input[name=editSearch]").keyup(function(e){         

	});    
	
    $("#tree").fancytree("getTree").filterNodes( $("input[name=editSearch]").val(), 
        {
            autoExpand: $("#autoExpand").is(":checked"),
			leavesOnly: $("#leavesOnly").is(":checked")
			}
	);		
		
    showHideAdvancedSettings();

}

function editSearch(val)
{
	var n,
		opts = {
			autoExpand: $("#autoExpand").is(":checked"),
			leavesOnly: $("#leavesOnly").is(":checked")
		},
		match = val;

	if($("#regex").is(":checked")) {
		// Pass function to perform match
		n = $("#tree").fancytree("getTree").filterNodes(function(node) {
			return new RegExp(match, "i").test(node.title);
		}, opts);
	} else {
		// Pass a string to perform case insensitive matching
		n = $("#tree").fancytree("getTree").filterNodes(match, opts);
	}
	$("span#matches").text("(" + n + " matches)");
}

function doTreeVisibility() {
    tree = $("#tree").fancytree("getTree");
    tree.filterNodes(function(node) {
        var bShow = true;
        try{
            var id = $(node.title).find("ID").html();
            
            var keyframe = gEnvironment.getKeyframeAt(gCurrentKeyframeIndex);
        
        
            var envOpt = keyframe.getEnvironment(id);    
                
            if ( envOpt.isActive() && !$("#visibility_active")[0].checked )
                bShow = false;
           
            if ( !envOpt.isActive() && !$("#visibility_not_active")[0].checked )
                bShow = false;
            
            if ( envOpt.isShow() && !$("#visibility_show")[0].checked )
                bShow = false;

            if ( !envOpt.isShow() && !$("#visibility_not_show")[0].checked )
                bShow = false;

            return bShow;
            
        } catch(err)
        {
            return true;
        }
    }, {autoExpand: false});
}

function saveExpanded()
{

    if ( tree != null )
    {

        gExpandedTreeNodes.length = 0;
        tree = $("#tree").fancytree("getTree");
        tree.visit(function(node){
            if ( node.isExpanded() )
                gExpandedTreeNodes.push(node.title);
        });
    }    
}

function restoreExpanded()
{
    if ( tree != null )
    {
        for(var i=0; i<gExpandedTreeNodes.length; i++)
        {
            tree.findFirst(gExpandedTreeNodes[i]).setExpanded(true);
        }
    }    
}

function constructSimulationSettings()
{
    var realSecondsCombo = $("<select id='realSecondsCombo'>")
        .append("<option value='1'>Second(s)")
        .append("<option value='60'>Minute(s)")
//        .append("<option value='3600'>Hour(s)")
        .val(gEnvironment.getRealTimeCombo())
        .change(updateSimulationMultiplier);

    var simSecondsCombo = $("<select id='simSecondsCombo'>")
        .append("<option value='1'>Second(s)")
        .append("<option value='60'>Minute(s)")
//        .append("<option value='3600'>Hour(s)")
        .val(gEnvironment.getSimTimeCombo())
        .change(updateSimulationMultiplier);

    $("simulation_settings")
        .append("Simulation Time Scale: ")
        .append($("<input id='realTime' class='textInput' type='number'>")
                .attr("value", gEnvironment.getRealTimeSetting() )
                .change(updateSimulationMultiplier)
                .keydown(filterOnlyIntegers))
        .append(realSecondsCombo)
        .append("is equal to")
        .append($("<input id='simTime' class='textInput'>")
                .attr("value", gEnvironment.getSimTimeSetting())
                .change(updateSimulationMultiplier)
                .keydown(filterOnlyIntegers))
        .append("simulated ")
        .append(simSecondsCombo); 
    

    // tell the engine to assign the multiplier
    updateSimulationMultiplier();
}

function filterOnlyIntegers(e)
{
    // Allow: backspace, delete, tab, escape, enter and . (190), removed decimals
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
         // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function updateSimulationMultiplier()
{
    var bError = false;
    
    var simTimeTotal = $("#simTime").val() * $("#simSecondsCombo").val();
    var realTimeTotal = $("#realTime").val() * $("#realSecondsCombo").val();
    
    if ( !($.isNumeric($("#simTime").val())) || !($.isNumeric($("#realTime").val())) )
    {
        alert("Please enter a number.");
        bError = true;
    }
    else if ( simTimeTotal < 1 || simTimeTotal > 3600 
           || realTimeTotal < 1 || realTimeTotal > 3600 
    )
    {
        alert("The minimum value is 1 second and the maximum is 3600 seconds.");
        bError = true;
    }
    
    if ( bError )
    {
        $("#simTime").val( gEnvironment.getSimTimeSetting() );
        $("#realTime").val( gEnvironment.getRealTimeSetting());
        return;
    }
    
    
    

    
    var multiplier = simTimeTotal/realTimeTotal;
    
    gEnvironment.setSimTimeSetting( $("#simTime").val() );
    gEnvironment.setRealTimeSetting( $("#realTime").val() );
    gEnvironment.setSimTimeCombo( parseInt($("#simSecondsCombo").val()) );
    gEnvironment.setRealTimeCombo( parseInt($("#realSecondsCombo").val()) );
    gEnvironment.setTimeMultiplier(multiplier);
}

function constructTimeLine()
{
    var timeZones = new Array();
    for(var i=12; i>0; i--)
        timeZones.push("<option>(GMT-"+i+":00)</option>");
    for(var i=1; i<13; i++)
        timeZones.push("<option>(GMT-"+i+":00)</option>");


    var timeZoneCombo = $("<select>").append(timeZones);

    var timeIncrementCombo = $("<select id='increments'>")
        .append("<option value='1'>1 Second")
        .append("<option value='60' selected>1 Minute")
        .append("<option value='900'>15 Minutes")
        .append("<option value='1800'>30 Minutes")
        .append("<option value='2700'>45 Minutes")
        .append("<option value='3600'>60 Minutes");

    $("timeline")
        .append("Time Line: ")
        //.append("<timeLineTime>"+getKeyframeTimeAsHHMMSS()+"</timeLineTime>")
        .append('<input type="text" id="timeLineTime" size="10">')
        .append($("<button class='timeBtn'>+</button>").click(plusTime))
        .append($("<button class='timeBtn'>-</button>").click(minusTime))
//        .append("Time Zone: ")
//        .append(timeZoneCombo)
        .append("Time Increment:")
        .append(timeIncrementCombo);


    var timeEntry = $("#timeLineTime").timeEntry({ showSeconds: true });
    
    updateTimeLineClock(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());

    timeEntry.change(function() {

        var seconds = $("#timeLineTime").timeEntry('getTime').getHours() * 60 * 60
            + $("#timeLineTime").timeEntry('getTime').getMinutes() * 60
            + $("#timeLineTime").timeEntry('getTime').getSeconds();

        setTime(seconds);
    });
    
    $(".timeEntry-control").hide();
}


function constructKeyframes() {

    var keyframeTemplates = $("<select id='keyframeTemplates'>");
    for(var i=0; i<gEnvironment.getKeyframeTemplateCount(); i++)
    {
        var templateName = gEnvironment.getKeyframeTemplateAt(i);
        keyframeTemplates.append("<option value='"+templateName+"'>"+templateName);
    }

    $("keyframes")
        .append("Keyframes: ")
        .append("<currentKeyframe>"+(gCurrentKeyframeIndex+1)+"</currentKeyframe>/<totalKeyframe>"+gEnvironment.getKeyframeCount()+"</totalKeyframe>")
        .append($("<button id='prevKeyframeBtn'>")
                .append("Previous")
                .click(prevKeyframe))
        .append($("<button id='nextKeyframeBtn'>")
                .append("Next")
                .click(nextKeyframe))
        .append("|")
        .append($("<button id='setAddKeyframeBtn'>")
                .append("Add Keyframe")
                .click(addKeyframe))
        .append($("<button id='removeKeyframeBtn'>")
                .append("Remove")
                .click(removeKeyframe))
        .append("<br>Defaults:")
        .append(keyframeTemplates)
        .append($("<button id='importKeyframe'>")
            .append("Import")
            .click(importKeyframe))
        .append("|")        
        .append($("<button id='exportKeyframes'>")
            .append("Export File")
            .click(exportKeyframe))
        .append($("<button id='importKeyframeFromFile'>")
            .append("Import File")
            .click(importKeyframeFromFile))            
}

var _locations = new Array();
function constructLocation()
{

    _locations = new Array();
    var obj = ipc.appWindow().getActiveWorkspace().getRootPhysicalObject();
    getLocations(obj, 0, _locations);
    var currentPO = ipc.appWindow().getActiveWorkspace().getCurrentPhysicalObject();
    var currentIndex = 0;
    var locationCombo = $("<select id='locationCombo'>")
    for (var i in _locations) {
        var padding = "";
        for (var j = 0; j < _locations[i].level; j++)
            padding = padding + "&nbsp;&nbsp;";
        var paddedName = padding + _locations[i].physObj.getName();
        locationCombo.append("<option value="+i+">"+paddedName);
        if ( currentPO.getName() == _locations[i].physObj.getName() )
        {
            currentIndex = parseInt(i);
        }
    }  
    

    locationCombo.change(function() {
        var bLogicalView = false;
        if ( ipc.appWindow().getActiveWorkspace().isLogicalView() )
            bLogicalView = true;
            
        ipc.appWindow().getActiveWorkspace().switchToPhysicalObject(_locations[$("#locationCombo").val()].physObj);

        if ( bLogicalView )
            ipc.appWindow().getPLSwitch().showLogicalMode();
    });
    
    
    locationCombo.mouseenter(function()
    {   
       _locations = new Array();
        var obj = ipc.appWindow().getActiveWorkspace().getRootPhysicalObject();
        getLocations(obj, 0, _locations);
        var currentPO = ipc.appWindow().getActiveWorkspace().getCurrentPhysicalObject();
        var currentIndex = 0;
    
         $("#locationCombo").empty();
        for (var i in _locations) {
            var padding = "";
            for (var j = 0; j < _locations[i].level; j++)
                padding = padding + "&nbsp;&nbsp;";
            var paddedName = padding + _locations[i].physObj.getName();
            locationCombo.append("<option value="+i+">"+paddedName);
            if ( currentPO.getName() == _locations[i].physObj.getName() )
            {
                currentIndex = parseInt(i);
            }
        }  
        $("#locationCombo").val(currentIndex);

    });


                
    $("location").empty();
    $("location").append(locationCombo);
    
    
    $("#locationCombo").val(currentIndex);
       
//    $("#locationCombo option[value="+currentIndex+"]").text(locations[currentIndex].physObj.getName());

}

function getLocations(physObj, level, locations) {
        
    // skip racks, tables, and devices  
    if ( ( physObj.getType() == 0
        || physObj.getType() == 1
        || physObj.getType() == 2
        || physObj.getType() == 3
        || physObj.getType() == 8) )      
        _locations.push({ "physObj": physObj, "level": level });
    level++;
    for (var i = 0; i < physObj.getChildCount(); i++) {
        getLocations(physObj.getChildAt(i), level, _locations);
    }
    return _locations;
}





function constructTimeDisplay()
{  
    $("time").html( getCurrentTimeAsHHMMSS() );
}

function editTimeDisplay()
{
    $("#editTimeBtn").hide();
    $("#editTimeOKBtn").show();
    $("#editTimeCancelBtn").show();
    
    $("#toggle_time").hide();
    stopLoop();
    gEnvironment.pauseTime();
    $("#toggle_time").html("Start");
 
     $("time").empty();
     $("time").append('<input type="text" id="displayTime" size="10">');
  
    var timeEntry = $("#displayTime").timeEntry({ showSeconds: true, show24Hours: true});
    
    var d = new Date(getCurrentTime()*1000);
    $("#displayTime").timeEntry("setTime", d.getUTCHours() +":"+ d.getUTCMinutes() +":"+ d.getUTCSeconds());    

    timeEntry.focus();

    timeEntry.focusout(function() {
        
        console.log("focus out");
        
        editTimeOKBtnHandler();
    });

    $(".timeEntry-control").hide();

}

function editTimeOKBtnHandler()
{
    var seconds = $("#displayTime").timeEntry('getTime').getHours() * 60 * 60
        + $("#displayTime").timeEntry('getTime').getMinutes() * 60
        + $("#displayTime").timeEntry('getTime').getSeconds();
    editTimeSet(seconds);
}

function editTimeCancelBtnHandler()
{
    editTimeSet( gEnvironment.getTimeInSeconds() );
}


function editTimeSet(seconds)
{
    gEnvironment.setTimeInSeconds(seconds);
  
    startLoop();
    
    gEnvironment.resumeTime();
    $("#toggle_time").html("Pause");
    $("#toggle_time").show();
    $("#editTimeBtn").show();
    $("#editTimeOKBtn").hide();
    $("#editTimeCancelBtn").hide();
}



function displayValues()
{

    /*
    // show the values
    var envKeys = gEnvironment.getEnvironmentKeys();
    for(var i=0; i<envKeys.length; i++)
    {
        var env = gEnvironment.getEnvironment(envKeys[i]);
        
        if ( !env.isShow() && env.hasChanged() )
            continue;
        
        $("#value_"+env.getID().replace(/ /g, "_")).html(gEnvironment.getValueWithUnit(envKeys[i]));
       
    } 
    */
    try{
        var envChanges = JSON.parse(gEnvironment.getChangesAsJSON());
        for(envID in envChanges)
        {
            $("#value_"+envID.replace(/ /g, "_")).html(envChanges[envID]);
        }
    } catch(e){};
    
}

function displayNextKeyValues()
{
    var envKeys = gEnvironment.getEnvironmentKeys();
    for(var i=0; i<envKeys.length; i++)
    {
        var env = gEnvironment.getEnvironment(envKeys[i]);
        
        if ( !env.isShow() )
            continue;
        
        var keyframeIndex = gEnvironment.getKeyframeIndexAtTime(gEnvironment.getNextKeyTime());
        var keyframe = gEnvironment.getKeyframeAt(keyframeIndex);
        var value = keyframe.getEnvironment(envKeys[i]).getValue();
        
        var envID = env.getID().replace(/ /g, "_");
        

        
        var parentValues = "";
        var parentEnvironment = gEnvironment.parentEnvironment();

        while(parentEnvironment != null)
        {
            var parentEnvObj = parentEnvironment.getEnvironment(env.getID());
            if ( parentEnvObj != null )
               parentValues +=  parseFloat(parentEnvObj.getValue()).toFixed(2) + " ";
            parentEnvironment = parentEnvironment.parentEnvironment();
        }    
        
        
         $("#debug_value_"+envID).html("nkf: " + value + " parents: " + parentValues);
                
    }  
}



function setShowNotes(name)
{
console.log("set show notes");
    if (event.target.type != "checkbox")
        return;    
    gEnvironment.setShowNotes(event.target.checked);
}

function constructNotes()
{
    var notes = gEnvironment.getNotes();
    var bShowNotes = gEnvironment.isShowNotes();
    $("notes_editor")
        .append($("<textarea class='notes'>")
                .val((notes.length>0)?notes:"Notes about the environment.")
                .bind('input propertychange', function() {
                    gEnvironment.setNotes(this.value);
                }))
        .append($("<label>")
        .append($("<input class='checkbox' type='checkbox' />")
            .attr("checked", bShowNotes))
            .click(setShowNotes)
        .append("Show Notes in View Mode"))
    

}


///// keyframe controls
function prevKeyframe()
{
    if ( (gCurrentKeyframeIndex-1) < 0 )
        return;
    

    gCurrentKeyframeIndex--;
    
    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
    
    setTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    $("timeLineTime").html(getCurrentTimeAsHHMMSS());    
    updateTimeLineClock(getCurrentTime());
    
    constructTree();
    updateKeyframeDisplay();
    
    setCurrentEnvironmentFromKeyframe();
    gEnvironment.setCurrentKeyTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    gEnvironment.setNextKeyTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
}

function nextKeyframe()
{
    if ( (gCurrentKeyframeIndex+1) >= gEnvironment.getKeyframeCount() )
        return;
    
    gCurrentKeyframeIndex++;
    
    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
    
    setTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    $("timeLineTime").html(getCurrentTimeAsHHMMSS());    
    updateTimeLineClock(getCurrentTime());
    
    constructTree();
    updateKeyframeDisplay();
    
    setCurrentEnvironmentFromKeyframe();
    
    gEnvironment.setCurrentKeyTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    gEnvironment.setNextKeyTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    
}

function refreshKeyframeDisplay()
{
    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
    
    setTime(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
    $("timeLineTime").html(getCurrentTimeAsHHMMSS());    
    updateTimeLineClock(getCurrentTime());
    
    constructTree();
    updateKeyframeDisplay();
    
    setCurrentEnvironmentFromKeyframe();    
}

function setCurrentEnvironmentFromKeyframe()
{
    var envKeys = gEnvironment.getEnvironmentKeys();

    for(var i=0; i<envKeys.length; i++)
    {
    //    for(var i=0; i<gEnvironment.getEnvironmentOptionsCount(); i++)
//  {
        var env = gEnvironment.getEnvironment(envKeys[i]);
        env.setValue(gEnvironmentOptionsMap[env.getID()].getValue());
//    }
    }
}

function updateKeyframeDisplay()
{
    updateKeyframeNumbers();    
    //$("timeLineTime").html(getKeyframeTimeAsHHMMSS());
    updateTimeLineClock(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
            
}

function updateKeyframeNumbers()
{
    if ( gEnvironment.getKeyframeIndexAtTime(gEnvironment.getTimeInSeconds()) < 0 )
    {
       $("currentKeyframe").html("NEW");
    }
    else{
       $("currentKeyframe").html((gCurrentKeyframeIndex+1));
    }
    $("totalKeyframe").html(gEnvironment.getKeyframeCount());

}

function addKeyframe()
{
//    ipc_addKeyframe();
//    gCurrentKeyframeIndex++;
//    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
//    constructTree();
    if ( gEnvironment.getKeyframeIndexAtTime(gEnvironment.getStagingKeyframe().getTime()) != -1 ){
        alert("A keyframe already exists at this time, please choose another time.");
        return;
    }
    
    gCurrentKeyframeIndex = gEnvironment.addKeyframeFromStaging();
    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
    constructTree();    
    updateKeyframeDisplay();
    
}

function removeKeyframe()
{
    if ( gCurrentKeyframeIndex == 0 || gCurrentKeyframeIndex==(gEnvironment.getKeyframeCount()-1) )
    {
        alert("This keyframe cannot be removed.");
        return;
    }

    gEnvironment.removeKeyframe(gCurrentKeyframeIndex);
    gCurrentKeyframeIndex--;
    ipc_getKeyframeEnvironmentOptions(gCurrentKeyframeIndex);
    constructTree();    
    updateKeyframeDisplay();
}

function exportKeyframe()
{
    gEnvironment.exportToFile();
}

function importKeyframe()
{
    gEnvironment.importKeyframeTemplate($("#keyframeTemplates").val());
    window.location = window.location;
}

function importKeyframeFromFile() {
    gEnvironment.importFromFile();
    window.location = window.location;
}


function updateTimeLineClock(timeInSeconds)
{
    var d = new Date(timeInSeconds*1000);
    $("#timeLineTime").timeEntry("setTime", d.getUTCHours() +":"+ d.getUTCMinutes() +":"+ d.getUTCSeconds());    
}

///// timeline controls
function plusTime()
{
    var increment = parseInt($('#increments').val());
    setTime(increment + getCurrentTime());
//    $("timeLineTime").html(getCurrentTimeAsHHMMSS());

}

function minusTime()
{
    var increment = -parseInt($('#increments').val());
    setTime(increment + getCurrentTime());
//    $("timeLineTime").html(getCurrentTimeAsHHMMSS());    
}

function checkKeyframeTime()
{
    var t= getCurrentTime();
    if ( gEnvironment.hasKeyframeAtTime(t))
    {
        var index = gEnvironment.getKeyframeIndexAtTime(t);
        ipc_getKeyframeEnvironmentOptions(index);
        constructTree();
    }
    else
    {
        ipc_getStagingKeyframeEnvironmentOptions();
        gEnvironment.getStagingKeyframe().setTime(t);
        constructTree();
    }
    
    updateKeyframeNumbers();
}


function getViewItemTemplate(env)
{
    var title = $("<div class='title'><span title='ID: "+env.getID()+"'>"+env.getName()+"</span></div>");
    var id = $("<ID style='display:none'>").append(env.getID());
    var unit = env.getMetricUnit();
    var envID = env.getID().replace(/ /g, "_");
    var value = $("<div><div id='value_"+envID+"'></div></div>");
    
    var debug = $("<div class='debug'><div id='debug_value_"+envID+"'></div></div>");
    var template = $("<div/>").append(title).append(value).append(id).append(debug);
    var out = "<div class='item'>"+template.html()+"</div>";
    return out;
}

function constructViewTree()
{

    
    $("#viewTree").fancytree({
        extensions: ["filter"],
	    quicksearch: true,
        source: [],
        checkbox: false,
        height: '100%',
        icons: false,
        keyboard: false,
    
        click: function(event, data){
      
            if ( data.node.getParent().title == "root")
            {
                return;
            }
            
            var env = $(data.node.title).find("ID").html();
            //setActive(env, data.node.isSelected());
            document.getElementById("chart").scrollIntoView();
            $("#chart").show();
            $("#hideChartBtn").show();
 
            gEnvironment.setGraphEnvironment(env);
        },
        filter: {
			autoApply: false,  // Re-apply last filter if lazy data is loaded
			counter: false,  // Show a badge with number of matching child nodes near parent icons
			fuzzy: false,  // Match single characters in order, e.g. 'fb' will match 'FooBar'
			hideExpandedCounter: true,  // Hide counter badge, when parent is expanded
			highlight: false,  // Highlight matches by wrapping inside <mark> tags
			mode: "hide"  // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
		},
    });
    
    viewTree = $("#viewTree").fancytree("getTree");
    
   
		    
    var rootNodes = getRootNodes();
    for (var i=0; i<rootNodes.length; i++)
    {
        viewTree = $("#viewTree").fancytree("getTree");
        var environments = getEnvironmentsForCategory(rootNodes[i]);
        // get show count, if more than 1, then add the root node
        var show = false;
        for (var j = 0; j < environments.length; j++) {
            if (environments[j].isShow() ) {
            
                show = true;
                break;
            }
        }
        
        if ( show )
        {
            var category = viewTree.getRootNode().addChildren({
                title: rootNodes[i], folder: true, expanded: true
            });


            for(var j=0; j<environments.length; j++)
            {
                if ( environments[j].isShow() )
                    category.addChildren({title: getViewItemTemplate(environments[j])});
            }
            
        }
    }
    
    $("#viewTree").fancytree("getRootNode").sortChildren(null, true);
    

    
    $("#viewSearchBtn").click(function()
    {
        viewSearch($("input[name=viewSearch]").val());
    });
    
    $("#viewResetButton").click(function()
    {
        $("input[name=viewSearch]").val("");
        viewSearch($("input[name=viewSearch]").val());
    });
    
    
    $("input[name=viewSearch]").keyup(function(e){ 
    
        var key = event.keyCode || event.which;

        if (key !== 13) {
            return false;
        }
               
        viewSearch($(this).val());
			
    });    
    
    $("#viewTree").fancytree("getTree").filterNodes( $("input[name=viewSearch]").val(), 
        {
        autoExpand: $("#autoExpand").is(":checked"),
		leavesOnly: $("#leavesOnly").is(":checked")
		}
	);	
}

function viewSearch(val)
{
     var n,
			opts = {
				autoExpand: $("#autoExpand").is(":checked"),
				leavesOnly: $("#leavesOnly").is(":checked")
			},
			match = val;


		if($("#regex").is(":checked")) {
			// Pass function to perform match
			n = $("#viewTree").fancytree("getTree").filterNodes(function(node) {
				return new RegExp(match, "i").test(node.title);
			}, opts);
		} else {
			// Pass a string to perform case insensitive matching
			n = $("#viewTree").fancytree("getTree").filterNodes(match, opts);
		}
		$("span#matches").text("(" + n + " matches)");
		
}

function showEditMode( bEditMode, bInit)
{
    if ( bEditMode )
    {
        if ( KEYFRAME_GRAPH == null )
            initKeyframeGraph();
            
        $("#current_time").hide();
        $("#editMode").show();
        $("#viewMode").hide();
        gEnvironment.pauseTime();
        $("#toggle_time").html("Start");
        $("#editToggle").html("View");
    }
    else
    {
        // going to view mode           
        $("#current_time").show();
        $("#editMode").hide();
        $("#viewMode").show();
        $("#editToggle").html("Edit");
        
        setTimeout(constructViewTree, 100);
        
        // when initializing, use whatever state the environment was in, otherwise, start the time if coming from edit mode
        if (typeof(bInit) == "undefined" ){
            gEnvironment.resumeTime();
            $("#toggle_time").html("Pause");
        }
        
        if ( gEnvironment.isShowNotes() )
            $("notes").html(gEnvironment.getNotes());
        else
            $("notes").empty();
        
    }
}




function constructAddCustomEnvironmentDialog()
{
    var categories = $("#CustomEnvironmentCategories");
    for(var i=0; i<gEnvironmentCategories.length; i++)
        categories.append("<option value='"+gEnvironmentCategories[i]+"'>"+gEnvironmentCategories[i]);
    
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 750,
      modal: true,
      buttons: {
        "Create": addCustomEnvironment,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {

      }
    });
    
    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addCustomEnvironment();
    
    });
 
    $( "#customCreateBtn" ).on( "click", function() {
      dialog.dialog( "open" );
    });    
    
    $( "#removeCustomBtn" ).on( "click", function() {
        removeCustomEnvironment();
    });    
    
    $( "#advancedSettings").on( "click", function()
    {
        showHideAdvancedSettings();
    });

}

function showHideAdvancedSettings()
{
    if ( $("#advancedSettings")[0].checked )
        $(".advancedSettings").show()        
    else
        $(".advancedSettings").hide();

}

function addCustomEnvironment()
{
    var categoryId =  $("#CustomEnvironmentCategories").val();
    var categoryName = $("#CustomEnvironmentCategories").val();
    var id = $("#enviromentID").val();
    var name = $("#enviromentName").val();
    var metricUnit = $("#metricUnit").val();
    var imperialUnit = $("#imperialUnit").val();
    var imperialFormula = $("#imperialFormula").val();
    var metricFormula = $("#metricFormula").val();    
        
        
    if (gEnvironment.getEnvironment(id) != null )
    {
        alert("Environment with ID, " + id + ", already exists.");
        return;
    }
        
    if ( categoryId.length > 0 && categoryName.length > 0 && id.length > 0 && name.length > 0 && metricUnit.length > 0 ){
        gEnvironment.addCustomEnvironment(categoryId, categoryName, id, name, metricUnit, imperialUnit, imperialFormula, metricFormula);
        window.location = window.location;
    }
    else{
        alert("Please fill out all required items.");
        return;
    }
}

function removeCustomEnvironment()
{
    
    if ( gLastSelectedEnvironmentID == "" ){
        alert("Please select a custom environment from the tree.");
        return;
    }
    
    //var id = $(tree.getActiveNode().title).find("ID").html();
    
    console.log("env", gLastSelectedEnvironmentID);
    if (!gEnvironment.isCustomEnvironment(gLastSelectedEnvironmentID) ){
        alert("You may only remove custom environments.");
        return;
    }
    
    gEnvironment.removeCustomEnvironment(gLastSelectedEnvironmentID);
    window.location= window.location;
    
}


function toggleTime()
{
    if ( gEnvironment.isTimeRunning() ){
        $("#toggle_time").html("Start");
        gEnvironment.pauseTime();
    }
    else{
        $("#toggle_time").html("Pause");
        gEnvironment.resumeTime();
    }
}



function initButtonHandlers()
{
    $("#toggle_time").click(function() {
      toggleTime();
    });
    
    $("#editTimeBtn").click(function() {
        editTimeDisplay();
    });

    $("#editTimeOKBtn").click(function() {
        editTimeOKBtnHandler();
    });
    $("#editTimeOKBtn").hide();

    $("#editTimeCancelBtn").click(function() {
        editTimeCancelBtnHandler();
    });
    $("#editTimeCancelBtn").hide();
    
    
    $("#editToggle").click(function()
    {
       gEnvironment.setEditMode(!gEnvironment.isEditMode());
       showEditMode(gEnvironment.isEditMode());
    });

    if (gEnvironment.isEditingLocked()) {
      showEditMode(false, true);
      $("#editBtn").hide();
    }
    else
      showEditMode(gEnvironment.isEditMode(), true);

    $("#editBtn").click(function() {
      gEnvironment.setEditMode(true);
      showEditMode(gEnvironment.isEditMode());
    });

    $("#viewBtn").click(function() {
      gEnvironment.setEditMode(false);
      showEditMode(gEnvironment.isEditMode());
    });

    $("#debugBtn").click(function() {
      debugMode = !debugMode;
      showHideDebug();
    });

    // tools section
    
    $("#copyShowStatesBtn").click(function() {
        copyShowStatesFromParent();
    });
    
    $("#hideAllEnvironmentsBtn").click(function() {
        hideAllEnvironments();
    });
    
    $("#showOnlyActiveKeyframes").click(function() {
        showOnlyActiveKeyframes();
    });
/*    
    // keyframes
    $("#mergeWithPreviousKeyframe").click(function() {
        mergeWithPreviousKeyframe();
    });
  */  
    
    $("#hideChartBtn").click(function() {
        disableChart();
    });
    $("#hideChartBtn").hide();
    
    
    $("#xSnapInterval").change(function(e) {
        KEYFRAME_GRAPH.xAxis[0].options.tickInterval = e.target.value;  // for gridlines, best effort
        KEYFRAME_GRAPH.xAxis[0].options.tickIntervalAccurate = parseInt(e.target.value);
        KEYFRAME_GRAPH.xAxis[0].isDirty=true;
        KEYFRAME_GRAPH.redraw();
    });
  
    
    $("#ySnapInterval").change(function(e) {
        KEYFRAME_GRAPH.yAxis[0].options.tickInterval = e.target.value; // for gridlines, best effort
        KEYFRAME_GRAPH.yAxis[0].options.tickIntervalAccurate = parseFloat(e.target.value);
        KEYFRAME_GRAPH.yAxis[0].isDirty=true;
        KEYFRAME_GRAPH.redraw();
    });  

    
    
    $("#alwaysOnTopCB")[0].checked = ipc.appWindow().getEnvironmentDialog().isAlwaysOnTop();
    
    $("#alwaysOnTopCB").click(function() {
        ipc.appWindow().getEnvironmentDialog().setAlwaysOnTop($("#alwaysOnTopCB")[0].checked);
    });
    
    
}


function copyShowStatesFromParent()
{
    tree = $("#tree").fancytree("getTree");
    tree.visit(function(node){
        if ( node.getParent().title == "root")
            return;
        var envID = $(node.title).find("ID").html();
        if ( gEnvironment.parentEnvironment() != null)
        {
            var parentEnvObj = gEnvironment.parentEnvironment().getEnvironment(envID);
            if (  parentEnvObj != null )
            {
                if ( parentEnvObj.isShow() )
                    gEnvironment.setAllShow(envID, true);
            }
        }
    });
    
    constructTree();
}


function hideAllEnvironments()
{
    tree = $("#tree").fancytree("getTree");
    tree.visit(function(node){
        if ( node.getParent().title == "root")
            return;
        var envID = $(node.title).find("ID").html();
        
        gEnvironment.setAllShow(envID, false);

    });
    
    constructTree();
}

function showOnlyActiveKeyframes()
{
    tree = $("#tree").fancytree("getTree");
    tree.visit(function(node){
        if ( node.getParent().title == "root")
            return;
        var envID = $(node.title).find("ID").html();

        gEnvironment.setAllShow(envID,  gEnvironment.getEnvironment(envID).isActive());

    });
    
    constructTree();
}

function disableChart()
{
      $("#chart").hide();
      $("#hideChartBtn").hide();
      gEnvironment.setGraphEnvironment("none");
}





function alert(output_msg, title_msg)
{
    if (!title_msg)
        title_msg = 'Alert';

    if (!output_msg)
        output_msg = 'No Message to Display.';

    $("<div></div>").html(output_msg).dialog({
        title: title_msg,
        resizable: false,
        modal: true,
        buttons: {
            "Ok": function() 
            {
                $( this ).dialog( "close" );
            }
        }
    });
}

function initKeyframeGraph()
{
    createKeyframeGraph();
    addKeyframeSeries();
    
    
    KEYFRAME_GRAPH.xAxis[0].options.tickIntervalAccurate = KEYFRAME_GRAPH.xAxis[0].options.tickInterval;
    KEYFRAME_GRAPH.yAxis[0].options.tickIntervalAccurate = parseFloat(KEYFRAME_GRAPH.yAxis[0].options.tickInterval);
    
        KEYFRAME_GRAPH.setSize($(window).width()-100, 600, false);


}

function addKeyframeSeries()
{
    // add all the environments
    var environments = gEnvironment.getEnvironmentKeys();
    
    var cnt = 0;
    for(var i in environments)
    {
  
        KEYFRAME_GRAPH.addSeries({
                name: environments[i],
                envID: environments[i],
                data: null,
                visible: false,
                draggableY: true,
                draggableX: true,
                stickyTracking: false,
                color: getColor(cnt),
                dblclick: function (e) {
          			               
                        var x = roundNearest(this.xAxis.toValue(e.offsetX), this.xAxis.options.tickIntervalAccurate);
                        var y = roundNearest(this.yAxis.toValue(e.offsetY), this.yAxis.options.tickIntervalAccurate);
                        this.x = x;
                        this.y = y;
                        this.addPoint([x,y]);
                        addKeyframeFromGraph(this, Math.round(x/1000), y);
                }
        });
        
        
        // add some defaults to show
        if ( environments[i] == "Ambient Temperature" || environments[i] == "Sunlight" ){
            // simulate clicking on the legend
            setTimeout(            
                function(index)
                {
                    return function(){
                        $($('.highcharts-legend-item')[index]).click();
                    }
                }(KEYFRAME_GRAPH.series.length-1), 
            3000);
            
        }
        
        
        cnt++;
        
    }
}

function addDataToKeyframeGraph(series)
{
    var d = gEnvironment.getKeyframeDataAsJSON(series.options.envID);
    series.setData(JSON.parse(d));
}

// expects time to be in seconds
function addKeyframeFromGraph(series, time, value)
{
console.log("addKeyframeFromGraph", time, value);
    var kf = gEnvironment.addKeyframe(time);
    var envOpt = kf.getEnvironment( series.options.envID );
    envOpt.setValue(value);
    envOpt.setActive(true);
    // make sure first and last also active
    gEnvironment.getKeyframeAt(0).getEnvironment(series.options.envID).setActive(true);
    gEnvironment.getKeyframeAt(gEnvironment.getKeyframeCount()-1).getEnvironment(series.options.envID).setActive(true);
    
    
    return gEnvironment.setAllShow(series.options.envID, true);
    
}

// expects time to be in seconds
function removeKeyframeFromGraph(series, time, value)
{
    bRemoved = gEnvironment.removeEnvironmentKeyframe(series.options.envID, time ); 
console.log("removeKeyframeFromGraph", time, value, bRemoved);
    return bRemoved;
        
}

// expects time to be in seconds
function setKeyframeFromGraph(series, oldTime, newTime, value)
{
console.log("setKeyframeFromGraph", series, oldTime, value);
    if ( removeKeyframeFromGraph(series, oldTime, value ) )
        addKeyframeFromGraph(series, newTime, value);
}

var KEYFRAME_GRAPH = null; 
var _originalKeyframeTime = -1;
function createKeyframeGraph()
{
    // create the chart
    KEYFRAME_GRAPH = new Highcharts.Chart({

        chart: {
            renderTo: 'keyframeGraph',
            animation: false,            
        },
        
        title: {
            text: 'Environment Keyframe Graph'
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            series: {
                events: {
                    legendItemClick: function () {
                        var visibility = this.visible ? 'visible' : 'hidden';
                        if ( visibility )
                        {                                                   
                            addDataToKeyframeGraph(this);
                        }
                    }                   
                },
                point: {
                    events: {

                        drag: function (e) {
                            if ( _originalKeyframeTime < 0 )
                                _originalKeyframeTime = Math.round(this.x/1000);        // engine uses seconds
                                
                            if (this.index == 0 ){
                        	    e.x = 0;
                        	    this.x = 0;                        	                          	    
                            }                       		
                            else if(this.index == this.series.data.length-1)
                            {    
                        	    e.x = 86399000;
                        	    this.x = 86399000;
                        	    
                        	    
                            }
                            else
                            {
                        	   if ( e.x <= (this.series.data[this.index-1].x + this.series.chart.xAxis[0].options.tickIntervalAccurate))
                               {
                                    this.x = this.series.data[this.index-1].x + this.series.chart.xAxis[0].options.tickIntervalAccurate;
                                    return false;
                         		
                               }
                              
                              if ( e.x >= (this.series.data[this.index+1].x - this.series.chart.xAxis[0].options.tickIntervalAccurate)){                          	    
                                    this.x = this.series.data[this.index+1].x - this.series.chart.xAxis[0].options.tickIntervalAccurate;
                                    return false;
                          	    
                                }
                                
                            }
                        },
                        drop: function () {
                            if (_originalKeyframeTime < 0 )
                                return;
                            

                                
                            var xAxis = this.series.chart.xAxis[0];
                            var yAxis = this.series.chart.yAxis[0];
                      	    
                            this.y = roundNearest(this.y, yAxis.options.tickIntervalAccurate);
                            this.x = roundNearest(this.x, xAxis.options.tickIntervalAccurate);
                            
                
                            var newTime = Math.round(this.x/1000);
                            this.x = newTime * 1000;
                                                    
                            if ( this.index == 0 || this.x < 0)
                            {
                                this.x = 0;                                                              
                            }
                            
                           
                            
                            if ( this.index == this.series.data.length-1 || this.x > 86399000 )
                            {                               
                                this.x = 86399000;
                            }
                        
                            
                            if ( this.x < 0 || this.x > 86399000 )
                            {
                                                            
                                // do nothing, this is obviously wrong
                                console.log("ERROR: x point at ", this.x);
                                return;
                            }
                            
                            for(var i=0; i<this.series.data.length; i++)
                            {
                                if (this.index == i ) continue;
                                
                                if (this.x == this.series.data[i].x )
                                {
                                    console.log("ERROR: point already exists", this.x);
                                    return;
                                }
                            }
                            
                                                                                
                            this.update([this.x,this.y]);
                            var time = _originalKeyframeTime;
                            setKeyframeFromGraph(this.series, time, newTime, this.y);
                            
                            
                            _originalKeyframeTime = -1;
                            
                            // also update the last index
                            if ( this.index == 0 )
                            {
                            
                                var lastPoint = this.series.data[this.series.data.length-1];
                                lastPoint.y = this.y;
                                lastPoint.update([lastPoint.x, lastPoint.y]);
                                setKeyframeFromGraph(this.series, lastPoint.x/1000, lastPoint.x/1000, lastPoint.y);
                                
                            }
                            
                            
                            
                        },
                        
                        dblclick: function (e) {   
                            if (this.index != 0 && this.index != (this.series.data.length-1))
                            {
                                if ( removeKeyframeFromGraph(this.series, Math.round(this.x/1000), this.y) )
                                    this.remove();       			              
                            }
                            
                        },
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal'
            },
            line: {
                cursor: 'move'
            },           
        },

        tooltip: {
            formatter: function() {
                return this.series.name 
                    + '<br>Time: '+ Highcharts.dateFormat('%H:%M', this.x)
                    + ', Value: '+ roundNearest(this.y, this.series.chart.yAxis[0].options.tickIntervalAccurate);
                    
            }
        },
        
        legend: {
            itemWidth: 175
        },
        
        xAxis: {
    	    type: 'datetime',
            tickInterval: 1 * 3600 * 1000,
            tickmarkPlacement: 'on',
            gridLineWidth: 1,
            dateTimeLabelFormats : {
   			    day: '%H:%M'
			},
			title: {
                text: 'Time'
            },

        }, 
        
        yAxis: {
    	   
            tickInterval: 1,
            tickmarkPlacement: 'on',
            gridLineWidth: 1,
        },         


    });
}


function roundNearest(num, acc){
    if ( acc < 0 ) {
        return Math.round(num*acc)/acc;
    } else {
        return Math.round(num/acc)*acc;
    }
 }
 
function getColor(index)
{
    if ( index < 0 || index >= static_colors.length )
        index = 0;

    return static_colors[index];
}
 
 
function redrawGraph()
{
    for(var i=0; i<KEYFRAME_GRAPH.series.length; i++)
    {
        if ( KEYFRAME_GRAPH.series[i].visible )
        {
            addDataToKeyframeGraph(KEYFRAME_GRAPH.series[i]);
        }
    }

}



function editTabsChanged(event, ui)
{
    if ( ui.newTab.index() == 0)
    {       
        setTimeout(redrawGraph, 100);    
    }
    else if ( ui.newTab.index() == 1)
    {
        setTimeout(refreshKeyframeDisplay, 100);
    }
     
}



$( window ).resize(function() {
    resizeKeyframeGraph();

    $("#tabs").tabs("refresh");
});

function resizeKeyframeGraph()
{
    KEYFRAME_GRAPH.setSize($(window).width()-100, $(window).height()-300, false);
}