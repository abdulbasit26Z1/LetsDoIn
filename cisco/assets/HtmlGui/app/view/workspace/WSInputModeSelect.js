//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.WSInputModeSelect",{extend:"HtmlGui.view.workspace.WSInputModeAbstract",constructor:function(a){this.initConfig(a);return this},onDragStart:function(a){AppLogger.log(a.type)},onDragEnd:function(a){AppLogger.log(a.type)},onDrag:function(a){AppLogger.log(a.type)},onActivate:function(){return true},onDeactivate:function(){return true}});