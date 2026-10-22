//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcpv6__CDhcpv6OptionIANA",{extend:"Ext.Base",statics:{data:{title:"DHCPv6 IA_NA Option",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Option IA-NA :{code}",size:16},{value:"Option Length:{length:hex}",size:16},{value:"IAID:{iaid:hex}",size:32},{value:"T1:{t1:hex}",size:32},{value:"T2:{t2:hex}",size:32},],osi_pdu:"DHCPv6 IA_NA Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});