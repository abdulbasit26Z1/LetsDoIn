//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dns__CDnsMessage",{extend:"Ext.Base",statics:{data:{title:"DNS Header",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"ID",size:16,bgcolor:"pink"},{value:"Q<br/>R",size:1},{value:"OP<br/>CODE",size:4},{value:"A<br/>A",size:1},{value:"T<br/>C",size:1},{value:"R<br/>D",size:1},{value:"R<br/>A",size:1},{value:"Z",size:3},{value:"RCODE:<br/>{client_ip_address}",size:4},{value:"QDCOUNT:{number_of_queries}",size:16},{value:"ANCOUNT:{number_of_answers}",size:16},{value:"NSCOUNT:0",size:16},{value:"ARCOUNT:{number_of_additional_records}",size:16},],osi_pdu:"DNS Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});