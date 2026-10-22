//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ethernet__CIEEE802Dot3zHeader",{extend:"Ext.Base",statics:{data:{title:"Ethernet 802.3z",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"Preamble 1010 1010",size:8},{value:"SFD",size:4},{value:"Dest.Address: {destination_mac_address}",size:8},{value:"Src.Address: {source_mac_address}",size:8},{value:"Type/Length: {type:hex}",size:4},{value:"DATA (VARIABLE LENGTH)",size:16},{value:"FCS",size:8},{value:"EXTENSION (VARIABLE):{extension}",size:8},],osi_pdu:"Ethernet 802.3z",osi_summary:"Src.MAC: {source_mac_address}, Dest.Mac {destination_mac_address}"}},constructor:function(a){this.initConfig(a)}});