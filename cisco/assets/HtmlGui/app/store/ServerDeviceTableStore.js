//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.ServerDeviceTableStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"ARP",CSS:"arp_inspect_icon",TriggerMethod:"touchend"},{ID:"DNS",CSS:"dns_inspect_icon",TriggerMethod:"touchend"},{ID:"PortStatus",CSS:"portStatus_inspect_icon",TriggerMethod:"touchend"},{ID:"attributes",PropertyID:"attributes",CSS:"device_attributes_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"ServerDeviceTableStore"}});