//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.contextualMenus.MultiselectButtonCircle",{extend:"Ext.Base",requires:["Ext.Anim"],config:{},loadStore:function(a,b){a.loadLayerWithStore(a.layer2ID(),"MultiselectContextButtonStore",function(c){a.handleMultiSelectButtonPress(c)},b,null)}});