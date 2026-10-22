//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ndv6__CMTUOption",{extend:"Ext.Base",statics:{data:{title:"MTU OPTION",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {option_type:hex}",size:8},{value:"LENGTH: {option_length:hex}",size:8},{value:"RESERVED1",size:16},{value:"MTU:{mtu}",size:32},],osi_pdu:"MTU Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});