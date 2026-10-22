//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.physical.items.WSSceneItemSlot",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite",],config:{posX:null,posY:null,moduleIn:null,slotInd:null,slotWidth:null,slotHeight:null,touchOrder:null},storeModule:null,m_showTestSprite:false,constructor:function(){this.callParent(arguments);if(this.m_showTestSprite){this.deviceSprite=Ext.create("Ext.draw.sprite.Image",{src:"resources/images/physical/modules/TestSprite.png",width:50,height:50})}this.addSprite(this.deviceSprite);this.setPos(this.getPosX(),this.getPosY())},getBBox:function(){return{x:this.getPosX(),y:this.getPosY(),width:this.getSlotWidth(),height:this.getSlotHeight()}}});