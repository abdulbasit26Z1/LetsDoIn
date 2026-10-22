//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionStatusCode",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 Status Code Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Option Status Code :{code}",size:16},{value:"Option Length:{option_length:hex}",size:16},{value:"Status Code:{status_code:hex}",size:16},{value:"Status Message(Variable)",size:16},],osi_pdu:"DHCPv6 Status Code Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});