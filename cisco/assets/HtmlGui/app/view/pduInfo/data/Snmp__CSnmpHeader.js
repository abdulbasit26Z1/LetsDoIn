//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Snmp__CSnmpHeader",{extend:"Ext.Base",statics:{data:{title:"SNMP",units:"Bits",unit_marks:[],width:32,fields:[{value:"Version:{version}",size:32},{value:"Community (Variable Length):{community}",size:32},{value:"PDU Type",size:32},{value:"Request Identifier",size:32},{value:"Error Status",size:32},{value:"Error Index",size:32},{value:"PDU Variable Bindings",size:32},],osi_pdu:"SNMP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});