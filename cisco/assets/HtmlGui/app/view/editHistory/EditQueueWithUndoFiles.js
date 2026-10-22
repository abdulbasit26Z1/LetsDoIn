//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.editHistory.EditQueueWithUndoFiles",{extend:"HtmlGui.view.editHistory.EditQueue",singleton:true,statics:{UNDO_FN_RAND:"_R1OKJG5G4PW1XLXR_"},constructor:function(a){this.callParent(arguments)},clear:function(){this.callParent(arguments);this.undoFileNextIndex=0},getNewUndoFilePathAsync:function(a,b){HtmlGui.networkContents.isActivityAsync(function(c){ipc.ipcCallSeqAsync("appWindow.getFileExternalTempLocation",function(e){var d=e+"/PTM_UNDO"+this.self.UNDO_FN_RAND+this.undoFileNextIndex++;d+=(c?".pka":".pkt");if(a){a.call(b,d)}},this)},this)},undoFileNextIndex:0});