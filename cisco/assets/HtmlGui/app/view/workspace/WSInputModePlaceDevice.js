//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.WSInputModePlaceDevice",{extend:"HtmlGui.view.workspace.WSInputModeAbstract",requires:["Ext.draw.sprite.Text","Ext.draw.sprite.Image","Ext.data.StoreManager","HtmlGui.view.workspace.WSInputModePlaceDeviceStoreListener"],config:{deviceDescriptor:null},nameSprite:null,deviceSprite:null,placeDevice:function(b,e){var a=this.getDeviceDescriptor();var c=this.getWorkspace();var d=c.mapScreenToScene(b,e);AppLogger.trace("!!! placing device at:",b,e,d.x,d.y);HtmlGui.networkContents.addDevice(a.getDeviceType(),a.getDeviceModel(),d.x,d.y)},onSingleTap:function(a){AppLogger.trace("&&& place device on single tap");this.placeDevice(a.pageX,a.pageY);this.getWorkspace().inputModeRemove(this)},onActivate:function(){return true}});