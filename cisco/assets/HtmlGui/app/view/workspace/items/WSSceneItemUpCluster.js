//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.WSSceneItemUpCluster",{extend:"HtmlGui.view.workspace.items.WSSceneItemCluster",requires:["Ext.draw.sprite.Sprite"],statics:{ICON_TOP_ADJUST:30},config:{iconSrc:"./resources/images/workspaceDevices/iClusterParent.png",fixedScreenLocation:true},constructor:function(){this.callParent(arguments);this.getSceneView().on("viewRegionChanged",this.onViewRegionChanged,this);this.updateNameDisplay("Parent Cluster")},updateFromStoreRecord:Ext.emptyFn,setClusterName:Ext.emptyFn,onViewRegionChanged:function(a,b){var c=(b.right==0||b.bottom==0);if(c||this.getFixedScreenLocation()){this.setPos((a.left+a.right)*0.5,a.top+this.getIconHeight()*0.5-this.self.ICON_TOP_ADJUST)}},restorePos:Ext.emptyFn});