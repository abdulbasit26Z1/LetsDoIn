//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Icmp__CIcmpMessage",{extend:"Ext.Base",statics:{data:{title:"ICMP",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {icmp_type:hex}",size:8},{value:"CODE: {icmp_code:hex}",size:8},{value:"CHKSUM",size:16},{value:"ID: {identification:hex}",size:16},{value:"SEQ NUMBER: {sequence_number}",size:16},],osi_pdu:"ICMP Message",osi_summary:"Type: {icmp_type:hex}"}},constructor:function(a){this.initConfig(a)}});