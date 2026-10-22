//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.WirelessContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"multiCreate",PropertyID:"multiCreate",Text:"",CSS:"multi_create_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"Linksys-WRT300N",Text:"",CSS:"wireless_linksys_WRT300N_contextual",TriggerMethod:"touchend"},{ID:"AccessPoint-PT",Text:"",CSS:"wireless_access_point_contextual",TriggerMethod:"touchend"},{ID:"AccessPoint-PT-A",Text:"",CSS:"wireless_access_point_A_contextual",TriggerMethod:"touchend"},{ID:"AccessPoint-PT-N",Text:"",CSS:"wireless_access_point_N_contextual",TriggerMethod:"touchend"},{ID:"Cell-Tower",Text:"",CSS:"wireless_cell_tower_contextual",TriggerMethod:"touchend"},{ID:"Central-Office-Server",Text:"",CSS:"wireless_central-office-server_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"WirelessContextButtonStore"}});