//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.Override_Ext_field_Select",{override:"Ext.field.Select",requires:["Ext.os"],initialize:function(){this.callOverridden(arguments);if(!!Ext.os.is.Android&&isDebugBuild()){this.setUsePicker(false)}}});