//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Icmpv6__CPacketTooBigMessage",{extend:"Ext.Base",statics:{data:{title:"ICMPv6 PACKET TOO BIG MESSAGE",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {icmp_type:hex}",size:8},{value:"CODE: {icmp_code:hex}",size:8},{value:"CHKSUM",size:16},{value:"MTU: {identification:hex}",size:32},],osi_pdu:"ICMPv6 Packet Too Big Message",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});