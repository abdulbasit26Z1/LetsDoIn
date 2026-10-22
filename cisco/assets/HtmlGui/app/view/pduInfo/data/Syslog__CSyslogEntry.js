//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Syslog__CSyslogEntry",{extend:"Ext.Base",statics:{data:{title:"SYSLOG",units:"Bits",unit_marks:[],width:32,fields:[{value:"1011 1... = FACILITY : LOCAL7 - RESERVED FOR LOCAL USE (23)",size:32},{value:". . . . .111 = LEVEL :  DEBUG: DEBUG-LEVEL MESSAGES ( 7 )",size:32},{value:" ",size:64},],osi_pdu:"SYSLOG",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});