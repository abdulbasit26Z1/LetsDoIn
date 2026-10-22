//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.FileSaveDialog",{extend:"HtmlGui.view.fileHandling.FileSaveDialog_UI",config:{id:"fileSaveDialogID"},constructor:function(b){var a=Ext.getCmp("workspace");a.hideActionBar(true);this.callParent(arguments)},destroy:function(b){var a=Ext.getCmp("workspace");a.hideActionBar(false);HtmlGui.view.fileHandling.FileSaveDialog_UI.superclass.destroy.call(this,b)}});