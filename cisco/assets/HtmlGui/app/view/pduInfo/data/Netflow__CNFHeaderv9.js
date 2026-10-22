//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Netflow__CNFHeaderv9",{extend:"Ext.Base",statics:{data:{title:"Netflow Version 9 Header",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Version:{version}",size:16},{value:"Count:{flow_set_count}",size:16},{value:"System Uptime:{uptime}",size:32},{value:"Unix Seconds:{unix_seconds}",size:32},{value:"Package Sequence:{package_sequence}",size:32},{value:"Source ID:{source_id}",size:32},],osi_pdu:"Netflow Version 9 Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});