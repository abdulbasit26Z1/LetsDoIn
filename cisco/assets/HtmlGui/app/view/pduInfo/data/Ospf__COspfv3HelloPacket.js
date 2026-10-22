//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfv3HelloPacket",{extend:"Ext.Base",statics:{data:{title:"OSPFv3 Hello",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"VERSION NUM: {version}",size:16},{value:"TYPE: {type_code}",size:16},{value:"PACKET LENGTH:{packet_length}",size:32},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"INSTANCE ID:{instance_id}",size:8},{value:"{version}",size:8},{value:"INTERFACE ID:{interface_id}",size:32},{value:"Priority:{priority}",size:8},{value:"Options",size:24},{value:"HELLO INTERVAL:{hello_interval}",size:16},{value:"ROUTER DEAD INTERVAL:{dead_interval}",size:32},{value:"DESIGNATED ROUTER:{dr}",size:32},{value:"DESIGNATED ROUTER:{bdr}",size:32},{value:"DESIGNATED ROUTER:{ndr}",size:32},],osi_pdu:"OSPFv3 Hello Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});