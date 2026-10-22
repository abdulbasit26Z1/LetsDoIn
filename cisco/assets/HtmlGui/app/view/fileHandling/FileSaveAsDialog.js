//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.FileSaveAsDialog",{extend:"HtmlGui.view.fileHandling.FileSaveAsDialog_UI",constructor:function(b){var a=Ext.getCmp("workspace");a.hideActionBar(true);this.callParent(arguments)},destroy:function(){getActionBar().hideShowActionBarContents(false,true);this.callParent(arguments)}});