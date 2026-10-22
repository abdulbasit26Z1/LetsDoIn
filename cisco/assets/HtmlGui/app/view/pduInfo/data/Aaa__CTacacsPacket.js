//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Aaa__CTacacsPacket",{extend:"Ext.Base",statics:{data:{title:"TACACS",units:"Bits",unit_marks:[4,8,16,24],width:32,fields:[{value:"MAJ VER:{major_version}",size:4},{value:"MIN VER:{minor_version}",size:4},{value:"TYPE:{type}",size:8},{value:"SEQ NO:{sequence_number}",size:8},{value:"FLAGS:{flags}",size:8},{value:"SESSION ID:{session_id}",size:32},{value:"LENGTH:{length}",size:32},{value:"ENCRYPTED DATA(Variable Length)",size:32},],osi_pdu:"TACACS",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});