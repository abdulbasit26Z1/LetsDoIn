//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Pppoe__CPppoeHeader",{extend:"Ext.Base",statics:{data:{title:"PPPoE",units:"Bits",unit_marks:[16],width:32,fields:[{value:"MAC1",size:48,bgcolor:""},{value:"MAC2",size:48},{value:"ETHER_TYPE",size:48},{value:"V:{type}",size:4},{value:"T:{type}",size:4},{value:"CODE",size:8},{value:"Session ID:{session_id}",size:16},{value:"Length:{length}",size:16},{value:"PPP Protocol",size:16},{value:"PPP Payload",size:16},],osi_pdu:"PPPoE",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});