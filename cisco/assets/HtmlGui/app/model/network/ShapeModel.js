//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.network.ShapeModel",{extend:"HtmlGui.model.network.ClusteredItemModel",config:{ptData:null,fields:[{name:"x",type:"float",defaultValue:0},{name:"y",type:"float",defaultValue:0},{name:"shapeType",type:"string",defaultValue:"none"},{name:"innerColor",type:"string",defaultValue:""},{name:"outerColor",type:"string",defaultValue:""},]},setPos:function(a,e){var c=Math.floor(a),d=Math.floor(e);var b=HtmlGui.networkContents.getPtLogicalWorkspace();b.ipcCallArgsAsync("setCanvasItemRealPos",[this.getClusteredItemUuid(),c,d]);this.set({x:c,y:d})}});