//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.WorkspaceDrawShapeContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"LineCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_line_contextual"},{ID:"RectangleCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_rectangle_contextual"},{ID:"exitMode",Text:"",CSS:"multi_single_select_contextual",TriggerMethod:"touchend"},{ID:"openShapeOptions",PropertyID:"openShapeOptions",Text:"",CSS:"shapes_options_contextual",AlwaysInclude:"true",TriggerMethod:"touchend"},{ID:"EllipseCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_ellipse_contextual"}],model:"HtmlGui.model.ContextButtonModel",storeId:"WorkspaceDrawShapeContextButtonStore"}});