//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.WorkspaceShapeModeContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.DeviceContextualDescription"],config:{data:[{ID:"shapesEnabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_enabled_contextual"},{ID:"shapesDisabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_disabled_contextual"}],model:"HtmlGui.model.DeviceContextualDescription",storeId:"WorkspaceShapeModeContextButtonStore"}});