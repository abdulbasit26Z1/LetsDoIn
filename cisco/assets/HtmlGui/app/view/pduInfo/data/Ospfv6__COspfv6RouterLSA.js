//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospfv6__COspfv6RouterLSA",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Router LSA",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Version #: {version}",size:8},{value:"Type: {packet_type}",size:8},{value:"Packet Length:{packet_length}",size:16},{value:"Router ID:{router_id}",size:32},{value:"Area ID:{area_id}",size:32},{value:"Checksum :{checksum}",size:16},{value:"Instance ID:{instant_id}",size:8},{value:"0",size:8},],osi_pdu:"OSPFv3 Router LSA",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});