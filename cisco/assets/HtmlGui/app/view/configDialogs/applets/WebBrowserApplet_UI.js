//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.applets.WebBrowserApplet_UI",{extend:"Ext.Container",requires:["Ext.Container","Ext.Button","Ext.Spacer","Ext.field.Url"],config:{ui:"dark",layout:"vbox",items:[{xtype:"container",id:"contHeader",minHeight:10,layout:"hbox",items:[{xtype:"container",flex:55,padding:"2 0 0 10 ",layout:"hbox",items:[{xtype:"button",flex:50,cls:"appletText",disabled:true,id:"btnBack",ui:"back",text:"Back"},{xtype:"spacer",flex:5},{xtype:"button",flex:50,cls:"appletText",disabled:true,id:"btnForward",ui:"forward",text:"Forward"},{xtype:"spacer",flex:5}]},{xtype:"urlfield",flex:70,id:"urlField",label:"URL",labelWidth:65,placeHolder:"http://1.1.1.1"},{xtype:"spacer",flex:5},{xtype:"button",flex:10,cls:"appletText",disabled:true,id:"btnGo",ui:"action",text:"Go"}]},{xtype:"container",id:"contHtmlBody",minHeight:400,styleHtmlContent:true,scrollable:"vertical"}]}});