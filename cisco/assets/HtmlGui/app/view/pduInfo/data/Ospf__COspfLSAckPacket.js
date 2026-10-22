//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ospf__COspfLSAckPacket",{extend:"Ext.Base",statics:{data:{title:"OSPF Link State Acknowledgment",units:"Bits",unit_marks:[16,24],width:32,fields:[{value:"VERSION NUM: {version}",size:16},{value:"TYPE: {type_code}",size:16},{value:"PACKET LEN:{size}",size:32},{value:"ROUTER ID:{router_id}",size:32},{value:"AREA ID:{area_id}",size:32},{value:"CHECKSUM:{checksum}",size:16},{value:"AUTH TYPE:{auth_type}",size:16},{value:"AUTHENTICATION:",size:32},],osi_pdu:"OSPF Link State Acknowledgment",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});