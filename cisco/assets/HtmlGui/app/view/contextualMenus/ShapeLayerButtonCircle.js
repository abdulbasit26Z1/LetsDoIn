//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.contextualMenus.ShapeLayerButtonCircle",{extend:"Ext.Base",requires:["Ext.Anim"],config:{},loadStore:function(b,c){var a=null;if(HtmlGui.view.workspace.WSInputModeGeneric.getShapeModeEnabled()){a=["shapesDisabled"]}else{a=["shapesEnabled"]}b.loadLayerWithStore(b.layer2ID(),"WorkspaceShapeLayerContextButtonStore",function(d){b.handleShapeButtonPress(d)},c,a)}});