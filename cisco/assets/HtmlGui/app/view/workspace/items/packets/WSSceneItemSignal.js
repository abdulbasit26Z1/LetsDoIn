//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.packets.WSSceneItemSignal",{extend:"HtmlGui.view.workspace.items.packets.WSSceneItemMovingStraight",requires:["Ext.draw.sprite.Rect","Ext.draw.sprite.Circle","Ext.draw.sprite.Image",],statics:{SIZE:6},config:{color:"magenta",drawLayerId:"anim_signals"},constructor:function(){this.callParent(arguments);this.addSprite(Ext.create("Ext.draw.sprite.Rect",{height:this.self.SIZE,width:this.self.SIZE,fillStyle:this.getColor()}))}});