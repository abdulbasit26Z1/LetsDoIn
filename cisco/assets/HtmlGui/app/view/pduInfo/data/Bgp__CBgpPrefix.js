//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Bgp__CBgpPrefix",{extend:"Ext.Base",statics:{data:{title:"BGP Prefix",units:"Bits",unit_marks:[8],width:32,fields:[{value:"Length:{length}",size:8},{value:"IP Address:{prefix_ipv6}",size:128,bgcolor:"pink"},],osi_pdu:"BGP Prefix",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});