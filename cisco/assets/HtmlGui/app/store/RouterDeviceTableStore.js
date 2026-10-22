//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.RouterDeviceTableStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"Routing",CSS:"ipv4Routing_inspect_icon",TriggerMethod:"touchend"},{ID:"IPv6Routing",CSS:"ipv6Routing_inspect_icon",TriggerMethod:"touchend"},{ID:"ARP",CSS:"arp_inspect_icon",TriggerMethod:"touchend"},{ID:"NAT",CSS:"nat_inspect_icon",TriggerMethod:"touchend"},{ID:"QoS",CSS:"qos_inspect_icon",TriggerMethod:"touchend"},{ID:"PortStatus",CSS:"portStatus_inspect_icon",TriggerMethod:"touchend"},{ID:"attributes",PropertyID:"attributes",CSS:"device_attributes_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"RouterDeviceTableStore"}});