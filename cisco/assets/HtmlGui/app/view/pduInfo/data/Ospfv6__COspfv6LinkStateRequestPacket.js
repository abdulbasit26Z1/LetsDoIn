//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospfv6__COspfv6LinkStateRequestPacket",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Link State Request Packet",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"VERSION NUM: {version}",size:8},{value:"TYPE: {type_code}",size:8},{value:"PACKET LENGTH:{packet_length}",size:16},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"INSTANCE ID:{instance_id}",size:8},{value:"{version}",size:8},{value:"0",size:16},{value:"LS Type:{ls_type}",size:16},{value:"Link State ID:{link_state_id}",size:32},],osi_pdu:"OSPFv3 Link State Request Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});