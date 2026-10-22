//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ethernet__CIEEE802Dot3Header",{extend:"Ext.Base",statics:{data:{title:"Ethernet 802.3",units:"Bytes",unit_marks:[2,7,8,14,16],width:20,fields:[{value:"PREAMBLE<br>101010..10",size:7},{value:"S<br>F<br>D",size:1},{value:"DEST ADDR<br>{destination_mac_address}",size:6},{value:"SRC ADDR<br>{source_mac_address}",size:6},{value:"LEN<br>{length_type}",size:2},{value:"DATA (VARIABLE SIZE)",size:14},{value:"FCS<br>{frame_check_sequence: hex}",size:4}],osi_pdu:"IEEE 802.3 Header",osi_summary:"{source_mac_address}, Dest. IP: {destination_mac_address}"}},constructor:function(a){this.initConfig(a)}});