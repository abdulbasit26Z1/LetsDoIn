//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.network.NoteModel",{extend:"HtmlGui.model.network.ClusteredItemModel",config:{fields:[{name:"text",type:"string",defaultValue:""},{name:"x",type:"float",defaultValue:0},{name:"y",type:"float",defaultValue:0},]},setText:function(b){var a=HtmlGui.networkContents.getPtLogicalWorkspace();HtmlGui.util.AsyncHelper.makeAsyncObjCallParams(a,"changeNoteText",[this.getClusteredItemUuid(),b])},setPos:function(a,e){var c=Math.floor(a),d=Math.floor(e);var b=HtmlGui.networkContents.getPtLogicalWorkspace();b.ipcCallArgsAsync("setCanvasItemRealPos",[this.getClusteredItemUuid(),c,d]);this.set({x:c,y:d})}});