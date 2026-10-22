//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.MainWorkspaceButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"end_devices",Text:"",CSS:"end_devices_contextual",TriggerMethod:"touchstart"},{ID:"routers",Text:"",CSS:"routers_contextual",TriggerMethod:"touchstart"},{ID:"switches",Text:"",CSS:"switches_contextual",TriggerMethod:"touchstart"},{ID:"wireless",Text:"",CSS:"wireless_contextual",TriggerMethod:"touchstart"},{ID:"notes",Text:"",TriggerMethod:"touchend",CSS:"notes_contextual"},{ID:"multiSelect",PropertyID:"multiSelect",Text:"",CSS:"multi_select_contextual",TriggerMethod:"touchstart"},{ID:"shapes",PropertyID:"shapes",Text:"",CSS:"shapes_catectory_contextual",TriggerMethod:"touchstart"},{ID:"cloud",Text:"",CSS:"clouds_contextual",TriggerMethod:"touchstart"},{ID:"security",Text:"",CSS:"securities_contextual",TriggerMethod:"touchstart"},{ID:"hubs",Text:"",CSS:"hubs_contextual",TriggerMethod:"touchstart"}],model:"HtmlGui.model.ContextButtonModel",storeId:"MainWorkspaceButtonStore"}});