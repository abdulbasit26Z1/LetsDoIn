var gLocation;
var gCurrentPO;
var gEnvironment;
var gEnvironmentOptions;
var gEnvironmentCategories;
var gEnvironmentOptionsMap;
var gCurrentKeyframeIndex;
var gTotalKeyframes;

function initEngine()
{
    var gCurrentPO = ipc.appWindow().getActiveWorkspace().getCurrentPhysicalObject();
    gLocation = gCurrentPO.getName();
    gEnvironment = gCurrentPO.getEnvironment();
    gCurrentKeyframeIndex = 0;
    
    ipc_getEnvironmentOptions(gEnvironment.getKeyframeAt(0));

}

function getCurrentTime()
{
    return gEnvironment.getTimeInSeconds();
}

function getCategories()
{
}

function ipc_getEnvironmentOptions(ipcEnvironmentOptions)
{

    gEnvironmentOptions = new Array();
    gEnvironmentCategories = new Array();
    gEnvironmentOptionsMap = new Array();
    
    var envOpt;
    var envKeys = ipcEnvironmentOptions.getEnvironmentKeys();

    for(var i=0; i<envKeys.length; i++)
    {
        envOpt = ipcEnvironmentOptions.getEnvironment(envKeys[i]);
   
        if ( !(envOpt.getCategory() in gEnvironmentOptions) ){
            gEnvironmentOptions[envOpt.getCategory()] = new Array();
            gEnvironmentCategories.push(envOpt.getCategory());
        }
        
        //gEnvironmentOptions[envOpt.getCategory()].push(envOpt.getID());
        gEnvironmentOptions[envOpt.getCategory()].push(envOpt);
        gEnvironmentOptionsMap[envOpt.getID()] = envOpt;
        
    }
}

function ipc_getKeyframeEnvironmentOptions(index)
{
    
    var keyframe = gEnvironment.getKeyframeAt(index);
    return ipc_getEnvironmentOptions(keyframe);
}

function ipc_getStagingKeyframeEnvironmentOptions()
{
    
    var keyframe = gEnvironment.getStagingKeyframe();
  
    return ipc_getEnvironmentOptions(keyframe);
}


function getKeyframeTimeAsHHMMSS()
{
    return getTimeAsHHMMSS(gEnvironment.getKeyframeAt(gCurrentKeyframeIndex).getTime());
}

function getCurrentTimeAsHHMMSS()
{
    return getTimeAsHHMMSS(gEnvironment.getTimeInSeconds());
}

function getTimeAsHHMMSS(tInSeconds)
{
    var d = new Date(tInSeconds*1000);
    var h = appendZero(d.getUTCHours());
    var m = appendZero(d.getUTCMinutes());
    var s = appendZero(d.getUTCSeconds());
    
    return h + ":" + m + ":" + s;
}

function appendZero(t)
{
    if ( t<10 ) 
        return "0"+t;
    else 
        return t;
}


function getCurrentKeyframe()
{
    return gEnvironment.getKeyframeAt(gCurrentKeyframeIndex);
}


function setTime(seconds) {

    gEnvironment.setTimeInSeconds(seconds);
    updateTimeLineClock(getCurrentTime());

    checkKeyframeTime();    
}



function setInterpolateChecked()
{
}






