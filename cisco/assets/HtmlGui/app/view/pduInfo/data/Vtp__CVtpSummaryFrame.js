//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vtp__CVtpSummaryFrame",{extend:"Ext.Base",statics:{data:{title:"VTP Summary Advertisement",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"VERSION:{version}",size:8},{value:"CODE:{code}",size:8},{value:"FOLLOWERS: {followers}",size:8},{value:"MGT DOMAIN LEN: {domian_name_length}",size:8},{value:"MANAGEMENT DOMAIN NAME: {domain_name}",size:256},{value:"CONFIGURATION REVISION NUMBER:{config_revision}",size:32},{value:"UPDATER ID:{updater_ip}",size:32},{value:"UPDATE TIMESTAMP:{update_timestamp}",size:96},{value:"MD5 DIGEST:{md5_string}",size:128},],osi_pdu:"VTP Summary Advertisement",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});