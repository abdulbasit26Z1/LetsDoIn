//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ftp__CFtpPacket",{extend:"Ext.Base",statics:{data:{title:"FTP",units:"Bits",unit_marks:[],width:32,fields:[{value:"FTP Command:{command}",size:32},{value:"FTP Argument:{argument}",size:32},],osi_pdu:"FTP Packet",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});