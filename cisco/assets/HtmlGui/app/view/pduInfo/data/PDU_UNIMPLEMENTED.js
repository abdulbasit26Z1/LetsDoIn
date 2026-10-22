//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.PDU_UNIMPLEMENTED",{extend:"Ext.Base",statics:{data:{title:"*** Not Implemented *** : {signal_type}",units:"Bits",width:32,fields:[{value:"*** this PDU is not implemented ***",size:32},],osi_pdu:"*** UNIMPL*** {signal_type}",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});