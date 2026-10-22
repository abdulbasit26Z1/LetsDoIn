//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Eigrp__CEigrpInternal",{extend:"Ext.Base",statics:{data:{title:"EIGRP TLV Internal",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"TYPE:{}",size:16},{value:"LENGTH:{operation_code:hex}",size:16},{value:"NEXT HOP:{hop_count}",size:32},{value:"DELAY: {delay}",size:32},{value:"BANDWIDTH: {bandwidth}",size:32},{value:"MTU:{mtu}",size:24},{value:"HOP COUNT: {hop_count}",size:8},{value:"REL: {reliability}",size:8},{value:"LOAD: {load}",size:8},{value:"RESERVED: {reserved}",size:16},{value:"PREFIX: {prefix_length}",size:8},{value:"DESTINATION: {destination}",size:24},],osi_pdu:"EIGRP TLV Internal",osi_summary:"Version: {version_number}"}},constructor:function(a){this.initConfig(a)}});