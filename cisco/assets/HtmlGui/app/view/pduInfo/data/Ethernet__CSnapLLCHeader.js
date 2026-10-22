//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Ethernet__CSnapLLCHeader",{extend:"Ext.Base",statics:{data:{title:"SNAP",units:"Bits",unit_marks:[24],width:32,fields:[{value:"OUI:{organization_code:hex}",size:24},{value:"PID: {protocol_id:hex}",size:16},],osi_pdu:"SNAP",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});