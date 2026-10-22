//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfLSAHeader",{extend:"Ext.Base",statics:{data:{title:"OSPF LSA Header",units:"Bits",unit_marks:[16,24],width:32,fields:[{value:"LSA AGE: {age}",size:16},{value:"OPTIONS: {option_code}",size:8},{value:"LSA TYPE:{type}",size:8},{value:"LINK STATE ID:{ls_id}",size:32},{value:"ADVERTISING ROUTER:{advertising_router}",size:32},{value:"LS SEQUENCE NUM:{sequence_number}",size:32},{value:"LS CHECKSUM:{checksum}",size:16},{value:"LENGTH:{length}",size:16},],osi_pdu:"OSPF LSA Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});