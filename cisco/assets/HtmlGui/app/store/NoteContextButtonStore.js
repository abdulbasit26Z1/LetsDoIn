//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.NoteContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"edit",Text:"",CSS:"note_edit_contextual",TriggerMethod:"touchend"},{ID:"delete",Text:"",CSS:"device_delete_contextual",TriggerMethod:"touchend"},{ID:"multiSelect",Text:"",CSS:"multi_select_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"NoteContextButtonStore"}});