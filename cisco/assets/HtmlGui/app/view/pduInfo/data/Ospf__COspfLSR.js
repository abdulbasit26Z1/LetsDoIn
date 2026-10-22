//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfLSRPacket",{extend:"Ext.Base",statics:{data:{title:"OSPF LSR",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"LS TYPE: {type}",size:8},{value:"LINK STATE ID: {ls_id}",size:8},{value:"ADVERTISING ROUTER:{advertising_router}",size:16},],osi_pdu:"OSPF LSR",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});