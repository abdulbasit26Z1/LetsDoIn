//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.CLIScriptModel",{extend:"Ext.data.Model",config:{fields:[{name:"name",type:"string"},{name:"source",type:"string"},{name:"text",type:"string",defaultValue:"",persist:false,convert:function(c,a){c=a.get("name");if(!c){c=a.get("source");if(c){var b=new RegExp("[\\n\\r]+","gm");c=c.replace(b," | ").replace(/</g,"&lt;").replace(/>/g,"&gt;")}}AppLogger.trace("@@@ script text:",c);var d=70;if(c.length>d){c=c.substr(0,d-4).concat(" ...")}return c}}]}});