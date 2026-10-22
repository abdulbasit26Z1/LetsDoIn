//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.FrameRelay__CFrameRelayHeader",{extend:"Ext.Base",statics:{data:{title:"Frame Relay",units:"Bits",unit_marks:[8,24],width:32,fields:[{value:"FLG: 0x7E",size:8},{value:"ADDRESS: {dlci_number:hex}",size:16},{value:"DATA (VARIABLE LENGTH)",size:40},{value:"FCS: {frame_check_sequence:hex}",size:16},{value:"FLG: 0x7E",size:8},],osi_pdu:"Frame Relay",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});