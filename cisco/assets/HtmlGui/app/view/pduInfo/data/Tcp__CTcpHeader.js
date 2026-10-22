//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Tcp__CTcpHeader",{extend:"Ext.Base",statics:{data:{title:"TCP",units:"Bits",unit_marks:[4,10,16,24],width:32,fields:[{value:"SOURCE PORT: {source_port}",size:16},{value:"DESTINATION PORT: {destination_port}",size:16},{value:"SEQUENCE NUMBER:{sequence_number}",size:32},{value:"ACKNOWLEDGEMENT NUMBER: {ack_number}",size:32},{value:"OFF:<br/>{control_bits}",size:4},{value:"RES: {control_bits}",size:6},{value:"FLAGS: {control_bits}",size:6},{value:"WINDOW",size:16},{value:"CHECKSUM: {checksum}",size:16},{value:"URGUNT POINTER",size:16},{value:"OPTION",size:24},{value:"DATA (VARIABLE)",size:32},],osi_pdu:"TCP Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});