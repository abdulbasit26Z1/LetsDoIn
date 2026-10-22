//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.ClusterUpContextButtonStore",{extend:"HtmlGui.store.ClusterContextButtonStore",requires:["HtmlGui.model.DeviceContextualDescription"],config:{data:[{ID:"enter",PropertyID:"enter",Text:"",CSS:"cluster_enter_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"addSimplePDU",PropertyID:"addSimplePDU",Text:"",CSS:"cluster_add_simple_pdu_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"addComplexPDU",PropertyID:"addComplexPDU",Text:"",CSS:"device_add_complex_pdu_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"connect",PropertyID:"connect",Text:"",CSS:"cluster_connect_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"}],model:"HtmlGui.model.DeviceContextualDescription",storeId:"ClusterUpContextButtonStore"}});