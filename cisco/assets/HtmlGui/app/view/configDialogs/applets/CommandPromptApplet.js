//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.applets.CommandPromptApplet",{extend:"HtmlGui.view.configDialogs.applets.DesktopAppletAbstract",alias:["widget.cmdpromptapplet"],config:{id:"cmdprompt",layout:"vbox",cls:"appletText",flex:100},cli:null,constructor:function(a){AppLogger.log("start constructing terminal settings");this.callParent(arguments);this.removeAll(true,true);AppLogger.log("end constructing terminal settings");return this},initialize:function(){this.callParent(arguments);AppLogger.log("initializing terminal settings")},clear:function(){},setDevice:function(a){this.device=a;if(this.cli!=null){this.remove(this.cli,true)}this.cli=Ext.create("HtmlGui.view.configDialogs.CommandLineDialog");this.cli.setParentView(this.parentView.parentView);this.add(this.cli);this.cli.setPcDevice(this.device,false);this.cli.setListener();AppLogger.log("displayCLI");Ext.ComponentMgr.get("configView").cli=this.cli;Ext.defer(function(){Ext.ComponentMgr.get("configView").onbtnKeyboard(null,null,null)},250,this);this.cli.updateCommandButtons();setCliIsInView(true)}});