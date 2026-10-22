//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.TextEditorFileOpenDialog",{extend:"HtmlGui.view.fileHandling.TextEditorFileOpenDialog_UI",requires:["HtmlGui.view.fileHandling.TextEditorFileOpenDialog_UI"],config:{cls:"fileMenu"},m_parent:null,constructor:function(b){var c=this;var a=Ext.getCmp("workspace");a.hideActionBar(true);this.callParent(arguments);this.on({tap:{delegate:"#btnOpen",fn:function(){if(this.query("#lstFiles")[0].getSelection()[0]){this.m_parent.openFile(this.query("#lstFiles")[0].getSelection()[0].get("filePath"));this.destroy()}}}});this.on({tap:{delegate:"#btnCancel",fn:function(){c.destroy()}}})},destroy:function(b){var a=Ext.getCmp("workspace");a.hideActionBar(false);HtmlGui.view.fileHandling.TextEditorFileOpenDialog_UI.superclass.destroy.call(this,b)},get_cmp:function(a){return this.query("#"+a)[0]}});