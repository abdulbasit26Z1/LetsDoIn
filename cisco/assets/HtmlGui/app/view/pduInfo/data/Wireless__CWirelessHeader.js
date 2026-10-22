//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Wireless__CWirelessHeader",{extend:"Ext.Base",statics:{data:{title:"802.11 Wireless",units:"Bits",unit_marks:[16],width:32,fields:[{value:"FRAME CONTROL",size:16},{value:"DURATION/ID",size:16},{value:"ADDRESS 1:{address1}",size:48},{value:"ADDRESS 2:{address2}",size:48,bgcolor:"green"},{value:"ADDRESS 3:{address3}",size:48,bgcolor:"blue"},{value:"SEQUENCE CONTROL",size:16},{value:"ADDRESS 4:{address4}",size:48,bgcolor:"purple"},{value:"DATA (VARIABLE LENGTH)",size:48,bgcolor:"pink"},{value:"FCS",size:32},],osi_pdu:"Wireless",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});