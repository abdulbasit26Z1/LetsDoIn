//************************************************************************
//
//  (c) Copyright Cisco Systems Inc., All Rights Reserved.
//  All use, disclosure, and/or reproduction of this material is
//  prohibited unless authorized in writing.
//
//************************************************************************
Ext.define("HtmlGui.view.pduInfo.data.Bgp__CBgpNotification",{extend:"Ext.Base",statics:{data:{title:"BGP NOTIFICATION",units:"Bits",unit_marks:[8,16],width:32,fields:[{value:"Error Code:{error_code}",size:8},{value:"Error Subcode:{error_sub_code}",size:8},{value:"Variable Data",size:16},],osi_pdu:"BGP Notification",osi_summary:"..."}},constructor:function(a){this.initConfig(a)}});