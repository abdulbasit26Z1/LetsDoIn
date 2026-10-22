//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.WorkspaceMultiselectContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"delete",Text:"",CSS:"multi_delete_contextual",TriggerMethod:"touchend"},{ID:"unselect",Text:"",CSS:"multi_cancel_contextual",TriggerMethod:"touchend"},{ID:"singleSelect",Text:"",CSS:"multi_single_select_contextual",TriggerMethod:"touchend"},{ID:"newCluster",Text:"",CSS:"multi_cluster_contextual",TriggerMethod:"touchend"},{ID:"newClusterDisabled",Text:"",CSS:"multi_cluster_disabled_contextual",TriggerMethod:"touchend"},{ID:"dragSelect",Text:"",TriggerMethod:"touchend",CSS:"multi_drag_contextual",TriggerMethod:"touchend"},{ID:"touchSelect",Text:"",TriggerMethod:"touchend",CSS:"multi_tap_select_contextual",TriggerMethod:"touchend"}],model:"HtmlGui.model.ContextButtonModel",storeId:"WorkspaceMultiselectContextButtonStore"}});