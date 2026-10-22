//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Dtp__CDtpFrame",{extend:"Ext.Base",statics:{data:{title:"DTP",units:"Bits",unit_marks:[8,16,24],width:32,fields:[{value:"VERSION: {version}",size:8},{value:"TYPE: {dtp_type}",size:8},{value:"LENGTH: {length: hex}",size:8},{value:"DOMAIN NAME: {domain_name}",size:8},{value:"TYPE: {dtp_type}",size:8},{value:"LENGTH : {set_length}",size:8},{value:"DTP TYPE: {dtp_str_type}",size:8},{value:"TYPE: {dtp_type}",size:8},{value:"LENGTH: {dtp_length}",size:8},{value:"NEIGHBOR MAC ADDRESS: {neighbor_mac_address}",size:8},],osi_pdu:"DTP Frame",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});