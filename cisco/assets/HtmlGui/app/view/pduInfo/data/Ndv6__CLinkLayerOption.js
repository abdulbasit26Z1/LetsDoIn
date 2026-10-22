//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ndv6__CLinkLayerOption",{extend:"Ext.Base",statics:{data:{title:"LINK LAYER OPTION",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {option_type:hex}",size:8},{value:"LENGTH: {option_length:hex}",size:8},{value:"LINK LAYER ADDRESS:{mac_address}",size:48,bgcolor:"purple"},],osi_pdu:"Link Layer Option",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});