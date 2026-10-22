//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Hdlc__CHdlcFrame",{extend:"Ext.Base",statics:{data:{title:"HDLC",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"FLG: 0x7E",size:8},{value:"ADR: {address_field:hex}",size:8},{value:"CONTROL: {control_field:hex}",size:16},{value:"DATA (VARIABLE LENGTH)",size:32},{value:"FCS: {frame_check_sequence:hex}",size:16},{value:"FLG: 0x7E",size:8},],osi_pdu:"HDLC Frame",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});