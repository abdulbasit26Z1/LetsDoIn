//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.configDialogs.applets.Dhcpv6LocalPoolApplet_UI",{extend:"Ext.Container",requires:["Ext.Container","Ext.field.Number"],config:{id:"Dhcpv6LocalPoolApplet",items:[{xtype:"textfield",id:"ipv6LocalPool",label:"IPv6 Local Pool"},{xtype:"container",layout:"hbox",items:[{xtype:"textfield",flex:85,id:"ipv6PoolPrefix",label:"IPv6 Pool Prefix (x:x:x:x::x/<z>",labelWidth:"50%"},{xtype:"numberfield",flex:15,id:"ipv6PoolPrefixMask",label:"/",maxValue:128,minValue:1}]},{xtype:"numberfield",id:"prefixLength",label:"Prefix length to assign from pool <1-128>",labelWidth:"60%",maxValue:128,minValue:1}]}});