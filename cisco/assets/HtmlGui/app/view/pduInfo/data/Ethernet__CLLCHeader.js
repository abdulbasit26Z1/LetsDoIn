//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ethernet__CLLCHeader",{extend:"Ext.Base",statics:{data:{title:"LLC",units:"Bits",unit_marks:[8,16],width:24,fields:[{value:"DSAP: {dsap:hex}",size:8},{value:"SSAP : {ssap:hex}",size:8},{value:"CONTROL BYTE: {control_bit}",size:8}],osi_pdu:"LLC",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});