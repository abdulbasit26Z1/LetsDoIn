//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Arp__CArpPacket",{extend:"Ext.Base",statics:{data:{title:"Arp",units:"Bits",unit_marks:[8,16,32],width:32,fields:[{value:"HARDWARE TYPE:{hardware_type:hex}",size:16},{value:"PROTOCOL TYPE: {protocol_type:hex}",size:16},{value:"HLEN: {hardware_length:hex}",size:8},{value:"PLEN: {protocol_length:hex}",size:8},{value:"OPCODE: {operation:hex}",size:16},{value:"SOURCE MAC : {source_mac_address}",size:48},{value:"SOURCE IP : {source_ip_address}",size:32,bgcolor:"pink"},{value:"TARGET MAC: {destination_mac_address}",size:48,bgcolor:"green"},{value:"TARGET IP: {destination_ip_address}",size:32,bgcolor:"blue"},],osi_pdu:"Arp Packet",osi_summary:" osi_summary: Src. IP: {source_ip_address}, Dest. IP: {destination_ip_address}"}},constructor:function(a){this.initConfig(a)}});