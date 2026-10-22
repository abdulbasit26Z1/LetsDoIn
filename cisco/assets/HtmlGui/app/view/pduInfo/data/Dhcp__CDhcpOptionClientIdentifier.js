//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpOptionClientIdentifier",{extend:"Ext.Base",statics:{data:{title:"DHCP Client Identifier Option",units:"Bits",unit_marks:[4,8,12],width:32,fields:[{value:"OP:{option_code:hex}",size:4},{value:"LEN:{option_length:hex}",size:4},{value:"HW:{hardware_type:hex}",size:4},{value:"CLIENT IDENTIFIER (Length Vary):{client_identifier}",size:52,bgcolor:"pink"},],osi_pdu:"DHCP Client Identifier Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});