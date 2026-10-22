//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfDDPacket",{extend:"Ext.Base",statics:{data:{title:"OSPF DD",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"VERSION NUM: {version}",size:16},{value:"TYPE: {type_code}",size:16},{value:"PACKET LENGTH:{size}",size:32},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"INSTANCE ID:{instance_id}",size:8},{value:"{version}",size:8},{value:"INTERFACE ID:{interface_id}",size:32},{value:"Priority:{priority}",size:8},{value:"Options",size:24},{value:"INTERFACE MTU:{mtu}",size:16},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"0",size:1},{value:"DD SEQUENCE NUM:{sequence_number}",size:16}],osi_pdu:"OSPF DD Packet",osi_summary:"Version:{version}"}},constructor:function(a){this.initConfig(a)}});