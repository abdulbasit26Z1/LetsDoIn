//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionElapsedTime",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 Elapsed Time Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Option Elapsed Time :{code}",size:16},{value:"Option Length:{length:hex}",size:16},{value:"Elapsed Time:{elapsed_time}",size:16},],osi_pdu:"DHCPv6 Elapsed Time Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});