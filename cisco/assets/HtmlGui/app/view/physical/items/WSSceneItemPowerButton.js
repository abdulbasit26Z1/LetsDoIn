//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.physical.items.WSSceneItemPowerButton",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite","Ext.data.StoreManager","HtmlGui.model.DeviceDescription","HtmlGui.model.network.DeviceModel"],config:{posX:null,posY:null,width:null,height:null,image:null,drawLayerId:"buttonLayer"},m_powerOn:false,constructor:function(){this.callParent(arguments);this.deviceSprite=Ext.create("Ext.draw.sprite.Image",{src:this.getImage(),width:this.getWidth(),height:this.getHeight()});this.addSprite(this.deviceSprite);this.setPos(this.getPosX(),this.getPosY())},getAreaScale:function(){return 0.75},setSpriteSrc:function(a){this.deviceSprite.setAttributes({src:a},true)},getBBox:function(){var d={x:this.getPosX(),y:this.getPosY(),width:this.getWidth(),height:this.getHeight()};var c=this.getAreaScale();var a=d.width*c;var b=d.height*c;d.x-=(a/2);d.y-=(b/2);d.width+=a;d.height+=b;return d}});