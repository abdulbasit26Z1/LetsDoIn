//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.WSSceneItemBaseShape",{extend:"HtmlGui.view.workspace.items.WorkspaceItem",requires:["Ext.draw.sprite.Sprite"],config:{drawLayerId:"shapes"},constructor:function(){this.callParent(arguments);if(this.getStoreRecord()){this.m_uuid=this.getStoreRecord().getClusteredItemUuid()}else{this.m_uuid=null}this.attr.zIndex=2},loadFromEngine:Ext.emptyFn,getOutlineSize:function(){return 4}});