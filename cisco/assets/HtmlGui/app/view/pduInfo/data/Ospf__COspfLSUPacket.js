//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfLSUPacket",{extend:"Ext.Base",statics:{data:{title:"OSPF LSU Packet",units:"Bits",unit_marks:[16,24],width:32,fields:[{value:"VERSION NUM: {version}",size:16},{value:"TYPE: {type_code}",size:16},{value:"PACKET LENGTH:{size}",size:32},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"AUTH TYPE:{auth_type}",size:16},{value:"AUTHENTICATION:",size:32},{value:"LSAs:{lsa_count}",size:16},],osi_pdu:"OSPF LSU Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});