//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Voip__CSccpMessage",{extend:"Ext.Base",statics:{data:{title:"SCCP",units:"Bits",unit_marks:[16],width:32,fields:[{value:"Type:{msg_type}",size:16},{value:"Port:{sccp_port}",size:16},],osi_pdu:"SCCP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});