//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dhcp__CDhcpOptionDomainName",{extend:"Ext.Base",statics:{data:{title:"DHCP Domain Name Option",units:"Bits",unit_marks:[4,8],width:32,fields:[{value:"OP:{option_code:hex}",size:4},{value:"LEN:{option_length:hex}",size:4},{value:"DOMAIN NAME SERVER:{domain_name_server}",size:32,bgcolor:"pink"},],osi_pdu:"DHCP Domain Name Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});