//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Vpn__CAhHeader",{extend:"Ext.Base",statics:{data:{title:"AH Header",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Next Header:{next_header}",size:16},{value:"Length",size:16},{value:"AH SPI: {spi}",size:32},{value:"AH SEQUENCE: {sequence_number}",size:32},{value:"AH ICV: {type:hex}",size:32},{value:"AH DATA AUTHENTICATED WITH:{ah_transform}",size:32},],osi_pdu:"AH Header",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});