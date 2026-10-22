//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.workspace.items.WSSceneItemRect",{extend:"HtmlGui.view.workspace.items.WSSceneItemBaseShape",requires:["Ext.draw.sprite.Sprite"],constructor:function(){this.callParent(arguments);this.sprite=Ext.create("Ext.draw.sprite.Rect",{lineWidth:this.getOutlineSize()});this.addSprite(this.sprite)},updateValues:function(c,a,b,d){if(d&&d.length&&b&&b.length){this.sprite.setAttributes({width:c,height:a,strokeStyle:"rgb("+d+")",fillStyle:"rgb("+b+")"})}else{if(b&&b.length){this.sprite.setAttributes({width:c,height:a,fillStyle:"rgb("+b+")"})}else{if(d&&d.length){this.sprite.setAttributes({width:c,height:a,strokeStyle:"rgb("+d+")"})}else{AppLogger.log("Error","No color set for rect item.")}}}},loadFromEngine:function(){var g=this.getStoreRecord().getPtData();var c=0;var b=0;var f=0;var e=0;var d=0;var a=0;c=Math.min(Number(g[0]),Number(g[2]));f=Math.max(Number(g[0]),Number(g[2]));b=Math.min(Number(g[1]),Number(g[3]));e=Math.max(Number(g[1]),Number(g[3]));d=f-c;a=e-b;this.updateValues(d,a,g[4],g[5]);this.attr.zIndex=1;this.setPos(c,b)}});