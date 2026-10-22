//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vtp__CVtpSubsetFrame",{extend:"Ext.Base",statics:{data:{title:"VTP Subset Advertisement",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"VERSION:{version}",size:8},{value:"CODE:{code}",size:8},{value:"SEQUENCE NUM: {sequence}",size:8},{value:"MGT DOMAIN LEN: {domian_name_length}",size:8},{value:"MANAGEMENT DOMAIN NAME: {domain_name}",size:128},{value:"CONFIGURATION REVISION NUMBER:{config_revision}",size:32},],osi_pdu:"VTP Subset Advertisement",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});