//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CTransformPayload",{extend:"Ext.Base",statics:{data:{title:"ISAKMP Transfrom",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Next Payload:{next_payload_type}",size:8},{value:"Payload Length:{payload_length}",size:16},{value:"Trasnform#: {transform_number}",size:8},{value:"Trasnform ID: {transform_id}",size:8},{value:"Encrption Algorithm:{encryption_algorithm}",size:32},{value:"Key Length:{bit_number}",size:32},{value:"Hash Algorithm:{hash_algorithm}",size:32},{value:"Group Description:{dh_group}",size:32},{value:"Authentication Method:{auth_type}",size:32},{value:"Life Type:{Second}",size:32},{value:"Life Duration:{lifetime}",size:32},],osi_pdu:"ISAKMP Transform",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});