//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.connection.items.WSSceneItemDeviceName",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite","Ext.data.StoreManager","HtmlGui.model.DeviceDescription","HtmlGui.model.network.DeviceModel"],config:{deviceDescriptor:null,storeRecord:null,name:null,posX:null,posY:null},constructor:function(){this.callParent(arguments);var a=(screen.width<=800)?18:24;var c=this.getName();var d=50;if(c!=null&&c.length>d){c=c.substring(0,d)+"..."}var b=c.length<d?c.length*2:(d+3)*2;this.nameSprite=Ext.create("Ext.draw.sprite.Text",{text:c,fill:"red",fontSize:a,textAlign:"center",translationX:b});this.addSprite(this.nameSprite);this.setPos(this.getPosX(),this.getPosY())}});