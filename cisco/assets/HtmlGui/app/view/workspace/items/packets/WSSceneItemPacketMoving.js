//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.packets.WSSceneItemPacketMoving",{extend:"HtmlGui.view.workspace.items.packets.WSSceneItemMovingStraight",requires:["Ext.draw.sprite.Rect","Ext.draw.sprite.Image",],statics:{HEIGHT:41,WIDTH:48},config:{qos:false,drawLayerId:"anim_packets_moving"},constructor:function(){this.callParent(arguments);if(this.getQos()){this.addSprite(Ext.create("Ext.draw.sprite.Image",{src:"./resources/images/Simulation/PDUGraphics/gPacketqosEmptyMask.png",width:this.self.WIDTH,height:this.self.HEIGHT}))}else{this.addSprite(Ext.create("Ext.draw.sprite.Image",{src:"./resources/images/Simulation/PDUGraphics/gPacketEmptyMask.png",width:this.self.WIDTH,height:this.self.HEIGHT}))}}});