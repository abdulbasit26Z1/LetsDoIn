//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.Layer1DeviceTableStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"PortStatus",CSS:"portStatus_inspect_icon",TriggerMethod:"touchend"},{ID:"attributes",PropertyID:"attributes",CSS:"device_attributes_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"Layer1DeviceTableStore"}});