//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ppp__CPppFrame",{extend:"Ext.Base",statics:{data:{title:"PPP",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"FLG: 0x7E",size:8},{value:"ADR: {address_field:hex}",size:8},{value:"CONTROL: {control_field:hex}",size:8},{value:"PROTOCOL: {type_field:hex}",size:16},{value:"LCP (VARIABLE)",size:24},{value:"FCS",size:16},{value:"FLG: 0x7E",size:8},],osi_pdu:"PPP Frame",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});