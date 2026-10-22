//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ethernet__CEthernetIIHeader",{extend:"Ext.Base",statics:{data:{title:"EthernetII",units:"Bytes",unit_marks:[2,8,14,16],width:20,fields:[{value:"PREAMBLE",size:8},{value:"DEST ADDR<br>{destination_mac_address}",size:6},{value:"SRC ADDR<br>{source_mac_address}",size:6},{value:"TYPE<br>{length_type}",size:2},{value:"DATA (VARIABLE SIZE)",size:14},{value:"CRC<br>{frame_check_sequence: hex}",size:4}],osi_pdu:"EthernetII Header",osi_summary:"Src.MAC: {source_mac_address}, Dest.Mac {destination_mac_address}"}},constructor:function(a){this.initConfig(a)}});