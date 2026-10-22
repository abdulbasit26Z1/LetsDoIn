//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ip__CIpHeader",{extend:"Ext.Base",statics:{data:{title:"IP",units:"Bits",unit_marks:[4,8,16,20,24],width:32,fields:[{value:"{version_number}",size:4},{value:"IHL",size:4},{value:"DSCP: {dscp}",size:8},{value:"TL: {total_length}",size:16},{value:"ID: {identification:hex}",size:16},{value:"{flags:hex}",size:4},{value:"{fragment_offset:hex}",size:12},{value:"TTL: {time_to_live}",size:8},{value:"PRO: {protocol:hex}",size:8},{value:"CHKSUM",size:16},{value:"SRC IP: {source_address}",size:32},{value:"DST IP: {destination_address}",size:32},{value:"OPT: {options:hex}",size:24},{value:"{padding:hex}",size:8},{value:"DATA (VARIABLE LENGTH)",size:32},],osi_pdu:"IP Header",osi_summary:"Src. IP: {source_address}, Dest. IP: {destination_address}"}},constructor:function(a){this.initConfig(a)}});