//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Switching__CDot1qHeader",{extend:"Ext.Base",statics:{data:{title:"Ethernet 802.1q",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"PREAMBLE: 1010 1010",size:7},{value:"S<br/>F<br/>D",size:1},{value:"Dest.Address: {destination_mac_address}",size:6},{value:"Src.Address: {source_mac_address}",size:6},{value:"TPID:<br/>{tpid:hex}",size:2},{value:"TCI:<br/>{tci:hex}",size:2},{value:"Type:<br/>0x1",size:2},{value:"DATA (VARIABLE LENGTH)",size:16},{value:"FCS:<br/>{frame_check_sequence:hex}",size:4},],osi_pdu:"Ethernet 802.1q",osi_summary:"Src.MAC: {source_mac_address}, Dest.Mac {destination_mac_address}"}},constructor:function(a){this.initConfig(a)}});