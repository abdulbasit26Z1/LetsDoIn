//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ntp__CNtpHeader",{extend:"Ext.Base",statics:{data:{title:"NTP",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"LI: {ntp_leap_indicator}",size:2},{value:"VN: {ntp_version}",size:3},{value:"MD: {ntp_mode}",size:3},{value:"STARTUM: {ntp_client_stratum}",size:8},{value:"POLL: {ntp_poll}",size:8},{value:"PREC: {ntp_precision}",size:8},{value:"ROOT DELAY: {ntp_root_delay}",size:32},{value:"ROOT DISPERSION: {ntp_precision}",size:32},{value:"REFERENCE CLOCK IDENTIFIER: {ref_clock_id}",size:32},{value:"REFERENCE TIMESTAMP: {ref_clock_time}",size:64},{value:"ORIGINATE TIMESTAMP: {originate_time}",size:64},{value:"RECEIVE TIMESTAMP: {receive_time}",size:64},{value:"TRANSMIT TIMESTAMP: {transmit_time}",size:64},{value:"KEY IDENTIFIER: {key_id}",size:32},{value:"MESSAGE HASH: {server_md5_string}",size:64},],osi_pdu:"NTP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});