//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Eigrpv6__CEigrpv6Packet",{extend:"Ext.Base",statics:{data:{title:"EIGRPv6",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"Ver:{version_number}",size:8},{value:"OPC:{operation_code:hex}",size:8},{value:"CHECKSUM",size:16},{value:"FLAGS: {flag:hex}",size:32},{value:"SEQ: {sequence_number:hex}",size:32},{value:"ACKNUM LIMIT:{ack_number:hex}",size:32},{value:"AUTONOMOUS SN: {as_number}",size:32},],osi_pdu:"EIGRPv6",osi_summary:"Version: {version_number}"}},constructor:function(a){this.initConfig(a)}});