//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionDNS",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 DNS Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"OPTION_DNS_SERVER :{code}",size:16},{value:"Option Length:{length:hex}",size:16},],osi_pdu:"DHCPv6 DNS Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});