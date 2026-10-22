//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.WSSceneItemSelectionRect",{extend:"HtmlGui.view.workspace.items.WSSceneItem",requires:["Ext.draw.sprite.Sprite"],config:{drawLayerId:"topmost"},constructor:function(){this.callParent(arguments);this.sprite=Ext.create("Ext.draw.sprite.Rect",{strokeStyle:"red",lineWidth:4});this.addSprite(this.sprite)},updateSize:function(b,a){this.sprite.setAttributes({width:b,height:a})},containsPoint:function(b,a){return false}});