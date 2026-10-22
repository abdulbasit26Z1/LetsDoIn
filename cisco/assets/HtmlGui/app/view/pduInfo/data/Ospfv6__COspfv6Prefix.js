//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospfv6__COspfv6Prefix",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Prefix",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Prefix Length: {prefix_length}",size:8},{value:"Prefix Options: {prefix_option}",size:8},{value:"Metric",size:16},{value:"Address Prefix:{address_prefix}",size:64},],osi_pdu:"OSPFv3 Prefix",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});