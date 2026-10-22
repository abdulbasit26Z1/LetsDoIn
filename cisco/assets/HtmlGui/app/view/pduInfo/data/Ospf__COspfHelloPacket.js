//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfHelloPacket",{extend:"Ext.Base",statics:{data:{title:"OSPF Hello",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"VERSION NUM: {version}",size:16},{value:"TYPE: {type_code}",size:16},{value:"PACKET LENGTH:{packet_length}",size:32},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"AUTH TYPE:{auth_type}",size:16},{value:"AUTHENTICATION:",size:32},{value:"NETWORK MASK:{network_mask}",size:32},{value:"HELLO INTERVAL:{hello_interval}",size:16},{value:"OPTIONS:{option_code}",size:8},{value:"RP:{priority}",size:8},{value:"ROUTER DEAD INTERVAL:{dead_interval}",size:32},{value:"DESIGNATED ROUTER:{dr}",size:32},{value:"BACKUP DESIGNATED ROUTER:{bdr}",size:32},{value:"NEIGHBOR COUNT:{neighbor_count}",size:32},],osi_pdu:"OSPF Hello Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});