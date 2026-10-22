//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.util.PaintMonitor",{override:"Ext.util.PaintMonitor",uses:["Ext.env.Browser","Ext.env.OS","Ext.util.paintmonitor.CssAnimation","Ext.util.paintmonitor.OverflowChange"],constructor:function(a){return new Ext.util.paintmonitor.CssAnimation(a)}},function(){});