//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionIAPrefix",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 IA Prefix Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Option IA Prefix :{code}",size:16},{value:"Option Length:{length:hex}",size:16},{value:"Preferred lifetime:{preferred_lifetime}",size:32},{value:"Valid lifetime:{valid_lifetime}",size:32},{value:"Prefix Length:{prefix_length}",size:8},{value:"IPv6 Address:{prefix_ipv6}",size:128,bgcolor:"purple"},],osi_pdu:"DHCPv6 IA Prefix Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});