//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.util.SizeMonitor",{override:"Ext.util.SizeMonitor",uses:["Ext.env.Browser","Ext.util.sizemonitor.Default","Ext.util.sizemonitor.Scroll","Ext.util.sizemonitor.OverflowChange"],constructor:function(a){var b=Ext.util.sizemonitor;if(Ext.browser.is.Firefox){return new b.OverflowChange(a)}else{if(Ext.browser.is.WebKit){if(!Ext.browser.is.Silk&&Ext.browser.engineVersion.gtEq("535")&&!Ext.browser.engineVersion.ltEq("537.36")){return new b.OverflowChange(a)}else{return new b.Scroll(a)}}else{if(Ext.browser.is.IE11){return new b.Scroll(a)}else{return new b.Scroll(a)}}}}},function(){});