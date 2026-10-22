//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpPacket",{extend:"Ext.Base",statics:{data:{title:"DHCP",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"OP:{message_op_code:hex}",size:8},{value:"HW TYPE:{hardware_address_type}",size:8},{value:"HW LEN:{hardware_address_length}",size:8},{value:"HOPS:{hops}",size:8},{value:"TRANSACTION ID (4 BYTES)",size:32},{value:"SECS:{seconds}",size:16},{value:"FLAGS:{flags:hex}",size:16},{value:"CLIENT ADDRESS:{client_ip_address}",size:32},{value:"YOUR CLIENT ADDRESS:{your_ip_address}",size:32},{value:"SERVER ADDRESS:{server_ip_address}",size:32},{value:"RELAY AGENT ADDRESS:{relay_agent_ip}",size:32},{value:"CLIENT HARDWARE ADDRESS (16 BYTES)",size:32},{value:"SERVER HOSTNAME (64 BYTES)",size:32},{value:"FILE (128 BYTES)",size:32},{value:"OPTIONS (312 BYTES)",size:32},],osi_pdu:"DHCP Frame",osi_summary:"Server:{server_ip_address}, Client:{client_ip_address}"}},constructor:function(a){this.initConfig(a)}});