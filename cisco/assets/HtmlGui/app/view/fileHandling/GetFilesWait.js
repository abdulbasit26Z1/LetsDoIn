//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.fileHandling.GetFilesWait",{extend:"HtmlGui.view.fileHandling.GetFilesWait_UI",alias:["widget.getFilesWait"],requires:["Ext.dataview.List","Ext.MessageBox","Ext.String","HtmlGui.view.fileHandling.GetFilesWait_UI",],m_ajaxRequestID:null,initialize:function(){var a=[{id:"btnCancelGetFiles",h:this.onCancel}];a.forEach(function(c){var b=this.getObject(c.id);b.setHandler(c.h);b.setScope(this)},this)},onCancel:function(){if(this.m_ajaxRequestID){Ext.Ajax.abort(this.m_ajaxRequestID)}this.m_ajaxRequestID=null;this.destroy();fileMenuCB=null},setAjaxRequestID:function(a){this.m_ajaxRequestID=a},getObject:function(a){return this.query("#"+a)[0]},setMessage:function(a){Ext.getCmp("messageID").setValue(a)},hideCancelButton:function(){Ext.getCmp("btnCancelGetFiles").hide()}});