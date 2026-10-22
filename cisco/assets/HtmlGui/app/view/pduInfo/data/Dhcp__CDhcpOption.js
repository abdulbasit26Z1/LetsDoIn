//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpOption",{extend:"Ext.Base",statics:{data:{title:"DHCP Option",units:"Bits",unit_marks:[4,8],width:32,fields:[{value:"OP:{option_code:hex}",size:4},{value:"LEN:{option_length:hex}",size:4},],osi_pdu:"DHCP Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});