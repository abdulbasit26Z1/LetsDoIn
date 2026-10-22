//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfNetworkLSA",{extend:"Ext.Base",statics:{data:{title:"OSPF Network LSA",units:"Bits",unit_marks:[16,24],width:32,fields:[{value:"LSA AGE: {age}",size:16},{value:"OPTIONS: {option_code}",size:8},{value:"LSA TYPE:{type}",size:8},{value:"LINK STATE ID:{ls_id}",size:32},{value:"ADVERTISING ROUTER:{advertising_router}",size:32},{value:"LS SEQUENCE NUM:{sequence_number}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"LENGTH:{length}",size:16},{value:"LINK STATE ID:{mask}",size:32},{value:"ATTACHED ROUTER COUNT:{router_count}",size:8}],osi_pdu:"OSPF Network LSA",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});