//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.store.WorkspaceShapeLayerContextButtonStore",{extend:"Ext.data.Store",requires:["HtmlGui.model.ContextButtonModel"],config:{data:[{ID:"LineCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_line_contextual"},{ID:"RectangleCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_rectangle_contextual"},{ID:"Options",Text:"",TriggerMethod:"touchend",CSS:"shapes_options_contextual"},{ID:"shapesEnabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_enabled_contextual"},{ID:"shapesDisabled",Text:"",TriggerMethod:"touchend",CSS:"shapes_disabled_contextual"},{ID:"EllipseCreate",Text:"",TriggerMethod:"touchend",CSS:"shapes_ellipse_contextual"}],model:"HtmlGui.model.ContextButtonModel",storeId:"WorkspaceShapeLayerContextButtonStore"}});