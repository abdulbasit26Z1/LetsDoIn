//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.SecurityContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"multiCreate",PropertyID:"multiCreate",Text:"",CSS:"multi_create_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"5505",Text:"",CSS:"security_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"SecurityContextButtonStore"}});