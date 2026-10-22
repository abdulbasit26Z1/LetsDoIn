//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.MultiselectContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"touchSelect",Text:"",TriggerMethod:"touchend",CSS:"multi_tap_select_contextual"},{ID:"dragSelect",Text:"",TriggerMethod:"touchend",CSS:"multi_drag_contextual"}],model:"HtmlGui.model.ContextButtonModel",storeId:"MultiselectContextButtonStore"}});