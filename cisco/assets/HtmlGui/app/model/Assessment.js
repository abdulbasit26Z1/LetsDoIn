//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.Assessment",{extend:"Ext.data.Model",requires:["Ext.data.Field"],config:{fields:[{name:"device",mapping:"name",type:"string"},{name:"deviceWithStatus",mapping:"name",type:"string",convert:function(c,f){var e=c;var a=f.get("status");var b=f.get("leaf");var d="";if(a=="Incorrect"&&b===true){d="resources/images/red_mark.png";e='<img src="'+d+'"/>'+c}else{if(a==="Correct"&&b===true){d="resources/images/green_check.png";e='<img src="'+d+'"/>'+c}}return e}},{name:"status",type:"string"},{name:"points",type:"string"},{name:"components",type:"string"},{name:"feedback",mapping:"incorrect_feedback",type:"string"},{name:"icon",mapping:"icon",type:"string"},{name:"leaf",type:"boolean"},{name:"expanded",type:"boolean"}]}});