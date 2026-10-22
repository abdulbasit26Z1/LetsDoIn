//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.CloudContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"multiCreate",PropertyID:"multiCreate",Text:"",CSS:"multi_create_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"DSL-Modem-PT",Text:"",CSS:"modem_dsl_contextual",TriggerMethod:"touchend"},{ID:"Cable-Modem-PT",Text:"",CSS:"modem_cable_contextual",TriggerMethod:"touchend"},{ID:"Cloud-PT",Text:"",CSS:"cloud_contextual",TriggerMethod:"touchend"},{ID:"Cloud-PT-Empty",Text:"",CSS:"cloud_empty_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"CloudContextButtonStore"}});