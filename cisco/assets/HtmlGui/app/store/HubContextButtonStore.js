//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.HubContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"multiCreate",PropertyID:"multiCreate",Text:"",CSS:"multi_create_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"Repeater-PT",Text:"",CSS:"hub_repeater_contextual",TriggerMethod:"touchend"},{ID:"CoAxialSplitter-PT",Text:"",CSS:"hub_coaxial_splitter_contextual",TriggerMethod:"touchend"},{ID:"Hub-PT",Text:"",CSS:"hub_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"HubContextButtonStore"}});