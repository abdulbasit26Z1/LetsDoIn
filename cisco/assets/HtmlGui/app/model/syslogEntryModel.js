//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.model.syslogEntryModel",{extend:"Ext.data.Model",requires:["Ext.data.Field"],config:{fields:[{name:"time"},{name:"hostname"},{name:"message"}]}});