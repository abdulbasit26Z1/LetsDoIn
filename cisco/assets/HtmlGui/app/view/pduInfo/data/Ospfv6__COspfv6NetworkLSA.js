//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospfv6__COspfv6NetworkLSA",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Network LSA",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"LSA AGE: {age}",size:16},{value:"LSA TYPE:{type}",size:16},{value:"LINK STATE ID:{ls_id}",size:32},{value:"ADVERTISING ROUTER:{advertising_router}",size:32},{value:"LS SEQUENCE NUM:{sequence_number}",size:32},{value:"LS CHECKSUM:{checksum}",size:16},{value:"LENGTH:{length}",size:16},{value:"0",size:8},{value:"Options",size:24},{value:"Attached Router",size:32},],osi_pdu:"OSPFv6 Network LSA",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});