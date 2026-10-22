//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionIAAddress",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 IA Address Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Option IA Address :{code}",size:16},{value:"Option Length:{length:hex}",size:16},{value:"IPv6 Address:{address}",size:128,bgcolor:"purple"},{value:"Preferred lifetime:{preferred_lifetime}",size:32},{value:"Valid lifetime:{valid_lifetime}",size:32},],osi_pdu:"DHCPv6 IA Address Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});