//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.startup.StartupOptions_UI",{extend:"Ext.Panel",requires:["Ext.Container","Ext.Label","Ext.Button"],config:{centered:true,height:"40%",hidden:true,id:"startup_panel",width:"33%",items:[{xtype:"container",centered:false,height:"30%",id:"startupLabelContainer",items:[{xtype:"label",centered:true,cls:"startupText",height:"100%",html:"PT MOBILE",id:"textLabel",ui:""}]},{xtype:"container",centered:false,height:"70%",id:"buttonContainer",width:"100%",layout:"hbox",items:[{xtype:"button",cls:"newFile",id:"startNewNetwork",width:"33%",text:"",align:"left"},{xtype:"button",cls:"openFile",id:"openFile",width:"33%",text:""},{xtype:"button",cls:"community",id:"community",width:"34%",text:"",align:"right"}]}]}});