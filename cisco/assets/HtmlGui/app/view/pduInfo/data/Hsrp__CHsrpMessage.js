//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Hsrp__CHsrpMessage",{extend:"Ext.Base",statics:{data:{title:"HSRP",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"Version:{version}",size:8},{value:"OP Code:{msg_type}",size:8},{value:"State:{state}",size:8},{value:"Hello Time: {hello_time}",size:8},{value:"Hold Time: {hold_time}",size:8},{value:"Priority: {priority}",size:8},{value:"Group: {group_number}",size:8},{value:"Reserved: {eigrp_version}",size:8},{value:"Authentication Data",size:32},{value:"Authentication Data",size:32},{value:"Virtual IP Address: {virtual_ip}",size:32},],osi_pdu:"HSRP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});