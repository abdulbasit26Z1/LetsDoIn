//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Bgp__CBgpPacket",{extend:"Ext.Base",statics:{data:{title:"BGP",units:"Bits",unit_marks:[],width:32,fields:[{value:"MARKER ( 16 BYTES , ALL BITS - 1)",size:128,bgcolor:"purple"},{value:"Length:{length}",size:16},{value:"Type:{type}",size:8},],osi_pdu:"BGP Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});