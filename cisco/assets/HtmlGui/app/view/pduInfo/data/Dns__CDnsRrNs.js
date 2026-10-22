//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dns__CDnsRrNs",{extend:"Ext.Base",statics:{data:{title:"DNS Answer",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"NAME:{name}",size:32},{value:"TYPE:{type}",size:16},{value:"CLASS:{class}",size:16},{value:"TTL:{ttl}",size:32},{value:"LENGTH:{rd_length}",size:16},{value:"{server_name}",size:16},],osi_pdu:"DNS Answer",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});