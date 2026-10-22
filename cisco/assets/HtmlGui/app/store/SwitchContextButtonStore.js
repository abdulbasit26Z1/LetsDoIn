//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.SwitchContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"multiCreate",PropertyID:"multiCreate",Text:"",CSS:"multi_create_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"Bridge-PT",Text:"",CSS:"switch_bridge_contextual",TriggerMethod:"touchend"},{ID:"Switch-PT",Text:"",CSS:"switch_contextual",TriggerMethod:"touchend"},{ID:"2960",Text:"",CSS:"switch_2960_contextual",TriggerMethod:"touchend"},{ID:"2950T",Text:"",CSS:"switch_2950T_contextual",TriggerMethod:"touchend"},{ID:"2950-24",Text:"",CSS:"switch_2950_24_contextual",TriggerMethod:"touchend"},{ID:"3560-24PS",Text:"",CSS:"switch_3560_contextual",TriggerMethod:"touchend"},{ID:"Switch-PT-Empty",Text:"",CSS:"switch_empty_contextual",TriggerMethod:"touchend"},{ID:"IE-2000",Text:"",CSS:"switch_ie2000_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"SwitchContextButtonStore"}});