//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospfv6__COspfv6RouterInterface",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Router Interface",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Type: {type}",size:8},{value:"0",size:8},{value:"Metric:{metric}",size:16},{value:"Interface ID:{interface_id}",size:32},{value:"Neighbor Interface ID:{neighbor_interface_id}",size:32},{value:"Neighbor Router ID:{neighbor_router_id}",size:32},],osi_pdu:"OSPFv3 Router Interface",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});