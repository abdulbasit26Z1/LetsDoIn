//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.FileOpenDialog",{extend:"HtmlGui.view.fileHandling.FileOpenDialog_UI",config:{cls:"fileMenu",didFileLoad:false},constructor:function(a){getActionBar().hideShowActionBarContents(true);getActionBar().blockActionBarShowHide(true);this.callParent(arguments)},destroy:function(a){getActionBar().unblockActionBarShowHide();getActionBar().hideShowActionBarContents(false,!this.getDidFileLoad());HtmlGui.view.fileHandling.FileOpenDialog_UI.superclass.destroy.call(this,a)},get_cmp:function(a){return this.query("#"+a)[0]}});