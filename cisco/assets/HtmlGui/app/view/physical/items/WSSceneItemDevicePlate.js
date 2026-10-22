//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.physical.items.WSSceneItemDevicePlate",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite","Ext.data.StoreManager","HtmlGui.model.DeviceDescription","HtmlGui.model.network.DeviceModel"],config:{posX:null,posY:null,width:null,height:null,image:null},constructor:function(){this.callParent(arguments);this.deviceSprite=Ext.create("Ext.draw.sprite.Image",{src:this.getImage(),width:this.getWidth(),height:this.getHeight()});this.addSprite(this.deviceSprite);this.setPos(this.getPosX(),this.getPosY())}});