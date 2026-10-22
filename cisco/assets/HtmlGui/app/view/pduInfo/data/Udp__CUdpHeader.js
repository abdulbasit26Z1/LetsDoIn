//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Udp__CUdpHeader",{extend:"Ext.Base",statics:{data:{title:"UDP",units:"Bits",unit_marks:[16],width:32,fields:[{value:"SOURCE PORT: {source_port}",size:16},{value:"DESTINATION PORT: {destination_port}",size:16},{value:"LENGTH:{length}",size:16},{value:"CHECKSUM:{checksum}",size:16},{value:"DATA (VARIABLE)",size:32},],osi_pdu:"UDP Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});