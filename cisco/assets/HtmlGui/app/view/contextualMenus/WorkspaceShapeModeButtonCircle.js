//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.contextualMenus.WorkspaceShapeModeButtonCircle",{extend:"HtmlGui.view.contextualMenus.BaseLayeredButtonCircle",requires:["Ext.Anim","HtmlGui.util.BlockTouch",],uses:["HtmlGui.view.editHistory.EditOpRemoveShapes","HtmlGui.view.editHistory.EditNodeWithUndoFile",],m_shapeRecUUID:null,loadCenterScreen:function(b,c){this.setLayerCssValuesUse(this.layer1ID(),"device_button_inner",55);this.setButtonOffsetFromEdge(0.35);this.m_parent=b;this.m_shapeRecUUID=deviceID;var d=this;var a=null;if(HtmlGui.view.workspace.WSInputModeGeneric.getShapeModeEnabled()){a=["shapesDisabled"]}else{a=["shapesEnabled"]}this.loadLayer1ButtonsExcept("WorkspaceShapeModeContextButtonStore",a);this.standardLoadAnimation()},handleButtonPress:function(a){var b=null;if("shapesEnabled"==a){HtmlGui.view.workspace.WSInputModeGeneric.enableDeviceMode(true);this.closeMenu()}else{if("shapesDisabled"==a){HtmlGui.view.workspace.WSInputModeGeneric.enableShapeMode(true);this.closeMenu()}}}});