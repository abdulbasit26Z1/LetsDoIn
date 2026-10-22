//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CEspHeader",{extend:"Ext.Base",statics:{data:{title:"ESP Header",units:"Bits",unit_marks:[16],width:32,fields:[{value:"ESP SPI: {spi}",size:32},{value:"ESP SEQUENCE: {sequence_number}",size:32},{value:"ESP DATA ENCRYPTED WITH: {esp_enc_transform}",size:32},{value:"ESP DATA AUTHENTICATED WITH: {esp_auth_transform}",size:32},],osi_pdu:"ESP Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});