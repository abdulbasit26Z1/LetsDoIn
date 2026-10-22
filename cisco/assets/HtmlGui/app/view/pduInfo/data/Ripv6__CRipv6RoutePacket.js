//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ripv6__CRipv6RoutePacket",{extend:"Ext.Base",statics:{data:{title:"Ripv6 Route Packet",units:"Bits",unit_marks:[16],width:32,fields:[{value:"IPv6 Prefix: {ip_address}",size:16},{value:"Route Tag: {route_tag}",size:16},{value:"Prefix Length ADDRESS:{prefix_length}",size:32},{value:"Metric:{metric}",size:32},],osi_pdu:"Ripv6 Route Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});