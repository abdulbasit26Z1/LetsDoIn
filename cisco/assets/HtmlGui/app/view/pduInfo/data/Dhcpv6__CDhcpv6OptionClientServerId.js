//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionClientServerId",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 Client/Server ID Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"OPTION_CLIENTID/OPTION_SERVER ID:{text_id}",size:16},{value:"Option Length:{header_type}",size:16},{value:"DUID:{duid_string}",size:32},],osi_pdu:"DHCPv6 Client/Server ID Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});