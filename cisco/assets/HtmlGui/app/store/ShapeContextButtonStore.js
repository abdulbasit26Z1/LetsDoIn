//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.ShapeContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.DeviceContextualDescription"],config:{data:[{ID:"delete",PropertyID:"deleteDevice",Text:"",CSS:"device_delete_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"shapesEnabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_enabled_contextual"},{ID:"shapesDisabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_disabled_contextual"}],model:"HtmlGui.model.DeviceContextualDescription",storeId:"ShapeContextButtonStore"},getValFromRecord:function(d,c,a){var b=this.findRecord(d,c);if(null!==b){return b.get(a)}return null}});