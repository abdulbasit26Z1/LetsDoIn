//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.connection.items.WSSceneItemBack",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite","Ext.data.StoreManager","HtmlGui.model.DeviceDescription","HtmlGui.model.network.DeviceModel"],config:{deviceDescriptor:null,storeRecord:null,name:null,posX:null,posY:null},constructor:function(){this.callParent(arguments);var b=this.getSceneView();var a=50;var c=50;this.deviceSprite=Ext.create("Ext.draw.sprite.Image",{src:"resources/images/bg_close.png",width:a,height:c});this.deviceSprite.setAttributes({translationX:-a*0.5,translationY:-c*0.5});this.addSprite(this.deviceSprite);this.setPos(this.getPosX()-25,this.getPosY()+25)}});