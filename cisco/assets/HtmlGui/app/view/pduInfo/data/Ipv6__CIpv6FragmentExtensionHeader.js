//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ipv6__CIpv6FragmentExtensionHeader",{extend:"Ext.Base",statics:{data:{title:"IPv6 FRAGMENT EXTENSION",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"NEXT HEADER: {next_header}",size:8},{value:"RESERVED",size:8},{value:"FRAGMENT OFFSET:{offset}",size:14},{value:"R<br/>E<br/>S",size:1},{value:"M:<br/>{more_flag}",size:1},{value:"IDENTIFICATION: {ex_identification:hex}",size:32},],osi_pdu:"IPv6 FRAGMENT EXTENSION",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});