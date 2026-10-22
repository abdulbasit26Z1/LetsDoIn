//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Icmpv6__CEchoMessage",{extend:"Ext.Base",statics:{data:{title:"ICMPv6 ECHO MESSAGE",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE: {message_type:hex}",size:8},{value:"CODE: {code:hex}",size:8},{value:"CHKSUM:{checksum:hex}",size:16},{value:"IDENTIFIER: {id}",size:16},{value:"SEQUENCE NUMBER: {sequence}",size:16},],osi_pdu:"ICMPv6 Echo Message",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});