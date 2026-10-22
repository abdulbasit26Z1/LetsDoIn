//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Rip__CRipRoutePacket",{extend:"Ext.Base",statics:{data:{title:"Rip Route Packet",units:"Bits",unit_marks:[16],width:32,fields:[{value:"ADDRESS FAMILY: {address_family}",size:16},{value:"ROUTE TAG: {route_tag}",size:16},{value:"NETWORK ADDRESS:{ip_address}",size:32},{value:"SUBNET MASK : {subnet_mask}",size:32},{value:"NEXT HOP:{next_hop}",size:32},{value:"METRIC:{metric}",size:32},],osi_pdu:"Rip Route Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});