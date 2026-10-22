//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Voip__CRtpMessage",{extend:"Ext.Base",statics:{data:{title:"RTP",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"2",size:2},{value:" ",size:1},{value:" ",size:1},{value:"CC",size:4},{value:" ",size:1},{value:"PT:{pt}",size:7},{value:"Sequence Number:{sequence_number}",size:16},],osi_pdu:"RTP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});