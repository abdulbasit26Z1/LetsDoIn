//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ipv6__CIpv6Header",{extend:"Ext.Base",statics:{data:{title:"IPv6",units:"Bits",unit_marks:[4,12],width:32,fields:[{value:"{version_number}",size:4},{value:"TRFC",size:6},{value:"FLOW LABEL",size:24},{value:"PL: {payload_length}",size:16},{value:"NEXT: {get_next_header:hex}",size:16},{value:"HOP LIMIT:{time_to_live}",size:4},{value:"SRC IP: {source_address}",size:64},{value:"DST IP: {destination_address}",size:64},{value:"DATA (VARIABLE LENGTH)",size:32},],osi_pdu:"IPv6 Header",osi_summary:"Src. IP: {source_address}, Dest. IP: {destination_address}"}},constructor:function(a){this.initConfig(a)}});