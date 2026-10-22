//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6Packet",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 Header",units:"Bits",unit_marks:[8],width:32,fields:[{value:"ID:{header_transaction_id:hex}",size:8},{value:"TYPE:{header_message_type:hex}",size:24},{value:"OPTIONS(VARIABLE)",size:32,bgcolor:"pink"},],osi_pdu:"DHCPv6 Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});