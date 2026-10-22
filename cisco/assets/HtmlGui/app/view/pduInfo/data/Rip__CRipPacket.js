//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Rip__CRipPacket",{extend:"Ext.Base",statics:{data:{title:"Rip v.1",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"CMD: {command:hex}",size:8},{value:"VER: {version:hex}",size:8},{value:"0000 0000 0000 0000",size:16},{value:"ADDR FAMILY : 0x0",size:16},{value:"0000 0000 0000 0000",size:16},{value:"NETWROK",size:32},{value:"0000 0000 0000 0000",size:32},{value:"NEXT HOP",size:32},{value:"METRIC",size:32},],osi_pdu:"Rip Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});